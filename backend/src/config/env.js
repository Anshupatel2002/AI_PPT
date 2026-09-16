require('dotenv').config();

const config = {
  port: Number(process.env.PORT) || 3000,
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
  rateLimitWindowMs: 60 * 1000,
  rateLimitMax: 10
};

module.exports = config;
