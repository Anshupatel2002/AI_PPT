import React, { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import EmptyState from './components/DeckPreview/EmptyState';
import LoadingState from './components/DeckPreview/LoadingState';
import DeckHeader from './components/DeckPreview/DeckHeader';
import SlideCard from './components/DeckPreview/SlideCard';
import Toast from './components/Common/Toast';
import { fetchOutline } from './services/api';
import { exportToPptx } from './services/pptxExport';

export default function App() {
  const [topic, setTopic] = useState('');
  const [style, setStyle] = useState('professional');
  const [language, setLanguage] = useState('Hindi (Devanagari script)');
  const [count, setCount] = useState(9);

  const [deck, setDeck] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Pehle presentation ka topic likhein.');
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const generatedDeck = await fetchOutline({
        topic: topic.trim(),
        style,
        lang: language,
        count
      });

      setDeck(generatedDeck);
    } catch (err) {
      console.error('[Generate Error]', err);
      setError(err.message || 'Outline generate karte samay problem aayi.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!deck) return;

    setError(null);
    setIsExporting(true);

    try {
      await exportToPptx(deck);
    } catch (err) {
      console.error('[Download Error]', err);
      setError('PPTX download mein problem: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  // State handlers for live editing
  const handleTitleChange = (newTitle) => {
    setDeck((prev) => (prev ? { ...prev, title: newTitle } : prev));
  };

  const handleSubtitleChange = (newSubtitle) => {
    setDeck((prev) => (prev ? { ...prev, subtitle: newSubtitle } : prev));
  };

  const handleUpdateSlideTitle = (slideIndex, newTitle) => {
    setDeck((prev) => {
      if (!prev) return prev;
      const updatedSlides = [...prev.slides];
      updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], title: newTitle };
      return { ...prev, slides: updatedSlides };
    });
  };

  const handleUpdateBullet = (slideIndex, bulletIndex, newValue) => {
    setDeck((prev) => {
      if (!prev) return prev;
      const updatedSlides = [...prev.slides];
      const updatedBullets = [...(updatedSlides[slideIndex].bullets || [])];
      updatedBullets[bulletIndex] = newValue;
      updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], bullets: updatedBullets };
      return { ...prev, slides: updatedSlides };
    });
  };

  const handleAddBullet = (slideIndex) => {
    setDeck((prev) => {
      if (!prev) return prev;
      const updatedSlides = [...prev.slides];
      const updatedBullets = [...(updatedSlides[slideIndex].bullets || []), 'New point'];
      updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], bullets: updatedBullets };
      return { ...prev, slides: updatedSlides };
    });
  };

  const handleRemoveBullet = (slideIndex, bulletIndex) => {
    setDeck((prev) => {
      if (!prev) return prev;
      const updatedSlides = [...prev.slides];
      const updatedBullets = (updatedSlides[slideIndex].bullets || []).filter((_, i) => i !== bulletIndex);
      updatedSlides[slideIndex] = { ...updatedSlides[slideIndex], bullets: updatedBullets };
      return { ...prev, slides: updatedSlides };
    });
  };

  const handleDeleteSlide = (slideIndex) => {
    setDeck((prev) => {
      if (!prev) return prev;
      const updatedSlides = prev.slides.filter((_, i) => i !== slideIndex);
      return { ...prev, slides: updatedSlides };
    });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[380px_1fr] bg-bg text-paper relative">
      <Sidebar
        topic={topic}
        onTopicChange={setTopic}
        style={style}
        onStyleChange={setStyle}
        language={language}
        onLanguageChange={setLanguage}
        count={count}
        onCountChange={setCount}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      <main className="p-6 lg:p-10 max-w-7xl overflow-y-auto">
        {isGenerating ? (
          <LoadingState />
        ) : !deck ? (
          <EmptyState />
        ) : (
          <div>
            <DeckHeader
              title={deck.title}
              subtitle={deck.subtitle || ''}
              onTitleChange={handleTitleChange}
              onSubtitleChange={handleSubtitleChange}
              onRegenerate={handleGenerate}
              onDownload={handleDownload}
              isExporting={isExporting}
            />

            <section className="flex flex-col gap-5">
              {(deck.slides || []).map((slide, index) => (
                <SlideCard
                  key={index}
                  index={index}
                  slide={slide}
                  onUpdateTitle={handleUpdateSlideTitle}
                  onUpdateBullet={handleUpdateBullet}
                  onAddBullet={handleAddBullet}
                  onRemoveBullet={handleRemoveBullet}
                  onDeleteSlide={handleDeleteSlide}
                />
              ))}
            </section>
          </div>
        )}
      </main>

      <Toast message={error} onClose={() => setError(null)} />
    </div>
  );
}
