import React, { useState } from 'react';

import Sidebar from './components/Sidebar/Sidebar';
import EmptyState from './components/DeckPreview/EmptyState';
import LoadingState from './components/DeckPreview/LoadingState';
import DeckHeader from './components/DeckPreview/DeckHeader';
import SlideCard from './components/DeckPreview/SlideCard';
import Toast from './components/Common/Toast';

import { fetchOutline } from './services/api';
import { exportToPptx } from './services/pptxExport';

// =========================================================
// SUPPORTED LANGUAGES
// =========================================================

export const LANGUAGE_OPTIONS = [
  // Common
  {
    value: 'English',
    label: 'English'
  },

  // Indian Languages
  {
    value: 'Hindi',
    label: 'Hindi'
  },
  {
    value: 'Gujarati',
    label: 'Gujarati'
  },
  {
    value: 'Marathi',
    label: 'Marathi'
  },
  {
    value: 'Bengali',
    label: 'Bengali'
  },
  {
    value: 'Punjabi',
    label: 'Punjabi'
  },
  {
    value: 'Tamil',
    label: 'Tamil'
  },
  {
    value: 'Telugu',
    label: 'Telugu'
  },
  {
    value: 'Kannada',
    label: 'Kannada'
  },
  {
    value: 'Malayalam',
    label: 'Malayalam'
  },
  {
    value: 'Urdu',
    label: 'Urdu'
  },
  {
    value: 'Odia',
    label: 'Odia'
  },
  {
    value: 'Assamese',
    label: 'Assamese'
  },
  {
    value: 'Nepali',
    label: 'Nepali'
  },
  {
    value: 'Sanskrit',
    label: 'Sanskrit'
  },

  // European Languages
  {
    value: 'French',
    label: 'French'
  },
  {
    value: 'Spanish',
    label: 'Spanish'
  },
  {
    value: 'German',
    label: 'German'
  },
  {
    value: 'Italian',
    label: 'Italian'
  },
  {
    value: 'Portuguese',
    label: 'Portuguese'
  },
  {
    value: 'Dutch',
    label: 'Dutch'
  },
  {
    value: 'Russian',
    label: 'Russian'
  },
  {
    value: 'Polish',
    label: 'Polish'
  },
  {
    value: 'Swedish',
    label: 'Swedish'
  },
  {
    value: 'Norwegian',
    label: 'Norwegian'
  },
  {
    value: 'Danish',
    label: 'Danish'
  },
  {
    value: 'Finnish',
    label: 'Finnish'
  },
  {
    value: 'Greek',
    label: 'Greek'
  },

  // Asian Languages
  {
    value: 'Chinese (Simplified)',
    label: 'Chinese (Simplified)'
  },
  {
    value: 'Chinese (Traditional)',
    label: 'Chinese (Traditional)'
  },
  {
    value: 'Japanese',
    label: 'Japanese'
  },
  {
    value: 'Korean',
    label: 'Korean'
  },
  {
    value: 'Thai',
    label: 'Thai'
  },
  {
    value: 'Vietnamese',
    label: 'Vietnamese'
  },
  {
    value: 'Indonesian',
    label: 'Indonesian'
  },
  {
    value: 'Malay',
    label: 'Malay'
  },
  {
    value: 'Filipino',
    label: 'Filipino'
  },

  // Middle Eastern Languages
  {
    value: 'Arabic',
    label: 'Arabic'
  },
  {
    value: 'Turkish',
    label: 'Turkish'
  },
  {
    value: 'Hebrew',
    label: 'Hebrew'
  },
  {
    value: 'Persian',
    label: 'Persian'
  }
];

