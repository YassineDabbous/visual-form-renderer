
import React from 'react';
import { FormElement } from '../../types';

interface SwitchInputProps {
  element: FormElement;
  value: boolean;
  onChange: (value: boolean) => void;
}

export const SwitchInput: React.FC<SwitchInputProps> = ({ element, value, onChange }) => {
  const isChecked = value === true || element.value === true;
  
  const isClassic = element.labelStyle === 'classic' || element.subfield;
  const isSmall = element.fieldSize === 'sm';
  const labelClasses = `text-gray-800 dark:text-gray-200 font-medium ${isClassic || isSmall ? 'text-sm' : 'text-base'}`;
  const descriptionClasses = `text-gray-500 dark:text-gray-400 ${isClassic || isSmall ? 'text-xs' : 'text-sm'}`;

  return (
    <div className="w-full mb-4">
        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div>
                {element.question && 
                    <div className={labelClasses}>
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
            </div>
            <button
                type="button"
                className={`${
                    isChecked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50`}
                role="switch"
                aria-checked={isChecked}
                onClick={() => !element.disabled && onChange(!isChecked)}
                disabled={element.disabled}
            >
                <span
                    className={`${
                        isChecked ? 'translate-x-5' : 'translate-x-0'
                    } rtl:-translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
            </button>
        </div>
    </div>
  );
};