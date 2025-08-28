
import React from 'react';
import { FormElement } from '../../types';

interface SelectInputProps {
  element: FormElement;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

// FIX: Updated function to handle both array and object types for options, as allowed by FormElement type.
const normalizeOptions = (options: any[] | object) => {
    if (Array.isArray(options)) {
        return options.map(opt => 
            typeof opt === 'string' ? { label: opt, value: opt } : { label: opt.label, value: opt.value || opt.label }
        );
    }
    if (typeof options === 'object' && options !== null) {
        return Object.entries(options).map(([value, label]) => ({ label: String(label), value }));
    }
    return [];
};

export const SelectInput: React.FC<SelectInputProps> = ({ element, value, onChange, error }) => {
  const isClassic = element.labelStyle === 'classic' || element.subfield;
  const isSmall = element.fieldSize === 'sm';

  const questionClasses = `block font-bold mb-1 ${isClassic || isSmall ? 'text-sm' : 'text-base'} ${error ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`;
  const descriptionClasses = `text-gray-500 dark:text-gray-400 mb-2 ${isClassic || isSmall ? 'text-xs' : 'text-sm'}`;
  const selectClasses = `shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 disabled:bg-gray-200 dark:disabled:bg-gray-600 ${isSmall ? 'text-sm' : 'text-base'} ${error ? 'border-red-500 focus:ring-red-500' : 'dark:border-gray-600 focus:ring-blue-500'}`;

  const finalOptions = normalizeOptions(element.options || []);
  const initialValue = value ?? element.selected ?? '';

  return (
    <div className="w-full mb-4">
      {element.question && (
        <label className={questionClasses}>
          <span className="me-2">{element.question}</span>
          {element.required && <span className="text-red-500 me-2">*</span>}
          {element.score !== undefined && (
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-bold rounded-full">
              {element.score} pts
            </span>
          )}
        </label>
      )}
      {element.description && <p className={descriptionClasses}>{element.description}</p>}
      <select
        className={selectClasses}
        value={initialValue}
        onChange={(e) => onChange(e.target.value)}
        required={element.required}
        disabled={element.disabled}
      >
        {element.placeholder && <option value="" disabled>{element.placeholder}</option>}
        {finalOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
};