import React from 'react';

export default function TopicInput({ topic, onChange, onSubmit, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <label
          htmlFor="topic-input"
          className="text-muted text-xs font-medium uppercase tracking-wider"
        >
          Topic
        </label>
        <span className="text-[11px] px-1.5 py-0.5 bg-panel-2 rounded text-muted border border-white/10">
          ⌘ + Enter
        </span>
      </div>
      <textarea
        id="topic-input"
        placeholder="Jaise: India mein AI startups ke liye 2026 growth strategy"
        value={topic}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={4}
        className="w-full text-paper bg-bg border border-white/10 rounded-lg p-3 text-sm min-h-[110px] resize-y leading-relaxed outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/25 placeholder:text-muted/60 disabled:opacity-50"
      />
    </div>
  );
}
