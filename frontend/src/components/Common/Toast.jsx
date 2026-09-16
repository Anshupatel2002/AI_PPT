import React, { useEffect, useState } from 'react';
import { AlertCircle, X, ChevronDown, ChevronUp, Clock, CheckCircle2 } from 'lucide-react';

export default function Toast({ message, onClose, duration = 6000 }) {
  const [showDetails, setShowDetails] = useState(false);

  // Parse retry seconds if available in message
  const retryMatch = typeof message === 'string' ? message.match(/retry in\s+([\d.]+)\s*s/i) : null;
  const initialRetry = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : null;

  const [timeLeft, setTimeLeft] = useState(initialRetry);

  // Sync timeLeft if a new error comes in
  useEffect(() => {
    setTimeLeft(initialRetry);
  }, [initialRetry]);

  // Live countdown timer interval
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // Auto dismiss toast after duration (or after timer completes + 3s)
  useEffect(() => {
    if (!message) return;

    const effectiveDuration = timeLeft !== null && timeLeft > 0
      ? (timeLeft + 3) * 1000
      : duration;

    const timer = setTimeout(() => {
      onClose();
    }, effectiveDuration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose, timeLeft]);

  if (!message) return null;

  const isQuota =
    typeof message === 'string' &&
    (message.toLowerCase().includes('quota') ||
      message.toLowerCase().includes('rate_limit') ||
      message.toLowerCase().includes('resource has been exhausted') ||
      message.toLowerCase().includes('free_tier'));

  const displayTitle = isQuota ? 'Rate Limit Exceeded' : 'Request Error';

  let primaryText = message;
  let hasTechnicalDetails = false;

  if (isQuota) {
    if (timeLeft !== null) {
      primaryText =
        timeLeft > 0
          ? `Gemini request quota exceeded. Please wait  before trying again.`
          : 'Quota cooldown complete. You can now try generating again.';
    } else {
      primaryText = 'Gemini free tier quota exceeded. Please wait a minute and try again.';
    }
    hasTechnicalDetails = message.length > 80;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-5 right-5 z-[100] w-[calc(100vw-2.5rem)] max-w-[420px] bg-[#18181b] border border-zinc-800 text-zinc-100 p-4 rounded-lg shadow-xl flex flex-col gap-2.5 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 w-full">
        <div className="w-8 h-8 rounded-md bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
          <AlertCircle size={17} className="text-red-400" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-xs font-semibold text-zinc-200 tracking-wide uppercase">
              {displayTitle}
            </h4>

            {timeLeft !== null && (
              timeLeft > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  <Clock size={11} className="animate-spin text-amber-400" style={{ animationDuration: '3s' }} />
                  <span>{timeLeft}s</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  <CheckCircle2 size={11} />
                  <span>Ready</span>
                </span>
              )
            )}
          </div>

          <p className="text-[13px] text-zinc-300 leading-snug m-0 break-words">
            {primaryText}
          </p>
        </div>

        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-zinc-100 p-1 rounded hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer self-start -mr-1 -mt-1"
          aria-label="Close notification"
          type="button"
        >
          <X size={15} />
        </button>
      </div>

      {hasTechnicalDetails && (
        <div className="pt-2 border-t border-zinc-800/80 text-xs">
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            className="text-zinc-400 hover:text-zinc-200 inline-flex items-center gap-1 text-[11px] cursor-pointer"
          >
            <span>{showDetails ? 'Hide details' : 'View details'}</span>
            {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>

          {showDetails && (
            <div className="mt-1.5 p-2 bg-zinc-900 rounded border border-zinc-800 font-mono text-[11px] text-zinc-400 leading-relaxed break-all max-h-24 overflow-y-auto">
              {message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
