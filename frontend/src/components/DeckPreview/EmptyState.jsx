import React from 'react';
import { Presentation } from 'lucide-react';

export default function EmptyState() {
  return (
    <div className="max-w-xl mx-auto my-24 text-center p-8 lg:p-10 bg-panel border border-white/10 rounded-xl shadow-lg">
      <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gold/15 flex items-center justify-center text-gold">
        <Presentation size={28} />
      </div>
      <h2 className="font-serif text-2xl font-medium mb-3 text-paper">
        AI PPT Generator for Any Topic
      </h2>
      <p className="text-muted text-sm leading-relaxed m-0">
        Create an editable PowerPoint presentation with AI. Generate clear slides,
        useful bullet points, and a structure matched to students, professionals,
        and business audiences.
      </p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <strong className="block text-xs text-paper">Student mode</strong>
          <span className="text-xs text-muted">Simple explanations and comparisons</span>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <strong className="block text-xs text-paper">Professional mode</strong>
          <span className="text-xs text-muted">Business context and next steps</span>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
          <strong className="block text-xs text-paper">Export ready</strong>
          <span className="text-xs text-muted">Edit slides and download PPTX</span>
        </div>
      </div>
    </div>
  );
}
