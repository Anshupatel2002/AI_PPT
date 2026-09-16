import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import Brand from './Brand';
import TopicInput from './TopicInput';
import OptionSelect from './OptionSelect';
import SlideSlider from './SlideSlider';

export default function Sidebar({
  topic,
  onTopicChange,
  style,
  onStyleChange,
  language,
  onLanguageChange,
  count,
  onCountChange,
  onGenerate,
  isGenerating
}) {
  return (
    <aside className="w-full bg-panel border-b lg:border-b-0 lg:border-r border-white/10 p-6 lg:p-8 lg:min-h-screen flex flex-col">
      <Brand />

      <TopicInput
        topic={topic}
        onChange={onTopicChange}
        onSubmit={onGenerate}
        disabled={isGenerating}
      />

      <OptionSelect
        style={style}
        onStyleChange={onStyleChange}
        language={language}
        onLanguageChange={onLanguageChange}
        disabled={isGenerating}
      />

      <SlideSlider
        count={count}
        onChange={onCountChange}
        disabled={isGenerating}
      />

      <button
        className="w-full border-0 rounded-lg py-3.5 px-4 bg-gradient-to-br from-gold to-gold-2 text-[#111318] font-semibold text-[15px] cursor-pointer flex items-center justify-center gap-2.5 transition-all duration-150 shadow-[0_4px_16px_rgba(201,162,39,0.25)] hover:brightness-105 hover:shadow-[0_6px_20px_rgba(201,162,39,0.35)] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mt-1.5"
        onClick={onGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 size={18} className="animate-spin-fast" />
            <span>AI Outline Ban Raha Hai...</span>
          </>
        ) : (
          <>
            <Sparkles size={18} />
            <span>Generate</span>
          </>
        )}
      </button>

      <p className="text-muted text-xs leading-relaxed mt-4 text-center">
        AI outline ke baad aap slide titles aur bullets edit kar sakte hain. Phir .pptx download karein.
      </p>
    </aside>
  );
}
