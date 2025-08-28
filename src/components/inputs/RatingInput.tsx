
import React, { useState } from 'react';
import { FormElement } from '../../types';

interface RatingInputProps {
  element: FormElement;
  value: number;
  onChange: (value: number) => void;
  error?: string;
}

const StarIcon: React.FC<{ filled: boolean; onMouseEnter: () => void; onClick: () => void; onMouseLeave: () => void; }> = ({ filled, onMouseEnter, onClick, onMouseLeave }) => (
  <svg onMouseEnter={onMouseEnter} onClick={onClick} onMouseLeave={onMouseLeave} className={`w-8 h-8 cursor-pointer transition-colors ${filled ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const HeartIcon: React.FC<{ filled: boolean; onMouseEnter: () => void; onClick: () => void; onMouseLeave: () => void; }> = ({ filled, onMouseEnter, onClick, onMouseLeave }) => (
  <svg onMouseEnter={onMouseEnter} onClick={onClick} onMouseLeave={onMouseLeave} className={`w-8 h-8 cursor-pointer transition-colors ${filled ? 'text-red-500' : 'text-gray-300 dark:text-gray-600 hover:text-red-400'}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
  </svg>
);


export const RatingInput: React.FC<RatingInputProps> = ({ element, value, onChange, error }) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);
  const outOf = Math.min(Math.max(element.outOf || 5, 1), 10);
  const Icon = element.icon === 'heart' || element.icon === 'hearts' ? HeartIcon : StarIcon;
  const currentValue = value ?? element.value;

  const isClassic = element.labelStyle === 'classic' || element.subfield;
  const isSmall = element.fieldSize === 'sm';

  const questionClasses = `block font-bold mb-1 ${isClassic || isSmall ? 'text-sm' : 'text-base'} ${error ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`;
  const descriptionClasses = `text-gray-500 dark:text-gray-400 mb-2 ${isClassic || isSmall ? 'text-xs' : 'text-sm'}`;

  return (
    <div className="w-full mb-4">
      {element.question && 
        <div className={`${questionClasses} mb-2`}>
            <span className="mr-2">{element.question}</span>
            {element.required && <span className="text-red-500 mr-2">*</span>}
            {element.score !== undefined && (
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-bold rounded-full">
                {element.score} pts
                </span>
            )}
        </div>
      }
      {element.description && <p className={descriptionClasses}>{element.description}</p>}
      <div className="flex items-center space-x-1" onMouseLeave={() => setHoverValue(undefined)}>
        {[...Array(outOf)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
             <Icon
                filled={(hoverValue || currentValue) > i}
                onMouseEnter={() => !element.disabled && setHoverValue(i + 1)}
                onClick={() => !element.disabled && onChange(i + 1)}
                onMouseLeave={() => {}}
             />
             {!element.hideLabels && <span className="text-xs text-gray-500 mt-1">{i + 1}</span>}
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
    </div>
  );
};
