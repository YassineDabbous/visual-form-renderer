
import React from 'react';
import { FormElement, ChoiceOption } from '../../types';

interface PictureChoiceInputProps {
  element: FormElement;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

export const PictureChoiceInput: React.FC<PictureChoiceInputProps> = ({ element, value, onChange, error }) => {
  const handleCheckboxChange = (optionValue: string) => {
    const currentValue = Array.isArray(value) ? value : [];
    if (currentValue.includes(optionValue)) {
      onChange(currentValue.filter(v => v !== optionValue));
    } else {
      onChange([...currentValue, optionValue]);
    }
  };

  const isClassic = element.labelStyle === 'classic' || element.subfield;
  const isSmall = element.fieldSize === 'sm';
  const questionClasses = `block font-bold mb-1 ${isClassic || isSmall ? 'text-sm' : 'text-base'} ${error ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`;
  const descriptionClasses = `text-gray-500 dark:text-gray-400 mb-2 ${isClassic || isSmall ? 'text-xs' : 'text-sm'}`;

  const initialValue = value ?? element.checked ?? (element.multiple ? [] : '');

  return (
    <div className={`w-full mb-4 p-1 rounded-lg ${error ? 'ring-2 ring-red-500' : ''}`}>
      {element.question && 
         <div className={`${questionClasses} mb-2`}>
            <span className="me-2">{element.question}</span>
            {element.required && <span className="text-red-500 me-2">*</span>}
            {element.score !== undefined && (
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-bold rounded-full">
                {element.score} pts
                </span>
            )}
        </div>
      }
      {element.description && <p className={descriptionClasses}>{element.description}</p>}
      {element.multiple && !element.hideFormText && <p className={descriptionClasses}>Choose as many as you like.</p>}
      
      <div className={`grid gap-4 ${element.supersize ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {element.choices?.map((option: ChoiceOption) => {
          const isSelected = element.multiple ? initialValue.includes(option.value) : initialValue === option.value;
          return (
            <label
              key={option.value}
              className={`relative cursor-pointer rounded-lg border-2 p-2 transition-all ${isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-300 dark:border-gray-600'} ${element.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400'}`}
            >
              <input
                type={element.multiple ? 'checkbox' : 'radio'}
                name={element.name}
                value={option.value}
                checked={isSelected}
                onChange={() => !element.disabled && (element.multiple ? handleCheckboxChange(option.value) : onChange(option.value))}
                className="sr-only" // Hide the actual radio/checkbox
                disabled={element.disabled}
              />
              <img src={option.image || 'https://picsum.photos/200'} alt={option.label} className="w-full h-auto object-cover rounded-md" />
              {!element.hideLabels && (
                <span className="block text-center mt-2 text-sm text-gray-700 dark:text-gray-300">{option.label}</span>
              )}
            </label>
          );
        })}
      </div>
       {error && <p className="text-red-500 text-xs italic mt-2 ps-1">{error}</p>}
    </div>
  );
};