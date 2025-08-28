
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormElement } from '../../types';

interface OpinionScaleInputProps {
  element: FormElement;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

export const OpinionScaleInput: React.FC<OpinionScaleInputProps> = ({ element, value, onChange, error }) => {
  const { t } = useTranslation();
  const startAt = element.startAt === 0 ? 0 : 1;
  const outOf = element.outOf || 10;
  const scale = Array.from({ length: outOf - startAt + 1 }, (_, i) => i + startAt);
  const initialValue = value ?? element.value;
  
  const isClassic = element.labelStyle === 'classic' || element.subfield;
  const isSmall = element.fieldSize === 'sm';
  const questionClasses = `block font-bold mb-1 ${isClassic || isSmall ? 'text-sm' : 'text-base'} ${error ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`;
  const descriptionClasses = `text-gray-500 dark:text-gray-400 mb-2 ${isClassic || isSmall ? 'text-xs' : 'text-sm'}`;

  return (
    <div className="w-full mb-4">
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
      
      <div className="flex justify-between items-center space-x-2">
        {scale.map(num => {
          const isSelected = initialValue === num;
          return (
            <label key={num} className="cursor-pointer">
              <input
                type="radio"
                name={element.name}
                value={num}
                checked={isSelected}
                onChange={() => !element.disabled && onChange(num)}
                className="sr-only"
                disabled={element.disabled}
              />
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'} ${!element.disabled && 'hover:border-blue-400'}`}
              >
                {num}
              </div>
            </label>
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
        {!element.hideLabelStart && <span>{element.labelStart || t('disagree')}</span>}
        {!element.hideLabelEnd && <span>{element.labelEnd || t('agree')}</span>}
      </div>
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
};