
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormDefinition, FormSlide, FormElement } from '../types';
import { isAnswerCorrect } from '../utils/isAnswerCorrect';

interface CorrectionSlideProps {
  formDefinition: FormDefinition;
  formAnswers: { [key: string]: any };
  allSlides: FormSlide[];
}

const CorrectIcon: React.FC = () => (
    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const IncorrectIcon: React.FC = () => (
    <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const CorrectionItem: React.FC<{ element: FormElement, userAnswer: any }> = ({ element, userAnswer }) => {
    const { t } = useTranslation();
    if (element.answer === undefined || element.score === undefined) {
        return null;
    }

    const isCorrect = isAnswerCorrect(userAnswer, element.answer);
    const scoreAwarded = isCorrect ? element.score : 0;

    return (
        <div className={`p-4 border-s-4 rounded-md mb-4 ${isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-red-500 bg-red-50 dark:bg-red-900/20'}`}>
            <div className="flex justify-between items-start">
                <p className="font-semibold text-gray-800 dark:text-gray-200 pe-4">{element.question}</p>
                <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {scoreAwarded} / {element.score} pts
                    </span>
                    {isCorrect ? <CorrectIcon /> : <IncorrectIcon />}
                </div>
            </div>
            
            <div className="mt-2 text-sm space-y-1">
                <p className="text-gray-600 dark:text-gray-400">{t('yourAnswer')} <code className="bg-gray-200 dark:bg-gray-700 rounded px-1 break-all">{JSON.stringify(userAnswer ?? t('notAnswered'))}</code></p>
                {!isCorrect && (
                     <p className="text-green-700 dark:text-green-400 font-medium">{t('correctAnswer')} <code className="bg-green-200/50 dark:bg-green-800/50 rounded px-1 break-all">{JSON.stringify(element.answer)}</code></p>
                )}
            </div>

            {!isCorrect && element.reason && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700/50">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 tracking-wider">{t('explanation')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{element.reason}</p>
                </div>
            )}
        </div>
    );
};

export const CorrectionSlide: React.FC<CorrectionSlideProps> = ({ formAnswers, allSlides }) => {
    const { t } = useTranslation();
    const allElements = allSlides.flatMap(s => s.elements).filter(el => el.name);
    
    const gradedElements = allElements.filter(el => el.answer !== undefined && el.score !== undefined);

    const totalScore = gradedElements.reduce((sum, el) => {
        return sum + (isAnswerCorrect(formAnswers[el.name!], el.answer) ? el.score! : 0);
    }, 0);

    const maxScore = gradedElements.reduce((sum, el) => sum + (el.score || 0), 0);

    return (
        <div className="max-w-2xl mx-auto my-10 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">
            <h1 className="text-3xl font-bold text-center mb-2">{t('results')}</h1>
            <div className="text-center p-4 mb-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                <p className="text-lg font-medium text-gray-600 dark:text-gray-300">{t('totalScore')}</p>
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{totalScore} / {maxScore}</p>
            </div>
            
            <div className="space-y-4">
                {allElements.map(element => (
                    <CorrectionItem key={element.name} element={element} userAnswer={formAnswers[element.name!]} />
                ))}
            </div>
        </div>
    );
};