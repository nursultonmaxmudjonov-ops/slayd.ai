import { Slide, GenerateOptions, Language } from '../types';
import { getFallbackPresentation } from './templates';
import { getCleanImageUrl } from './imageService';

export async function generateSlidesWithAI(options: GenerateOptions): Promise<Slide[]> {
  const { topic, language, slideCount, audience, apiKey } = options;

  const langPrompt = language === 'uz' 
    ? "O'zbek tilida (lotin alifbosida)" 
    : language === 'ru' 
    ? "на русском языке" 
    : "in English";

  const systemPrompt = `You are an elite presentation designer.
Generate a professional, visually compelling ${slideCount}-slide presentation on the topic: "${topic}".
Language requirement: Generate all slide text completely ${langPrompt}.
Target audience: ${audience}.

Respond with a VALID JSON ARRAY of slide objects ONLY. Do not wrap in markdown quotes if possible, or wrap in \`\`\`json ... \`\`\`.
Each slide must have:
- "id": string (e.g. "slide-1", "slide-2", etc.)
- "layout": one of ["title", "bullets", "stats", "compare", "timeline", "quote", "conclusion"]
- "title": concise, impactful headline (3-8 words)
- "subtitle": optional supporting line or subtitle
- "badge": short tag/category (e.g. "01", "Fakt", "Tahlil", "Xulosa")
- "speakerNotes": 1-2 helpful sentences for the presenter to say
- Layout-specific fields:
  * For "title": title and subtitle
  * For "bullets": "points": array of 3-4 clear, substantive bullet points (each 8-15 words)
  * For "stats": "stats": array of 3 objects with { "value": "e.g. +75%", "label": "description", "trend": "context" }
  * For "compare": "compare": { "leftTitle": "...", "leftItems": ["..."], "rightTitle": "...", "rightItems": ["..."] }
  * For "timeline": "timeline": array of 3-4 steps with { "step": "01", "title": "...", "description": "..." }
  * For "quote": "quote": { "text": "...", "author": "...", "role": "..." }
  * For "conclusion": "conclusion": { "mainMessage": "...", "takeaways": ["point 1", "point 2", "point 3"], "callToAction": "...", "contact": "..." }

Make sure slide 1 is "title", slide 2 is "bullets", include at least one "stats" or "compare", and make the final slide "conclusion".`;

  // 1. If user provided a Gemini API Key, try Gemini first
  if (apiKey && apiKey.trim().length > 10) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            generationConfig: {
              temperature: 0.7,
              responseMimeType: "application/json"
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = parseSlideJson(text, topic);
          if (parsed && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (err) {
      console.warn("Gemini API error, falling back to free text AI:", err);
    }
  }

  // 2. Try Free Text AI
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 18000);

    const promptMessage = `Respond ONLY with a valid JSON array of ${slideCount} slides for topic "${topic}" in ${langPrompt}.\n${systemPrompt}`;

    const pollResponse = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are an AI that strictly returns valid JSON arrays of presentation slides.' },
          { role: 'user', content: promptMessage }
        ],
        model: 'openai',
        jsonMode: true
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (pollResponse.ok) {
      const responseText = await pollResponse.text();
      const parsed = parseSlideJson(responseText, topic);
      if (parsed && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Text AI error, falling back to template engine:", err);
  }

  // 3. Fallback: Ultra-fast, highly accurate procedural template generator
  return getFallbackPresentation(topic, language, slideCount, audience);
}

function parseSlideJson(rawText: string, topic: string): Slide[] | null {
  try {
    let clean = rawText.trim();
    if (clean.startsWith('```json')) {
      clean = clean.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (clean.startsWith('```')) {
      clean = clean.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    const firstBracket = clean.indexOf('[');
    const lastBracket = clean.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1) {
      clean = clean.substring(firstBracket, lastBracket + 1);
    }

    const parsed = JSON.parse(clean);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item, index) => {
        return {
          ...item,
          id: item.id || `slide-${index + 1}`,
          layout: item.layout || (index === 0 ? 'title' : 'bullets'),
          title: item.title || `Slide ${index + 1}`,
          selected: true,
          showImage: true,
          imageUrl: getCleanImageUrl(topic, item.title || '', index)
        };
      });
    }
  } catch (e) {
    console.error("Failed to parse AI JSON:", e);
  }
  return null;
}
