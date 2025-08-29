
import React, { useState } from 'react';
import {CustomFormRenderer} from './components/CustomFormRenderer';
import { FormDefinition } from '@/types';

const sampleFormDefinition: FormDefinition = {
  "settings": {
    "id": "comprehensive-test-form",
    "postUrl": "/api/test-submission",
    "isAutoSolvable": true,
    "formStyle": "classic",
    "fontSize": "sm",
    "rounded": "pill",
    "autofocus": "all-slides",
    "submitButtonText": "Complete Application",
    "restartButton": "show"
  },
  "options": {
    "saveState": true,
    "colorScheme": "light"
  },
  "startSlide": {
    "slideOptions": {
      "buttonText": "Begin Exam"
    },
    "elements": [
      {
        "type": "h1",
        "text": "Welcome to the Ultimate Test Form"
      },
      {
        "type": "p",
        "text": "This form is designed to test every feature of the custom renderer, including the new exam mode. Please proceed to the first slide."
      },
      {
        "type": "hr"
      }
    ]
  },
  "slides": [
    {
      "slideOptions": {
        "pageProgress": "25%"
      },
      "elements": [
        {
          "type": "h2",
          "text": "Personal Information"
        },
        {
          "type": "text",
          "name": "full_name",
          "question": "The name of the test subject is 'Jane Doe'. Please enter their full name.",
          "placeholder": "e.g., Jane Doe",
          "required": true,
          "autofocus": true,
          "score": 5,
          "answer": "Jane Doe",
          "reason": "The question explicitly states the required answer."
        },
        {
          "type": "email",
          "name": "contact_email",
          "question": "What is your email address?",
          "required": true,
          "value": "prefilled@example.com",
          "labelStyle": "classic"
        }
      ]
    },
    {
      "slideOptions": {
        "pageProgress": "50%"
      },
      "elements": [
        {
          "type": "h3",
          "text": "Professional Details"
        },
        {
          "type": "choice",
          "name": "department",
          "question": "Which department are you in?",
          "choices": [
            "Sales",
            "Engineering",
            "Marketing",
            "Other"
          ],
          "required": true,
          "score": 10,
          "answer": "Engineering",
          "reason": "Engineering is the correct department for this technical assessment."
        },
        {
          "type": "text",
          "name": "department_other",
          "question": "Please specify your department",
          "required": true,
          "subfield": true,
          "displayCondition": {
            "condition": "department == 'Other'"
          }
        }
      ]
    },
    {
      "slideOptions": {
        "pageProgress": "65%",
        "jumpCondition": "department == 'Sales' || department == 'Marketing'"
      },
      "elements": [
        {
          "type": "h4",
          "text": "Sales & Marketing Specifics"
        },
        {
          "type": "number",
          "name": "quarterly_target",
          "question": "What is your quarterly sales target?",
          "unit": "$",
          "min": 50000
        }
      ]
    },
    {
      "slideOptions": {
        "pageProgress": "75%"
      },
      "elements": [
        {
          "type": "h5",
          "text": "Feedback & Preferences"
        },
        {
          "type": "choice",
          "name": "interests",
          "question": "Which of these are JavaScript frameworks?",
          "choices": [
            "React",
            "Laravel",
            "Vue",
            "Django"
          ],
          "multiple": true,
          "horizontal": true,
          "score": 10,
          "answer": ["React", "Vue"],
          "reason": "Laravel and Django are backend frameworks, typically used with PHP and Python respectively."
        },
        {
          "type": "rating",
          "name": "experience_rating",
          "question": "How would you rate this form so far?",
          "outOf": 5,
          "icon": "heart",
          "required": true
        }
      ]
    },
    {
      "slideOptions": {
        "pageProgress": "100%"
      },
      "elements": [
        {
          "type": "text",
          "name": "final_comments",
          "question": "Any final comments?",
          "multiline": true,
          "placeholder": "Add your comments here..."
        },
        {
          "type": "switch",
          "name": "terms_agreed",
          "question": "Do you agree to the terms and conditions?",
          "required": true,
          "score": 5,
          "answer": true,
          "reason": "You must agree to the terms to complete the exam."
        }
      ]
    }
  ],
  "endSlide": {
    "elements": [
      {
        "type": "h1",
        "text": "Thank You!"
      },
      {
        "type": "p",
        "text": "Your submission has been received."
      }
    ]
  }
};


const App: React.FC = () => {
  const [, setSubmittedData] = useState<any | null>(null);
  const [language, setLanguage] = useState<'en' | 'fr' | 'ar'>('en');

  const handleFormSubmit = (answers: { [key: string]: any }) => {
    console.log('Form Submitted:', answers);
    // Simulate API call
    return new Promise(resolve => setTimeout(() => {
        setSubmittedData(answers);
        resolve(null);
    }, 1000));
  };
  
  const getButtonClass = (lang: 'en' | 'fr' | 'ar') => {
    const base = "px-4 py-2 font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors";
    const active = "bg-blue-600 text-white ring-blue-500";
    const inactive = "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 ring-gray-400";
    return `${base} ${language === lang ? active : inactive}`;
  }

  return (
    <div className="min-h-screen text-gray-900 dark:text-white flex flex-col items-center p-4">
       <div className="mb-6 flex space-x-2 p-1 bg-gray-200 dark:bg-gray-900 rounded-lg">
        <button onClick={() => setLanguage('en')} className={getButtonClass('en')}>English</button>
        <button onClick={() => setLanguage('fr')} className={getButtonClass('fr')}>Français</button>
        <button onClick={() => setLanguage('ar')} className={getButtonClass('ar')}>العربية</button>
      </div>
      <CustomFormRenderer 
        formDefinition={sampleFormDefinition} 
        onSubmit={handleFormSubmit}
        durationInMinutes={1}
        language={language}
        // showCorrection={true}
      />
    </div>
  );
};

export default App;
