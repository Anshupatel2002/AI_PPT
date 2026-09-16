import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomSelect({
  label,
  value,
  options,
  onChange,
  disabled
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="block text-muted text-xs font-medium uppercase tracking-wider mb-2">
          {label}
        </label>
      )}

      <button
        type="button"
        className={`w-full text-paper bg-bg border rounded-lg py-2.5 px-3.5 outline-none text-sm flex items-center justify-between cursor-pointer transition-all duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed ${
          isOpen
            ? 'border-gold ring-2 ring-gold/25'
            : 'border-white/10 hover:border-gold/50 hover:bg-white/[0.02]'
        }`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate font-normal text-left">
          {selectedOption?.label || value}
        </span>
        <ChevronDown
          size={16}
          className={`text-muted transition-transform duration-200 shrink-0 ml-2 ${
            isOpen ? 'rotate-180 text-gold' : ''
          }`}
        />
      </button>

      {isOpen && (
        <ul
          className="absolute top-[calc(100%+6px)] left-0 right-0 bg-[#1a1e27] border border-gold/30 rounded-lg p-1.5 m-0 list-none z-50 shadow-[0_10px_30px_rgba(0,0,0,0.6),0_0_15px_rgba(201,162,39,0.1)] backdrop-blur-md animate-dropdown"
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={`flex items-center justify-between py-2 px-3 rounded-md text-[13.5px] cursor-pointer transition-colors duration-150 ${
                  isSelected
                    ? 'bg-gold/20 text-gold font-medium'
                    : 'text-paper hover:bg-gold/10 hover:text-gold-2'
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <span>{option.label}</span>
                {isSelected && <Check size={14} className="text-gold shrink-0 ml-2" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
