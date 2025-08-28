
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FormElement } from '../../types';

interface FileInputProps {
  element: FormElement;
  value: File | null;
  onChange: (value: File | null) => void;
  error?: string;
}

export const FileInput: React.FC<FileInputProps> = ({ element, value, onChange, error: propError }) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string | null>(value?.name || element.currentFile || null);
  const [internalError, setInternalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFileName(null);
      onChange(null);
      setInternalError(null);
      return;
    }

    // Validation
    const sizeLimitMB = element.sizeLimit || 10;
    const sizeLimitBytes = sizeLimitMB * 1024 * 1024;
    if (file.size > sizeLimitBytes) {
      setInternalError(t('fileTooLarge', { size: sizeLimitMB }));
      setFileName(null);
      onChange(null);
      if(inputRef.current) inputRef.current.value = "";
      return;
    }

    if (element.imageOnly && !file.type.startsWith('image/')) {
      setInternalError(t('invalidFileType'));
      setFileName(null);
      onChange(null);
      if(inputRef.current) inputRef.current.value = "";
      return;
    }
    
    setInternalError(null);
    setFileName(file.name);
    onChange(file);
  };
  
  const isClassic = element.labelStyle === 'classic' || element.subfield;
  const isSmall = element.fieldSize === 'sm';
  const questionClasses = `block font-bold mb-1 ${isClassic || isSmall ? 'text-sm' : 'text-base'} ${propError || internalError ? 'text-red-700 dark:text-red-500' : 'text-gray-700 dark:text-gray-300'}`;
  const descriptionClasses = `text-gray-500 dark:text-gray-400 mb-2 ${isClassic || isSmall ? 'text-xs' : 'text-sm'}`;

  const displayError = propError || internalError;

  return (
    <div className="w-full mb-4">
      {element.question && <label className={questionClasses}>{element.question}{element.required && <span className="text-red-500">*</span>}</label>}
      {element.description && <p className={descriptionClasses}>{element.description}</p>}
      <div className="mt-2 flex items-center">
        <button
          type="button"
          disabled={element.disabled}
          onClick={() => inputRef.current?.click()}
          className={`px-4 py-2 font-semibold rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-75 disabled:opacity-50 ${propError || internalError ? 'border-red-500 text-red-700' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:ring-blue-500'}`}
        >
          {t('chooseFile')}
        </button>
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
          required={element.required && !fileName}
          disabled={element.disabled}
          accept={element.imageOnly ? 'image/*' : undefined}
        />
        {fileName && <span className="ms-4 text-gray-600 dark:text-gray-400 truncate">{fileName}</span>}
      </div>
      {displayError && <p className="text-red-500 text-sm mt-2">{displayError}</p>}
    </div>
  );
};