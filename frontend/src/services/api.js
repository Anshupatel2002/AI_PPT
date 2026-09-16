/**
 * API client for Deck Draft backend
 */

export async function fetchOutline({ topic, style, lang, count }) {
  const response = await fetch('/api/generate-outline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      topic,
      style,
      lang,
      count
    })
  });

  const rawText = await response.text();

  if (!rawText || !rawText.trim()) {
    throw new Error(`Server returned an empty response (HTTP ${response.status}).`);
  }

  let data;
  try {
    data = JSON.parse(rawText);
  } catch (err) {
    throw new Error(`Server returned invalid JSON format (HTTP ${response.status}).`);
  }

  if (!response.ok) {
    throw new Error(data?.error || 'AI server encountered an error while generating outline.');
  }

  if (!data || !Array.isArray(data.slides)) {
    throw new Error('AI response does not contain a valid slides array.');
  }

  return data;
}

export async function checkHealth() {
  try {
    const res = await fetch('/healthz');
    return await res.json();
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
