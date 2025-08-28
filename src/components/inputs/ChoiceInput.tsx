
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormElement, ChoiceOption } from '../../types';

interface ChoiceInputProps {
  element: FormElement;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}

const normalizeChoices = (choices: any[]): ChoiceOption[] => {
    return choices.map(choice => 
        typeof choice === 'string' ? { label: choice, value: choice } : { label: choice.label, value: choice.value || choice.label }
    );
}

export const ChoiceInput: React.FC<ChoiceInputProps> = ({ element, value, onChange, error }) => {
  const { t } = useTranslation();
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

  const finalChoices = normalizeChoices(element.choices || []);
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
      {element.multiple && !element.hideFormText && <p className={descriptionClasses}>{t('chooseAsMany')}</p>}
      
      <div className={`space-y-2 ${element.horizontal ? 'flex space-x-4 space-y-0' : ''}`}>
        {finalChoices.map((option: ChoiceOption) => (
          <label key={option.value} className="flex items-center p-3 w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <input
              type={element.multiple ? 'checkbox' : 'radio'}
              name={element.name}
              value={option.value}
              checked={element.multiple ? (initialValue && initialValue.includes(option.value)) : initialValue === option.value}
              onChange={() => element.multiple ? handleCheckboxChange(option.value) : onChange(option.value)}
              disabled={element.disabled}
              className={element.multiple ? "form-checkbox h-5 w-5 text-blue-600" : "form-radio h-5 w-5 text-blue-600"}
            />
            <span className="ms-3 text-gray-800 dark:text-gray-200">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-red-500 text-xs italic mt-2 ps-1">{error}</p>}
    </div>
  );
};