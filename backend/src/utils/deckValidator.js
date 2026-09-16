function validateDeck(deck) {
  if (!deck || typeof deck !== 'object') {
    throw new Error('AI returned an invalid deck.');
  }

  if (typeof deck.title !== 'string') {
    deck.title = 'Untitled Presentation';
  }

  if (typeof deck.subtitle !== 'string') {
    deck.subtitle = '';
  }

  if (!Array.isArray(deck.slides)) {
    throw new Error('AI response does not contain slides.');
  }

  deck.slides = deck.slides.map((slide, index) => {
    const type = slide?.type === 'section' ? 'section' : 'content';

    const title =
      typeof slide?.title === 'string'
        ? slide.title
        : `Slide ${index + 1}`;

    const bullets = Array.isArray(slide?.bullets)
      ? slide.bullets.map(b => String(b)).filter(Boolean)
      : [];

    return {
      type,
      title,
      bullets
    };
  });

  return deck;
}

module.exports = {
  validateDeck
};
