import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function SlideCard({
  slide,
  index,
  onUpdateTitle,
  onUpdateBullet,
  onAddBullet,
  onRemoveBullet,
  onDeleteSlide
}) {
  const isSection = slide.type === 'section';
  const slideNumber = String(index + 1).padStart(2, '0');

  return (
    <article
      className={`relative rounded-xl p-5 sm:p-7 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 grid grid-cols-[36px_1fr_32px] sm:grid-cols-[44px_1fr_36px] gap-4 sm:gap-5 items-start ${
        isSection
          ? 'bg-[#191d26] text-paper border border-gold shadow-[0_4px_20px_rgba(201,162,39,0.15)]'
          : 'bg-paper-card text-ink border-t-4 border-t-gold border-x border-b border-black/[0.07]'
      }`}
    >
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold ${
          isSection
            ? 'bg-gold/15 text-gold'
            : 'bg-black/[0.07] text-[#495057]'
        }`}
      >
        {slideNumber}
      </div>

      <div className="flex-1">
        <input
          type="text"
          className={`w-full font-serif text-lg sm:text-xl font-semibold bg-transparent border border-transparent rounded py-1 px-1.5 -ml-1.5 outline-none mb-3 transition-colors ${
            isSection
              ? 'text-paper hover:bg-white/5 focus:bg-white/5 hover:border-white/20 focus:border-gold placeholder:text-muted/40'
              : 'text-[#1a1e26] hover:bg-black/[0.04] focus:bg-black/[0.04] hover:border-black/15 focus:border-gold placeholder:text-black/40'
          }`}
          value={slide.title || ''}
          onChange={(e) => onUpdateTitle(index, e.target.value)}
          placeholder="Slide Title"
        />

        <ul className="m-0 pl-5 flex flex-col gap-2 list-disc marker:text-gold">
          {(slide.bullets || []).map((bullet, bIndex) => (
            <li key={bIndex} className="group list-item">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className={`flex-1 text-sm sm:text-[15px] leading-relaxed bg-transparent border border-transparent rounded py-1 px-1.5 -ml-1.5 outline-none transition-colors ${
                    isSection
                      ? 'text-muted hover:bg-white/5 focus:bg-white/5 hover:border-white/15 focus:border-gold'
                      : 'text-[#343a40] hover:bg-black/[0.04] focus:bg-black/[0.04] hover:border-black/15 focus:border-gold'
                  }`}
                  value={bullet}
                  onChange={(e) => onUpdateBullet(index, bIndex, e.target.value)}
                  placeholder="Bullet point text..."
                />
                <button
                  className="opacity-0 group-hover:opacity-100 bg-transparent border-0 cursor-pointer text-muted hover:text-danger p-1 flex items-center transition"
                  onClick={() => onRemoveBullet(index, bIndex)}
                  title="Remove bullet point"
                  type="button"
                >
                  <X size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`mt-3 rounded py-1 px-2.5 text-xs cursor-pointer inline-flex items-center gap-1 transition ${
            isSection
              ? 'bg-transparent border border-dashed border-white/20 text-muted hover:bg-white/10 hover:border-white/40'
              : 'bg-transparent border border-dashed border-black/20 text-[#606b7a] hover:bg-black/5 hover:border-black/40'
          }`}
          onClick={() => onAddBullet(index)}
        >
          <Plus size={13} />
          <span>Add bullet point</span>
        </button>
      </div>

      <button
        className="bg-transparent border-0 text-muted hover:text-danger hover:bg-danger/10 p-1.5 rounded cursor-pointer flex items-center justify-center transition"
        onClick={() => onDeleteSlide(index)}
        title="Delete this slide"
        type="button"
      >
        <Trash2 size={16} />
      </button>
    </article>
  );
}
