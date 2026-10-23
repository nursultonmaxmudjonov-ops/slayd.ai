import { Slide, GenerateOptions, Language, VisualMode } from '../types';
import { getFallbackPresentation } from './templates';
import { getCleanImageUrl, getAIImageUrl } from './imageService';

export async function generateSlidesWithAI(options: GenerateOptions): Promise<Slide[]> {
  const { topic, language, slideCount, audience, apiKey } = options;

  const langPrompt = language === 'uz'
    ? "O'zbek tilida (lotin alifbosida)"
    : language === 'ru'
    ? "на русском языке"
    : "in English";

  const systemPrompt = `You are an expert researcher and elite presentation designer.
Generate a professional, information-rich ${slideCount}-slide presentation on the topic: "${topic}".
Language requirement: Generate all slide text completely ${langPrompt}.
Target audience: ${audience}.

CRITICAL CONTENT RULES:
1. PRECISION FIRST: Give EXACT, SPECIFIC facts — real dates, real names, real numbers, real laws/formulas, real places, real events. Vague statements are FORBIDDEN.
2. Every bullet must contain at least ONE concrete fact: a date (e.g. "1957-yil"), a name (e.g. "Albert Einstein"), a figure (e.g. "~384 400 km"), or a named concept (e.g. "fotosintez").
3. NEVER write generic filler phrases like "zamonaviy tendensiyalar", "katta imkoniyatlar", "muhim omillar", "the future is bright", "many opportunities". If a sentence could apply to ANY topic, rewrite it with topic-specific detail.
4. Each slide covers a DIFFERENT aspect of the topic (definition, history, how it works, benefits, challenges, real examples, data, future) — build a logical narrative plan like an expert would.
5. Stats slides must contain REAL, verifiable topic figures (approximate where needed with "~", never invent exact fake citations).
6. No two slides may repeat the same idea or sentence.
7. LAYOUTS ARE OPTIONAL: use "stats", "compare", "timeline", "quote" only where they fit the topic naturally. If the topic doesn't need stats, use more "bullets" slides with rich facts instead. DO NOT force a stats slide when facts don't support it.

Respond with a VALID JSON ARRAY of slide objects ONLY. Do not wrap in markdown quotes if possible, or wrap in \`\`\`json ... \`\`\`.
Each slide must have:
- "id": string (e.g. "slide-1", "slide-2", etc.)
- "layout": one of ["title", "bullets", "stats", "compare", "timeline", "quote", "conclusion"]
- "imagePrompt": MANDATORY for EVERY slide. A SHORT visual English description (5-12 words) of a relevant illustration/photo SPECIFIC to this slide's content and "${topic}" (e.g. topic=Quyosh: "solar flare plasma corona closeup"; topic=AI: "neural network glowing nodes on chip"). Each slide's imagePrompt must be DIFFERENT — describe the visual that best represents THIS slide's specific sub-topic. No text in the image.
- "visualStyle": one of ["photo", "ai_image"] — pick "photo" for realistic/photographic sub-topics, "ai_image" for conceptual/abstract ones. Vary it between slides for visual diversity.
- "imageSide": one of ["left", "right"] — alternate visual placement between slides (title slide always "right").
- "title": concise, impactful headline (3-8 words)
- "subtitle": optional supporting line or subtitle
- "badge": short tag/category (e.g. "01", "Fakt", "Tahlil", "Xulosa")
- "speakerNotes": 1-2 helpful sentences for the presenter to say, WITH topic-specific facts
- Layout-specific fields:
  * For "title": title and subtitle
  * For "bullets": "points": array of 3-4 clear, substantive, fact-rich bullet points (each 10-18 words) about "${topic}"
  * For "stats": "stats": array of 3 objects with { "value": "e.g. +75%", "label": "specific metric for this topic", "trend": "context" }
  * For "compare": "compare": { "leftTitle": "...", "leftItems": ["..."], "rightTitle": "...", "rightItems": ["..."] }
  * For "timeline": "timeline": array of 3-4 steps with { "step": "01", "title": "...", "description": "..." } — real milestones of the topic's development
  * For "quote": "quote": { "text": "...", "author": "...", "role": "..." }
  * For "conclusion": "conclusion": { "mainMessage": "...", "takeaways": ["point 1", "point 2", "point 3"], "callToAction": "...", "contact": "..." }

Make sure slide 1 is "title" and the final slide is "conclusion". Slide 2 should be "bullets". Other layouts (stats, compare, timeline, quote) are RECOMMENDED but NOT required — use each only if the topic genuinely supports it.`;

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
        // Topic-specific, per-slide unique image (AI-generated, fallback to curated photo)
        const slideTitle: string = item.title || `Slide ${index + 1}`;
        const imagePrompt = item.imagePrompt
          ? `${item.imagePrompt}, ${topic}, professional presentation illustration, high quality, detailed, no text`
          : `${slideTitle}, ${topic}, professional presentation illustration, high quality, no text`;

        // DESIGN DIVERSITY: alternate visual style & placement per slide
        const visualMode: VisualMode =
          item.visualStyle === 'photo' || item.visualStyle === 'ai_image'
            ? item.visualStyle
            : index % 3 === 1
              ? 'photo'      // every 2nd slide — curated HD photo
              : 'ai_image';  // others — unique AI-generated illustration

        const imageSide: 'left' | 'right' =
          item.imageSide === 'left' || item.imageSide === 'right'
            ? item.imageSide
            : index % 2 === 1 ? 'left' : 'right';

        return {
          ...item,
          id: item.id || `slide-${index + 1}`,
          layout: item.layout || (index === 0 ? 'title' : 'bullets'),
          title: slideTitle,
          selected: true,
          showImage: true,
          visualMode,
          imageSide,
          imageUrl: getAIImageUrl(imagePrompt, (index + 1) * 7919 + index * 104729, index === 0)
        };
      });
    }
  } catch (e) {
    console.error("Failed to parse AI JSON:", e);
  }
  return null;
}
