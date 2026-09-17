import React from 'react';
import { RotateCw, Download, Loader2 } from 'lucide-react';

export default function DeckHeader({
  title,
  subtitle,
  onTitleChange,
  onSubtitleChange,
  onRegenerate,
  onDownload,
  isExporting
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pb-6 border-b border-white/10">
      <div className="flex-1">
        <input
          type="text"
          className="w-full font-serif text-2xl lg:text-3xl font-medium text-paper bg-transparent border border-transparent hover:border-white/15 focus:border-gold hover:bg-white/[0.03] focus:bg-white/[0.04] rounded-md py-1 px-2 -ml-2 outline-none transition-colors placeholder:text-muted/50"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Presentation Title"
        />
        <input
          type="text"
          className="w-full text-base text-muted bg-transparent border border-transparent hover:border-white/15 focus:border-gold hover:bg-white/[0.03] focus:bg-white/[0.04] rounded-md py-1 px-2 -ml-2 mt-1 outline-none transition-colors placeholder:text-muted/40"
          value={subtitle}
          onChange={(e) => onSubtitleChange(e.target.value)}
          placeholder="Add a subtitle..."
        />
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          className="inline-flex items-center gap-2 border border-white/10 rounded-lg py-2.5 px-4 bg-panel-2 hover:bg-white/10 text-paper font-medium text-sm cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onRegenerate}
          disabled={isExporting}
        >
          <RotateCw size={15} />
          <span>Regenerate</span>
        </button>

        <button
          className="inline-flex items-center gap-2 border-0 rounded-lg py-2.5 px-4.5 bg-gold hover:bg-gold-2 text-[#102a3a] font-semibold text-sm cursor-pointer transition-all duration-150 shadow-md shadow-gold/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onDownload}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 size={15} className="animate-spin-fast" />
              <span>PPTX ban raha hai...</span>
            </>
          ) : (
            <>
              <Download size={15} />
              <span>.pptx Download</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
