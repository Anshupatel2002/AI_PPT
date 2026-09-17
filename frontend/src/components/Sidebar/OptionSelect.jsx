import React from 'react';
import CustomSelect from '../Common/CustomSelect';

const STYLE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'student', label: 'Student / Learner' },
  { value: 'academic', label: 'Academic / Research' },
  { value: 'creative', label: 'Creative / Pitch' },
  { value: 'minimal', label: 'Minimal' }
];

const LANGUAGE_OPTIONS = [
  { value: 'English', label: 'English' },
  { value: 'Hindi (Devanagari script)', label: 'Hindi' },
  { value: 'Hinglish (Roman script)', label: 'Hinglish' },
  { value: 'Gujarati', label: 'Gujarati' },
  { value: 'Marathi', label: 'Marathi' },
  { value: 'Bengali', label: 'Bengali' },
  { value: 'Punjabi', label: 'Punjabi' },
  { value: 'Tamil', label: 'Tamil' },
  { value: 'Telugu', label: 'Telugu' },
  { value: 'Kannada', label: 'Kannada' },
  { value: 'Malayalam', label: 'Malayalam' },
  { value: 'Urdu', label: 'Urdu' },
  { value: 'Odia', label: 'Odia' },
  { value: 'Assamese', label: 'Assamese' },
  { value: 'French', label: 'French' },
  { value: 'Spanish', label: 'Spanish' },
  { value: 'German', label: 'German' },
  { value: 'Italian', label: 'Italian' },
  { value: 'Portuguese', label: 'Portuguese' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Chinese (Simplified)', label: 'Chinese (Simplified)' },
  { value: 'Chinese (Traditional)', label: 'Chinese (Traditional)' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Turkish', label: 'Turkish' },
  { value: 'Dutch', label: 'Dutch' }
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
        label="Audience"
        value={style}
        options={STYLE_OPTIONS}
        onChange={onStyleChange}
        disabled={disabled}
      />

      <CustomSelect
        label="Language"
        value={language}
        options={LANGUAGE_OPTIONS}
        onChange={onLanguageChange}
        disabled={disabled}
      />
    </div>
  );
}

