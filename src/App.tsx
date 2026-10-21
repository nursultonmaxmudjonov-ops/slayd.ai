import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Language, 
  Presentation, 
  GenerateOptions, 
  Slide, 
  ThemeId 
} from './types';
import { SLIDE_THEMES } from './themes/slideThemes';
import { Navbar } from './components/Navbar';
import { HeroGenerator } from './components/HeroGenerator';
import { SlideCanvas } from './components/SlideCanvas';
import { SlideSidebar } from './components/SlideSidebar';
import { ExportToolbar } from './components/ExportToolbar';
import { PresentationModal } from './components/PresentationModal';
import { ApiKeyModal } from './components/ApiKeyModal';
import { generateSlidesWithAI } from './services/aiService';
import { exportToPowerPoint } from './services/pptxService';

export const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('slaydai_lang') as Language) || 'uz';
  });

  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('slaydai_gemini_key') || '';
  });

  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('minimalist');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);

  // Persist language
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('slaydai_lang', lang);
  };

  // Persist API key
  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('slaydai_gemini_key', key);
  };

  // Generate slides handler
  const handleGenerate = async (options: GenerateOptions) => {
    setIsGenerating(true);
    try {
      const slides = await generateSlidesWithAI({
        ...options,
        apiKey: apiKey || undefined
      });

      const newPres: Presentation = {
        id: `pres-${Date.now()}`,
        title: options.topic,
        topic: options.topic,
        language: options.language,
        theme: options.theme,
        audience: options.audience,
        slides,
        createdAt: new Date().toISOString()
      };

      setPresentation(newPres);
      setCurrentTheme(options.theme);
      setActiveSlideIndex(0);

      // Launch celebration confetti
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error("Generation error:", err);
      alert("Slaydlarni yaratishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Update slide in place
  const handleUpdateSlide = (updatedSlide: Slide) => {
    if (!presentation) return;
    const newSlides = [...presentation.slides];
    newSlides[activeSlideIndex] = updatedSlide;
    setPresentation({ ...presentation, slides: newSlides });
  };

  // Toggle slide selection for export/presentation
  const handleToggleSlideSelection = (index: number) => {
    if (!presentation) return;
    const newSlides = [...presentation.slides];
    const currentSelected = newSlides[index].selected !== false;
    newSlides[index] = { ...newSlides[index], selected: !currentSelected };
    setPresentation({ ...presentation, slides: newSlides });
  };

  // Select all / Deselect all
  const handleSelectAllSlides = (select: boolean) => {
    if (!presentation) return;
    const newSlides = presentation.slides.map(s => ({ ...s, selected: select }));
    setPresentation({ ...presentation, slides: newSlides });
  };

  // Add slide
  const handleAddSlide = () => {
    if (!presentation) return;
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      layout: 'bullets',
      title: 'Yangi Slayd Sarlavhasi',
      subtitle: 'Qisqacha izoh',
      badge: `${presentation.slides.length + 1}`,
      selected: true,
      showImage: true,
      points: [
        'Muhim birinchi nuqta',
        'Ikkinchi dolzarb fikr',
        'Uchinchi xulosa yoki qadam'
      ],
      speakerNotes: 'Ushbu slayd uchun eslatma.'
    };

    const newSlides = [...presentation.slides, newSlide];
    setPresentation({ ...presentation, slides: newSlides });
    setActiveSlideIndex(newSlides.length - 1);
  };

  // Delete slide
  const handleDeleteSlide = (index: number) => {
    if (!presentation || presentation.slides.length <= 1) return;
    const newSlides = presentation.slides.filter((_, i) => i !== index);
    setPresentation({ ...presentation, slides: newSlides });
    if (activeSlideIndex >= newSlides.length) {
      setActiveSlideIndex(Math.max(0, newSlides.length - 1));
    }
  };

  // Duplicate slide
  const handleDuplicateSlide = (index: number) => {
    if (!presentation) return;
    const target = presentation.slides[index];
    const duplicated: Slide = {
      ...JSON.parse(JSON.stringify(target)),
      id: `slide-${Date.now()}`,
      title: `${target.title} (Nusxa)`
    };

    const newSlides = [...presentation.slides];
    newSlides.splice(index + 1, 0, duplicated);
    setPresentation({ ...presentation, slides: newSlides });
    setActiveSlideIndex(index + 1);
  };

  // Move slide up / down
  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    if (!presentation) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= presentation.slides.length) return;

    const newSlides = [...presentation.slides];
    const [moved] = newSlides.splice(index, 1);
    newSlides.splice(targetIdx, 0, moved);

    setPresentation({ ...presentation, slides: newSlides });
    setActiveSlideIndex(targetIdx);
  };

  // Export to PowerPoint (.pptx)
  const handleExportPptx = async () => {
    if (!presentation) return;
    const theme = SLIDE_THEMES[currentTheme];
    await exportToPowerPoint(presentation.slides, presentation.title, theme);
  };

  // Print as PDF
  const handlePrintPdf = () => {
    window.print();
  };

  const activeTheme = SLIDE_THEMES[currentTheme];
  const selectedCount = presentation ? presentation.slides.filter(s => s.selected !== false).length : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={Boolean(apiKey)}
        onNewPresentation={() => setPresentation(null)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {!presentation ? (
          // Hero & Topic Input Screen
          <HeroGenerator
            language={language}
            onLanguageChange={handleLanguageChange}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />
        ) : (
          // Visual Slide Editor Screen
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Left Slides Sidebar */}
            <SlideSidebar
              slides={presentation.slides}
              activeIndex={activeSlideIndex}
              onSelectSlide={setActiveSlideIndex}
              onToggleSlideSelection={handleToggleSlideSelection}
              onSelectAllSlides={handleSelectAllSlides}
              onAddSlide={handleAddSlide}
              onDeleteSlide={handleDeleteSlide}
              onDuplicateSlide={handleDuplicateSlide}
              onMoveSlide={handleMoveSlide}
              theme={activeTheme}
              language={language}
            />

            {/* Central 16:9 Presentation Canvas */}
            <SlideCanvas
              slide={presentation.slides[activeSlideIndex]}
              theme={activeTheme}
              language={language}
              onUpdateSlide={handleUpdateSlide}
              slideIndex={activeSlideIndex}
              totalSlides={presentation.slides.length}
            />
          </div>
        )}
      </main>

      {/* Bottom Export & Navigation Bar (when presentation is active) */}
      {presentation && (
        <ExportToolbar
          onExportPptx={handleExportPptx}
          onStartPresentation={() => setIsPresenting(true)}
          onPrintPdf={handlePrintPdf}
          onNewPresentation={() => setPresentation(null)}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          activeIndex={activeSlideIndex}
          totalSlides={presentation.slides.length}
          selectedCount={selectedCount}
          onPrevSlide={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
          onNextSlide={() => setActiveSlideIndex((prev) => Math.min(presentation.slides.length - 1, prev + 1))}
          language={language}
        />
      )}

      {/* Fullscreen Presentation Mode Modal */}
      {presentation && (
        <PresentationModal
          isOpen={isPresenting}
          onClose={() => setIsPresenting(false)}
          slides={presentation.slides}
          theme={activeTheme}
          language={language}
          initialIndex={activeSlideIndex}
        />
      )}

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
        language={language}
      />
    </div>
  );
};

export default App;
