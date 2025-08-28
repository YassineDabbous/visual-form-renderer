
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormSlide, FormDefinition } from '../types';
import { evaluateCondition } from '../utils/conditionEvaluator';

interface PreviewSlideProps {
  allSlides: FormSlide[];
  formAnswers: { [key: string]: any };
  componentMap: { [key: string]: React.FC<any> };
  onEdit: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  formDefinition: FormDefinition;
}

export const PreviewSlide: React.FC<PreviewSlideProps> = ({
  allSlides,
  formAnswers,
  componentMap,
  onEdit,
  onSubmit,
  isSubmitting,
  formDefinition,
}) => {
  const { t } = useTranslation();
  const interactiveSlides = allSlides.filter(
    s => s !== formDefinition.startSlide && s !== formDefinition.endSlide
  );

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
      <h1 className="text-3xl font-bold text-center mb-2">{t('reviewAnswers')}</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">{t('reviewInstructions')}</p>
      
      <div className="space-y-6 border-t border-b border-gray-200 dark:border-gray-700 py-6">
        {interactiveSlides.map((slide, slideIndex) => (
          <div key={`preview-slide-${slideIndex}`}>
            {slide.elements
              .filter(element => {
                if (!element.name) return false;
                if (element.displayCondition && !evaluateCondition(element.displayCondition.condition, formAnswers)) {
                  return false;
                }
                return true;
              })
              .map((element, elementIndex) => {
                const Component = componentMap[element.type];
                if (!Component) return null;

                const elementWithValue = {
                  ...element,
                  disabled: true,
                  autofocus: false,
                };
                
                return (
                  <div key={`${element.name}-${elementIndex}`} className="opacity-75 pointer-events-none">
                    <Component
                      element={elementWithValue}
                      value={formAnswers[element.name!]}
                      onChange={() => {}}
                    />
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onEdit}
          disabled={isSubmitting}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 disabled:opacity-50"
        >
          {t('editAnswers')}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 disabled:bg-green-300 transition-all"
        >
          {isSubmitting ? t('submitting') : t('submit')}
        </button>
      </div>
    </div>
  );
};