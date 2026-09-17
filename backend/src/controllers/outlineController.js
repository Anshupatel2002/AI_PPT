const geminiService = require('../services/geminiService');
const { STYLE_GUIDANCE } = require('../utils/promptBuilder');

class OutlineController {
  async generateOutline(req, res, next) {
    try {
      const { topic, style, lang, count } = req.body || {};

      if (typeof topic !== 'string' || !topic.trim()) {
        return res.status(400).json({
          error: 'Please enter a presentation topic.'
        });
      }

      const safeStyle = STYLE_GUIDANCE[style] ? style : 'professional';
      const safeLanguage = typeof lang === 'string' && lang.trim() ? lang.trim() : 'English';
      const safeCount = Math.min(Math.max(parseInt(count, 10) || 9, 5), 16);

      const deck = await geminiService.generatePresentationOutline({
        topic: topic.trim(),
        style: safeStyle,
        language: safeLanguage,
        count: safeCount
      });

      console.log(`[OutlineController] Successfully generated deck with ${deck.slides.length} slides.`);
      return res.json(deck);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OutlineController();
