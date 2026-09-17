import React from 'react';

export default function Brand() {
  return (
    <>
      <div className="flex items-center gap-3 mb-1.5">
        <span className="w-3 h-3 rounded-full bg-gold shadow-[0_0_10px_rgba(201,162,39,0.3)] shrink-0" />
        <h1 className="m-0 font-serif text-[26px] font-medium tracking-tight text-paper">
          AI presentation
        </h1>
      </div>
      <p className="text-muted text-[13px] leading-relaxed m-0 mb-7 ml-6">
        write a topic and AI generate presentation
      </p>
    </>
  );
}
