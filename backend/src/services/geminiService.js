const config = require('../config/env');
const { buildSystemPrompt } = require('../utils/promptBuilder');
const { parseModelJson } = require('../utils/jsonParser');
const { validateDeck } = require('../utils/deckValidator');

class GeminiService {
  async generatePresentationOutline({ topic, style, language, count }) {
    if (!config.geminiApiKey) {
      const error = new Error('GEMINI_API_KEY is missing. Add it to your backend .env file.');
      error.statusCode = 500;
      throw error;
    }

    const systemPrompt = buildSystemPrompt({
      style,
      language,
      count
    });

    console.log('[GeminiService] Requesting outline from Gemini:', {
      model: config.geminiModel,
      slides: count,
      language,
      style,
      audience: style
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      config.geminiModel
    )}:generateContent`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': config.geminiApiKey
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: `Topic: ${topic.trim()}` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4000,
          responseMimeType: 'application/json'
        }
      })
    });

    const rawResponse = await response.text();

    if (!response.ok) {
      console.error('[GeminiService Error] Raw response:', rawResponse);

      let message = 'Gemini API request failed.';
      try {
        const errorJson = JSON.parse(rawResponse);
        const rawMsg = errorJson?.error?.message || '';

        if (
          response.status === 429 ||
          rawMsg.toLowerCase().includes('quota') ||
          rawMsg.toLowerCase().includes('rate_limit') ||
          rawMsg.toLowerCase().includes('resource_exhausted')
        ) {
          const retryMatch = rawMsg.match(/retry in\s+([\d.]+)\s*s/i);
          const seconds = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : null;

          message = seconds
            ? `Gemini quota exceeded. Please wait ${seconds} seconds before trying again.`
            : 'Gemini free tier quota exceeded. Please wait a minute and try again.';
        } else {
          message = rawMsg || message;
        }
      } catch (_) {
        if (rawResponse) {
          message = rawResponse.substring(0, 300);
        }
      }

      const error = new Error(message);
      error.statusCode = response.status === 429 ? 429 : 502;
      throw error;
    }

    if (!rawResponse || !rawResponse.trim()) {
      const error = new Error('Gemini returned an empty response.');
      error.statusCode = 502;
      throw error;
    }

    let geminiData;
    try {
      geminiData = JSON.parse(rawResponse);
    } catch (err) {
      console.error('[GeminiService JSON Error]:', rawResponse);
      const error = new Error('Gemini returned an invalid API response format.');
      error.statusCode = 502;
      throw error;
    }

    const candidates = geminiData?.candidates;
    if (!Array.isArray(candidates) || candidates.length === 0) {
      const error = new Error('Gemini did not return any candidate response.');
      error.statusCode = 502;
      throw error;
    }

    const parts = candidates[0]?.content?.parts || [];
    const generatedText = parts
      .map(p => (typeof p?.text === 'string' ? p.text : ''))
      .join('')
      .trim();

    if (!generatedText) {
      const error = new Error('Gemini returned empty text content.');
      error.statusCode = 502;
      throw error;
    }

    // Parse model output JSON
    let parsedDeck;
    try {
      parsedDeck = parseModelJson(generatedText);
    } catch (err) {
      const error = new Error(err.message || 'Failed to parse presentation JSON from model.');
      error.statusCode = 502;
      throw error;
    }

    // Validate and sanitize schema
    const validatedDeck = validateDeck(parsedDeck);
    return validatedDeck;
  }
}

module.exports = new GeminiService();
