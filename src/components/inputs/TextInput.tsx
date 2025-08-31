import React, { useEffect, useRef } from 'react';
import { FormElement } from '../../types';

interface TextInputProps {
  element: FormElement;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ element, value, onChange, error }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (element.autofocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [element.autofocus]);

  const isClassic = element.labelStyle === 'classic' || element.subfield;
  const isSmall = element.fieldSize === 'sm';

  const questionClasses = `block font-bold mb-1 ${isClassic || isSmall ? 'text-sm' : 'text-base'} ${error ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`;
  const descriptionClasses = `text-gray-500 dark:text-gray-400 mb-2 ${isClassic || isSmall ? 'text-xs' : 'text-sm'}`;
  const inputClasses = `shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:ring-2 disabled:bg-gray-200 dark:disabled:bg-gray-600 ${isSmall ? 'text-sm' : 'text-base'} ${error ? 'border-red-500 focus:ring-red-500' : 'dark:border-gray-600 focus:ring-blue-500'}`;

  const otherAttrs = element.attrs?.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}) || {};

  const inputElement = (
    <input
      ref={inputRef}
      type={element.type === 'text' ? 'text' : element.type}
      className={inputClasses}
      value={value || element.value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={element.placeholder}
      required={element.required}
      disabled={element.disabled}
      maxLength={element.maxlength}
      pattern={element.pattern}
      min={element.min}
      max={element.max}
      step={element.step}
      {...otherAttrs}
    />
  );

  return (
    <div className={`w-full mb-4 ${element.classNames?.join(' ')}`} id={element.id}>
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
      
      {element.unit || element.unitEnd ? (
        <div className="flex items-center">
          {element.unit && <span className="me-2 text-gray-500 dark:text-gray-400">{element.unit}</span>}
          {inputElement}
          {element.unitEnd && <span className="ms-2 text-gray-500 dark:text-gray-400">{element.unitEnd}</span>}
        </div>
      ) : (
        inputElement
      )}
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
};