export default function App() {
  // =========================================================
  // PRESENTATION SETTINGS
  // =========================================================

  const [topic, setTopic] = useState('');

  const [style, setStyle] = useState(
    'professional'
  );

  // English is the default language
  const [language, setLanguage] = useState(
    'English'
  );

  const [count, setCount] = useState(9);

  // =========================================================
  // APPLICATION STATE
  // =========================================================

  const [deck, setDeck] = useState(null);

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [isExporting, setIsExporting] =
    useState(false);

  const [error, setError] = useState(null);

  // =========================================================
  // GENERATE PRESENTATION
  // =========================================================

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError(
        'Please enter a presentation topic first.'
      );
      return;
    }

    if (isGenerating) {
      return;
    }

    setError(null);
    setIsGenerating(true);

    try {
      const generatedDeck = await fetchOutline({
        topic: topic.trim(),

        style,

        // Send selected language to backend
        lang: language,

        count
      });

      if (!generatedDeck) {
        throw new Error(
          'No presentation data was returned.'
        );
      }

      setDeck(generatedDeck);

    } catch (err) {
      console.error(
        '[Generate Error]',
        err
      );

      setError(
        err?.message ||
          'We could not generate your presentation. Please try again.'
      );

    } finally {
      setIsGenerating(false);
    }
  };

  // =========================================================
  // DOWNLOAD POWERPOINT
  // =========================================================

  const handleDownload = async () => {
    if (!deck || isExporting) {
      return;
    }

    setError(null);
    setIsExporting(true);

    try {
      await exportToPptx(deck);

    } catch (err) {
      console.error(
        '[Download Error]',
        err
      );

      setError(
        `Unable to download the PowerPoint file${
          err?.message
            ? `: ${err.message}`
            : '.'
        }`
      );

    } finally {
      setIsExporting(false);
    }
  };

  // =========================================================
  // UPDATE DECK TITLE
  // =========================================================

  const handleTitleChange = (newTitle) => {
    setDeck((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        title: newTitle
      };
    });
  };

  // =========================================================
  // UPDATE DECK SUBTITLE
  // =========================================================

  const handleSubtitleChange = (
    newSubtitle
  ) => {
    setDeck((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        subtitle: newSubtitle
      };
    });
  };

  // =========================================================
  // UPDATE SLIDE TITLE
  // =========================================================

  const handleUpdateSlideTitle = (
    slideIndex,
    newTitle
  ) => {
    setDeck((prev) => {
      if (
        !prev ||
        !Array.isArray(prev.slides)
      ) {
        return prev;
      }

      if (!prev.slides[slideIndex]) {
        return prev;
      }

      const updatedSlides = [
        ...prev.slides
      ];

      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        title: newTitle
      };

      return {
        ...prev,
        slides: updatedSlides
      };
    });
  };

  // =========================================================
  // UPDATE BULLET
  // =========================================================

  const handleUpdateBullet = (
    slideIndex,
    bulletIndex,
    newValue
  ) => {
    setDeck((prev) => {
      if (
        !prev ||
        !Array.isArray(prev.slides)
      ) {
        return prev;
      }

      if (!prev.slides[slideIndex]) {
        return prev;
      }

      const updatedSlides = [
        ...prev.slides
      ];

      const updatedBullets = [
        ...(updatedSlides[slideIndex]
          .bullets || [])
      ];

      updatedBullets[bulletIndex] =
        newValue;

      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        bullets: updatedBullets
      };

      return {
        ...prev,
        slides: updatedSlides
      };
    });
  };

  // =========================================================
  // ADD BULLET
  // =========================================================

  const handleAddBullet = (
    slideIndex
  ) => {
    setDeck((prev) => {
      if (
        !prev ||
        !Array.isArray(prev.slides)
      ) {
        return prev;
      }

      if (!prev.slides[slideIndex]) {
        return prev;
      }

      const updatedSlides = [
        ...prev.slides
      ];

      const updatedBullets = [
        ...(updatedSlides[slideIndex]
          .bullets || []),
        'Add your point here'
      ];

      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        bullets: updatedBullets
      };

      return {
        ...prev,
        slides: updatedSlides
      };
    });
  };

  // =========================================================
  // REMOVE BULLET
  // =========================================================

  const handleRemoveBullet = (
    slideIndex,
    bulletIndex
  ) => {
    setDeck((prev) => {
      if (
        !prev ||
        !Array.isArray(prev.slides)
      ) {
        return prev;
      }

      if (!prev.slides[slideIndex]) {
        return prev;
      }

      const updatedSlides = [
        ...prev.slides
      ];

      const updatedBullets = (
        updatedSlides[slideIndex]
          .bullets || []
      ).filter(
        (_, index) =>
          index !== bulletIndex
      );

      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        bullets: updatedBullets
      };

      return {
        ...prev,
        slides: updatedSlides
      };
    });
  };

  // =========================================================
  // DELETE SLIDE
  // =========================================================

  const handleDeleteSlide = (
    slideIndex
  ) => {
    setDeck((prev) => {
      if (
        !prev ||
        !Array.isArray(prev.slides)
      ) {
        return prev;
      }

      const updatedSlides =
        prev.slides.filter(
          (_, index) =>
            index !== slideIndex
        );

      return {
        ...prev,
        slides: updatedSlides
      };
    });
  };

  // =========================================================
  // APPLICATION UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div
        className="
          min-h-screen
          grid
          grid-cols-1
          lg:grid-cols-[360px_minmax(0,1fr)]
        "
      >

        {/* =================================================
            SIDEBAR
        ================================================= */}

        <aside
          className="
            border-r
            border-white/10
            bg-slate-950
            lg:min-h-screen
          "
        >
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
        </aside>

        {/* =================================================
            MAIN WORKSPACE
        ================================================= */}

        <main
          className="
            min-w-0
            min-h-screen
            overflow-y-auto
            bg-slate-900
          "
        >

          {/* PRODUCT HEADER */}

          <header
            className="
              sticky
              top-0
              z-20
              flex
              items-center
              justify-between
              border-b
              border-white/10
              bg-slate-900/90
              px-6
              py-4
              backdrop-blur-xl
              lg:px-10
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-white
                  text-xs
                  font-bold
                  text-slate-950
                "
              >
                AI
              </div>

              <div>
                <h1
                  className="
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  AI Presentation Builder
                </h1>

                <p
                  className="
                    text-xs
                    text-slate-400
                  "
                >
                  Create professional presentations with AI
                </p>
              </div>

            </div>

            <div
              className="
                hidden
                items-center
                gap-2
                rounded-full
                border
                border-emerald-400/20
                bg-emerald-400/10
                px-3
                py-1.5
                text-xs
                font-medium
                text-emerald-300
                sm:flex
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-400
                "
              />

              AI Ready
            </div>

          </header>

          {/* MAIN CONTENT */}

          <div
            className="
              mx-auto
              w-full
              max-w-7xl
              p-5
              sm:p-6
              lg:p-10
            "
          >

            {isGenerating ? (

              <LoadingState />

            ) : !deck ? (

              <div className="min-h-[70vh]">
                <EmptyState />
              </div>

            ) : (

              <div className="space-y-8">

                <DeckHeader
                  title={deck.title}
                  subtitle={
                    deck.subtitle || ''
                  }

                  onTitleChange={
                    handleTitleChange
                  }

                  onSubtitleChange={
                    handleSubtitleChange
                  }

                  onRegenerate={
                    handleGenerate
                  }

                  onDownload={
                    handleDownload
                  }

                  isExporting={
                    isExporting
                  }
                />

                {/* SLIDE HEADER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    pb-4
                  "
                >

                  <div>
                    <h2
                      className="
                        text-lg
                        font-semibold
                        text-white
                      "
                    >
                      Presentation Slides
                    </h2>

                    <p
                      className="
                        mt-1
                        text-sm
                        text-slate-400
                      "
                    >
                      Edit your presentation before exporting.
                    </p>
                  </div>

                  <div
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-slate-300
                    "
                  >
                    {deck.slides?.length || 0} Slides
                  </div>

                </div>

                {/* SLIDES */}

                <section
                  className="flex flex-col gap-6"
                  aria-label="Presentation slides"
                >

                  {(deck.slides || []).map(
                    (slide, index) => (
                      <SlideCard
                        key={`slide-${index}`}
                        index={index}
                        slide={slide}

                        onUpdateTitle={
                          handleUpdateSlideTitle
                        }

                        onUpdateBullet={
                          handleUpdateBullet
                        }

                        onAddBullet={
                          handleAddBullet
                        }

                        onRemoveBullet={
                          handleRemoveBullet
                        }

                        onDeleteSlide={
                          handleDeleteSlide
                        }
                      />
                    )
                  )}

                </section>

                {/* NO SLIDES */}

                {(!deck.slides ||
                  deck.slides.length === 0) && (
                  <div
                    className="
                      rounded-2xl
                      border
                      border-dashed
                      border-white/10
                      bg-white/[0.02]
                      p-12
                      text-center
                    "
                  >
                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-white
                      "
                    >
                      No slides available
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        text-slate-400
                      "
                    >
                      Generate the presentation again to create slides.
                    </p>
                  </div>
                )}

              </div>
            )}

          </div>

        </main>

      </div>

      {/* TOAST */}

      <Toast
        message={error}
        onClose={() => setError(null)}
      />

    </div>
  );
}


