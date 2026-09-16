import React from 'react';

export default function LoadingState() {
  return (
    <div className="max-w-xl mx-auto my-32 text-center flex flex-col items-center gap-5">
      <div className="w-11 h-11 rounded-full border-[3px] border-white/10 border-t-gold animate-spin-fast" />
      <h3 className="text-lg font-medium text-paper m-0">
        Gemini presentation outline craft kar raha hai...
      </h3>
      <p className="text-muted text-sm m-0">
        Structured slides, titles, aur clean bullet points taiyaar ho rahe hain.
      </p>
    </div>
  );
}
