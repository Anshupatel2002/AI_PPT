require('dotenv').config();

function boundedNumber(value, fallback, minimum, maximum) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(Math.max(parsed, minimum), maximum);
}

const config = {
  port: Number(process.env.PORT) || 3000,
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
  geminiTemperature: boundedNumber(process.env.GEMINI_TEMPERATURE, 0.7, 0, 1),
  geminiMaxOutputTokens: Math.round(
    boundedNumber(process.env.GEMINI_MAX_OUTPUT_TOKENS, 4000, 1000, 8000)
  ),
  rateLimitWindowMs: 60 * 1000,
  rateLimitMax: 10
};

module.exports = config;
