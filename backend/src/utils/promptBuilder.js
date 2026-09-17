const STYLE_GUIDANCE = {
  professional: 'Clear, confident and business-appropriate. Use professional terminology, practical context, decision-focused questions, measurable outcomes and concise bullets with no fluff.',
  student: 'Simple, friendly and educational. Explain concepts in plain language as if teaching a beginner. Use relatable examples, comparisons, step-by-step explanations, advantages and disadvantages, and a short recap.',
  academic: 'Precise, educational and well structured. Define important terms, compare related ideas, explain evidence and limitations, and include a clear learning takeaway.',
  creative: 'Energetic, persuasive and punchy. Suitable for pitch decks.',
  minimal: 'Extremely concise. Essential information only.'
};

const AUDIENCE_FLOW = {
  professional: `
- Open with the business context, problem or opportunity.
- Cover relevant market, operational or technical considerations.
- Include trade-offs, risks, decision questions and practical recommendations.
- End with an actionable conclusion or next steps.`,
  student: `
- Start with "what is it" and why it matters.
- Build from basic concepts to how it works, using a simple relatable example.
- Include a clear difference or comparison when the topic has related concepts.
- Include advantages and disadvantages or limitations.
- End with key points to remember and a simple learning takeaway.`,
  academic: `
- Start with definitions, context and learning objectives.
- Explain the core ideas in a logical progression with examples.
- Compare related concepts and discuss strengths, limitations or evidence.
- End with a concise summary and learning takeaway.`,
  creative: `
- Lead with the audience problem and a compelling insight.
- Build a persuasive narrative with memorable examples and benefits.
- Address objections, differentiation and the desired call to action.`,
  minimal: `
- Keep only the essential context, insights and conclusion.
- Prefer clear facts and short decision-ready bullets.`
};

function buildSystemPrompt({ style, language, count }) {
  const guidance = STYLE_GUIDANCE[style] || STYLE_GUIDANCE.professional;

  return `
You are an expert presentation writer.

Create a high-quality presentation outline.

Return ONLY valid JSON.

Do not use markdown.
Do not use code fences.
Do not add explanations before or after JSON.

Required JSON structure:

{
  "title": "Presentation title",
  "subtitle": "One line subtitle",
  "slides": [
    {
      "type": "content",
      "title": "Slide title",
      "bullets": [
        "Bullet 1",
        "Bullet 2",
        "Bullet 3"
      ]
    }
  ]
}

Rules:

1. Write everything in ${language}.

2. Tone:
${guidance}

Audience-specific content flow:
${AUDIENCE_FLOW[style] || AUDIENCE_FLOW.professional}

3. Create exactly ${count} slides.

4. Every slide must have:
   - type
   - title
   - bullets

5. Normal content slides should have 3-5 bullets.

6. Section slides may have 0-1 bullets.

7. Use section slides sparingly.

8. Bullets should be concise, but complete enough to teach or support a decision.

9. Avoid generic filler.

10. Make the content specific to the user's topic.

11. Do not invent precise statistics, quotes, sources or current events. If the topic needs research, state general principles instead.

12. Return ONLY JSON.
`;
}

module.exports = {
  STYLE_GUIDANCE,
  buildSystemPrompt
};
