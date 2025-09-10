import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FormDefinition, FormSlide, FormElement } from '../types';
import { evaluateCondition } from '../utils/conditionEvaluator';
import { TextInput } from './inputs/TextInput';
import { TextAreaInput } from './inputs/TextAreaInput';
import { ChoiceInput } from './inputs/ChoiceInput';
import { RatingInput } from './inputs/RatingInput';
import { SwitchInput } from './inputs/SwitchInput';
import { SelectInput } from './inputs/SelectInput';
import { PictureChoiceInput } from './inputs/PictureChoiceInput';
import { OpinionScaleInput } from './inputs/OpinionScaleInput';
import { FileInput } from './inputs/FileInput';
import { PreviewSlide } from './PreviewSlide';
import { CorrectionSlide } from './CorrectionSlide';
import { CountdownTimer } from './CountdownTimer';

import { Heading } from './display/Heading';
import { Paragraph } from './display/Paragraph';
import { Image } from './display/Image';
import { HorizontalRule } from './display/HorizontalRule';
import { Blockquote } from './display/Blockquote';
import { UnorderedList } from './display/UnorderedList';
import { OrderedList } from './display/OrderedList';
import { Code } from './display/Code';

interface CustomFormRendererProps {
  formDefinition: FormDefinition;
  onSubmit: (answers: { [key: string]: any }) => void;
  durationInMinutes?: number;
  startedAt?: Date;
  language?: 'en' | 'fr' | 'ar';
  showCorrection?: boolean;
}

const componentMap: { [key: string]: React.FC<any> } = {
  // Inputs
  text: TextInput,
  textarea: TextAreaInput,
  email: (props) => <TextInput {...props} element={{...props.element, type: 'email'}} />,
  url: (props) => <TextInput {...props} element={{...props.element, type: 'url'}} />,
  tel: (props) => <TextInput {...props} element={{...props.element, type: 'tel'}} />,
  password: (props) => <TextInput {...props} element={{...props.element, type: 'password'}} />,
  number: (props) => <TextInput {...props} element={{...props.element, type: 'number'}} />,
  datetime: (props) => <TextInput {...props} element={{...props.element, type: 'datetime-local'}} />,
  date: (props) => <TextInput {...props} element={{...props.element, type: 'date'}} />,
  time: (props) => <TextInput {...props} element={{...props.element, type: 'time'}} />,
  select: SelectInput,
  choice: ChoiceInput,
  pictureChoice: PictureChoiceInput,
  rating: RatingInput,
  opinionScale: OpinionScaleInput,
  file: FileInput,
  switch: SwitchInput,
  
  // Display
  h1: Heading,
  h2: Heading,
  h3: Heading,
  h4: Heading,
  h5: Heading,
  h6: Heading,
  p: Paragraph,
  img: Image,
  hr: HorizontalRule,
  blockquote: Blockquote,
  ul: UnorderedList,
  ol: OrderedList,
  code: Code,
};

