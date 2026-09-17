import React from 'react';

export default function SlideSlider({ count, onChange, disabled }) {
  return (
    <div className="mb-5">
      <label
        htmlFor="slide-count"
        className="block text-muted text-xs font-medium uppercase tracking-wider mb-2"
      >
        Number of slides
      </label>
      <div className="flex items-center gap-3.5 bg-bg px-3.5 py-2.5 rounded-lg border border-white/10">
        <input
          type="range"
          id="slide-count"
          min="5"
          max="16"
          value={count}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="flex-1 accent-gold cursor-pointer"
        />
        <span className="min-w-[24px] text-right text-gold font-mono font-semibold text-[15px]">
          {count}
        </span>
      </div>
    </div>
  );
}
