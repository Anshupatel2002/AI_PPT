function parseModelJson(text) {
  if (!text) {
    throw new Error('Gemini returned an empty response.');
  }

  let cleaned = String(text).trim();

  // Remove markdown fences if Gemini accidentally adds them
  cleaned = cleaned
    .replace(/^```json/i, '')
    .replace(/^```/i, '')
    .replace(/```$/i, '')
    .trim();

  // First direct attempt
  try {
    return JSON.parse(cleaned);
  } catch (_) {
    // Continue fallback extraction below
  }

  // Try extracting JSON object between first '{' and last '}'
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const extracted = cleaned.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(extracted);
    } catch (_) {
      // Continue to error throw
    }
  }

  console.error('[Gemini] Invalid generated JSON:', cleaned);
  throw new Error('Gemini returned invalid presentation JSON.');
}

module.exports = {
  parseModelJson
};