const CustomFormRenderer: React.FC<CustomFormRendererProps> = ({ formDefinition, onSubmit, durationInMinutes, startedAt, language = 'en', showCorrection = false }) => {
  const { t, i18n } = useTranslation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [formAnswers, setFormAnswers] = useState<{ [key: string]: any }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [mode, setMode] = useState<'filling' | 'correction'>('filling');
  
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
    document.documentElement.lang = language;
    document.documentElement.dir = i18n.dir(language);
  }, [language, i18n]);


  const allSlides = useMemo(() => {
    return [
      formDefinition.startSlide,
      ...formDefinition.slides,
      formDefinition.endSlide,
    ].filter((slide): slide is FormSlide => !!slide);
  }, [formDefinition]);

  const lastInteractiveSlideIndex = useMemo(() => {
    if (!formDefinition.endSlide) {
      return allSlides.length - 1;
    }
    return allSlides.length - 2;
  }, [allSlides, formDefinition.endSlide]);


  const handleInputChange = (name: string, value: any) => {
    setFormAnswers((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateCurrentSlide = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const currentSlideElements = allSlides[currentSlideIndex].elements;

    for (const element of currentSlideElements) {
      if (!element.name || (element.displayCondition && !evaluateCondition(element.displayCondition.condition, formAnswers))) {
        continue;
      }
      
      const value = formAnswers[element.name];
      
      if (element.required) {
        if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
            newErrors[element.name] = t('requiredField');
            continue;
        }
      }

      if (value) {
        switch (element.type) {
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors[element.name] = t('invalidEmail');
                }
                break;
            case 'url':
                try {
                    new URL(value);
                } catch (_) {
                    newErrors[element.name] = t('invalidUrl');
                }
                break;
            case 'number':
                if (isNaN(Number(value))) {
                    newErrors[element.name] = t('invalidNumber');
                } else {
                    const numValue = Number(value);
                    if (element.min !== undefined && numValue < Number(element.min)) {
                        newErrors[element.name] = t('minValue', { min: element.min });
                    }
                    if (element.max !== undefined && numValue > Number(element.max)) {
                        newErrors[element.name] = t('maxValue', { max: element.max });
                    }
                }
                break;
        }

        if (element.pattern) {
            const regex = new RegExp(element.pattern);
            if (!regex.test(value)) {
                newErrors[element.name] = t('patternMismatch');
            }
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const findNextSlide = () => {
    for (let i = currentSlideIndex + 1; i < allSlides.length; i++) {
      const nextSlide = allSlides[i];
      if (!nextSlide.slideOptions?.jumpCondition || evaluateCondition(nextSlide.slideOptions.jumpCondition, formAnswers)) {
        return i;
      }
    }
    return allSlides.length;
  };

  const handleNext = () => {
    if (!validateCurrentSlide()) {
      return;
    }
    if (currentSlideIndex === lastInteractiveSlideIndex) {
      setIsPreviewing(true);
    } else {
      const nextIndex = findNextSlide();
      if (nextIndex < allSlides.length) {
        setCurrentSlideIndex(nextIndex);
      }
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
        setErrors({}); // Clear errors when going back
        setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };
  
  const doSubmit = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    await onSubmit(formAnswers);
    setIsSubmitting(false);

    if (formDefinition.settings.isAutoSolvable && showCorrection) {
      setMode('correction');
    } else {
      const endSlideIndex = allSlides.findIndex(s => s === formDefinition.endSlide);
      if (endSlideIndex !== -1) {
          setIsPreviewing(false);
          setCurrentSlideIndex(endSlideIndex);
      }
    }
  }, [isSubmitting, onSubmit, formAnswers, formDefinition, allSlides, showCorrection]);

  useEffect(() => {
    if (!durationInMinutes) return;

    const startTime = startedAt ? new Date(startedAt) : new Date();
    const examEndTime = new Date(startTime.getTime() + durationInMinutes * 60 * 1000);
    setEndTime(examEndTime);

    const initialSecondsLeft = Math.max(0, Math.floor((examEndTime.getTime() - new Date().getTime()) / 1000));
    setTimeLeft(initialSecondsLeft);
  }, [durationInMinutes, startedAt]);

  useEffect(() => {
    if (!endTime) return;

    // If time has already expired on mount
    if (Math.floor((endTime.getTime() - new Date().getTime()) / 1000) <= 0) {
      if (mode === 'filling') doSubmit();
      return;
    }

    const intervalId = setInterval(() => {
      const secondsLeft = Math.max(0, Math.floor((endTime.getTime() - new Date().getTime()) / 1000));
      setTimeLeft(secondsLeft);

      if (secondsLeft <= 0) {
        clearInterval(intervalId);
        if (mode === 'filling') doSubmit();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endTime, doSubmit, mode]);


  const handleEdit = () => {
    setIsPreviewing(false);
  };

  if (mode === 'correction') {
    return (
      <CorrectionSlide 
        formDefinition={formDefinition}
        allSlides={allSlides}
        formAnswers={formAnswers}
      />
    );
  }

  if (isPreviewing) {
    return (
      <PreviewSlide
        allSlides={allSlides}
        formAnswers={formAnswers}
        componentMap={componentMap}
        onEdit={handleEdit}
        onSubmit={doSubmit}
        isSubmitting={isSubmitting}
        formDefinition={formDefinition}
      />
    );
  }

  const currentSlide = allSlides[currentSlideIndex];
  if (!currentSlide) {
      return null;
  }
    
  const isEndSlide = !!formDefinition.endSlide && currentSlide === formDefinition.endSlide;
  const isFirstSlide = currentSlideIndex === 0;
  const isTimeUp = timeLeft !== null && timeLeft <= 0;

  const progress = ((currentSlideIndex + 1) / allSlides.length) * 100;
  
  return (
    <>
    {durationInMinutes && timeLeft !== null && <CountdownTimer timeLeftInSeconds={timeLeft} />}
    <div className="mx-auto my-10 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl transition-all duration-500">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
        </div>

      <form onSubmit={e => e.preventDefault()} noValidate>
        {currentSlide.elements.map((element:FormElement, index:any) => {
          if (element.displayCondition && !evaluateCondition(element.displayCondition.condition, formAnswers)) {
            return null;
          }
          const Component = componentMap[element.type];
          if (!Component) {
            console.warn("Unknown element type:", element.type);
            return <div key={index} className="text-red-500">Unknown element type: {element.type}</div>;
          }
          const isInput = !!element.name;
          return (
            <Component
              key={`${element.name || element.type}-${index}`}
              element={{...element, disabled: element.disabled || isTimeUp}}
              value={isInput ? formAnswers[element.name!] : undefined}
              onChange={isInput ? (value: any) => handleInputChange(element.name!, value) : undefined}
              error={isInput ? errors[element.name!] : undefined}
            />
          );
        })}
        
        <div className="flex justify-between mt-8">
            {!isFirstSlide && !isEndSlide ? (
                <button
                type="button"
                onClick={handlePrev}
                disabled={isTimeUp}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-all disabled:opacity-50"
                >
                {t('previous')}
                </button>
            ) : <div />}

            {!isEndSlide ? (
                <button
                type="button"
                onClick={handleNext}
                disabled={isTimeUp}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all disabled:opacity-50"
                >
                {t('next')}
                </button>
            ) : null}
        </div>
      </form>
    </div>
    </>
  );
};

export default CustomFormRenderer;
