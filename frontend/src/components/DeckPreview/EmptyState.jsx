import React from 'react';
import { Presentation } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="max-w-xl mx-auto my-24 text-center p-8 lg:p-10 bg-panel border border-white/10 rounded-xl shadow-lg">
      <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gold/15 flex items-center justify-center text-gold">
        <Presentation size={28} />
      </div>
      <h2 className="font-serif text-2xl font-medium mb-3 text-paper">
        Har achhi presentation ek achhe outline se shuru hoti hai.
      </h2>
      <p className="text-muted text-sm leading-relaxed m-0">
        Apna topic left side mein likhiye. Gemini structured presentation outline banayega,
        jise aap edit karke PowerPoint file mein download kar sakte hain.
      </p>
    </div>
  );
}
