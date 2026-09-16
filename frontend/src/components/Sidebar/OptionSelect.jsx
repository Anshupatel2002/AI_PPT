import React from 'react';
import CustomSelect from '../Common/CustomSelect';

const STYLE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'academic', label: 'Academic' },
  { value: 'creative', label: 'Creative / Pitch' },
  { value: 'minimal', label: 'Minimal' }
];

const LANGUAGE_OPTIONS = [
  { value: 'Hindi (Devanagari script)', label: 'Hindi' },
  { value: 'English', label: 'English' },
  { value: 'Hinglish (Roman script)', label: 'Hinglish' }
];

export default function OptionSelect({
  style,
  onStyleChange,
  language,
  onLanguageChange,
  disabled
}) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-3">
      <CustomSelect
        label="Types"
        value={style}
        options={STYLE_OPTIONS}
        onChange={onStyleChange}
        disabled={disabled}
      />

      <CustomSelect
        label="Languages"
        value={language}
        options={LANGUAGE_OPTIONS}
        onChange={onLanguageChange}
        disabled={disabled}
      />
    </div>
  );
}
