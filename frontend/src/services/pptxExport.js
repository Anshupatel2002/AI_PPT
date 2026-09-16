import pptxgen from 'pptxgenjs';

/**
 * Exports deck data to PowerPoint .pptx format
 * @param {Object} deckData - Deck object with title, subtitle, and slides
 */
export async function exportToPptx(deckData) {
  if (!deckData || !Array.isArray(deckData.slides)) {
    throw new Error('No presentation data available to export.');
  }

  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'Deck Draft';
  pptx.subject = deckData.title;
  pptx.title = deckData.title;
  pptx.company = 'Deck Draft';

  const INK = '111318';
  const PAPER = 'F5F1E8';
  const GOLD = 'C9A227';
  const MUTED = '8FA3B0';

  // 1. TITLE SLIDE
  const titleSlide = pptx.addSlide();
  titleSlide.background = { color: INK };

  titleSlide.addShape(pptx.ShapeType.rect, {
    x: 0.7,
    y: 3.55,
    w: 1.8,
    h: 0.06,
    fill: { color: GOLD },
    line: { color: GOLD }
  });

  titleSlide.addText(deckData.title || 'Untitled Deck', {
    x: 0.7,
    y: 2.3,
    w: 11.7,
    h: 1.1,
    fontFace: 'Georgia',
    fontSize: 34,
    bold: true,
    color: PAPER,
    margin: 0
  });

  if (deckData.subtitle) {
    titleSlide.addText(deckData.subtitle, {
      x: 0.7,
      y: 3.85,
      w: 11.7,
      h: 0.7,
      fontFace: 'Arial',
      fontSize: 16,
      color: MUTED,
      margin: 0
    });
  }

  // 2. CONTENT & SECTION SLIDES
  deckData.slides.forEach((slideData, index) => {
    const slide = pptx.addSlide();

    if (slideData.type === 'section') {
      slide.background = { color: INK };

      slide.addShape(pptx.ShapeType.rect, {
        x: 0.7,
        y: 3.1,
        w: 1.5,
        h: 0.05,
        fill: { color: GOLD },
        line: { color: GOLD }
      });

      slide.addText(slideData.title || '', {
        x: 0.7,
        y: 3.4,
        w: 11.5,
        h: 1,
        fontFace: 'Georgia',
        fontSize: 30,
        bold: true,
        color: PAPER,
        margin: 0
      });

      if (slideData.bullets?.[0]) {
        slide.addText(slideData.bullets[0], {
          x: 0.7,
          y: 4.45,
          w: 11.5,
          h: 0.6,
          fontFace: 'Arial',
          fontSize: 14,
          color: MUTED,
          margin: 0
        });
      }
    } else {
      slide.background = { color: PAPER };

      slide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: 13.333,
        h: 0.1,
        fill: { color: GOLD },
        line: { color: GOLD }
      });

      slide.addText(slideData.title || '', {
        x: 0.7,
        y: 0.55,
        w: 11.5,
        h: 0.8,
        fontFace: 'Georgia',
        fontSize: 25,
        bold: true,
        color: INK,
        margin: 0
      });

      const bullets = slideData.bullets || [];

      if (bullets.length) {
        const bulletText = bullets.map(bullet => ({
          text: bullet,
          options: {
            bullet: { indent: 18 },
            hanging: 4,
            breakLine: true
          }
        }));

        slide.addText(bulletText, {
          x: 0.9,
          y: 1.7,
          w: 11.5,
          h: 4.8,
          fontFace: 'Arial',
          fontSize: 18,
          color: '343940',
          valign: 'top',
          margin: 0.05,
          paraSpaceAfterPt: 13
        });
      }

      slide.addText(String(index + 2).padStart(2, '0'), {
        x: 12.2,
        y: 6.9,
        w: 0.6,
        h: 0.3,
        fontFace: 'Courier New',
        fontSize: 10,
        color: MUTED,
        margin: 0,
        align: 'right'
      });
    }
  });

  // 3. GENERATE FILENAME & SAVE
  let filename = (deckData.title || 'deck-draft')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);

  if (!filename) {
    filename = 'deck-draft';
  }

  await pptx.writeFile({
    fileName: `${filename}.pptx`
  });
}
