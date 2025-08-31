import React, { useState, useEffect } from 'react';
import CustomFormRenderer from './components/CustomFormRenderer';
import { FormDefinition } from './types';

const sampleFormDefinition: FormDefinition = {
  "settings": {
    "id": "comprehensive-test-form",
    "postUrl": "/api/test-submission",
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
      "buttonText": "Begin Onboarding"
    },
    "elements": [
      {
        "type": "h1",
        "text": "Welcome to the Ultimate Test Form"
      },
      {
        "type": "p",
        "text": "This form is designed to test every feature of the custom renderer. Please proceed to the first slide."
      },
      {
        "type": "hr"
      },
      {
        "type": "h6",
        "text": "Confidentiality Notice"
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
          "question": "What is your full name?",
          "description": "Please enter your first and last name.",
          "placeholder": "e.g., Jane Doe",
          "required": true,
          "autofocus": true
        },
        {
          "type": "email",
          "name": "contact_email",
          "question": "What is your email address?",
          "required": true,
          "value": "prefilled@example.com",
          "labelStyle": "classic"
        },
        {
          "type": "password",
          "name": "user_password",
          "question": "Create a password",
          "required": true,
          "description": "Must be at least 8 characters."
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
          "required": true
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
        },
        {
          "type": "url",
          "name": "portfolio_url",
          "question": "Portfolio URL",
          "placeholder": "https://"
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
        },
        {
          "type": "tel",
          "name": "work_phone",
          "question": "Work Phone Number",
          "country": "GB",
          "availableCountries": ["GB", "US", "DE"]
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
          "type": "select",
          "name": "contact_method",
          "question": "Preferred contact method?",
          "options": [
            "Email",
            "Phone"
          ],
          "selected": "Email"
        },
        {
          "type": "choice",
          "name": "interests",
          "question": "What are your interests?",
          "choices": [
            "React",
            "Vue",
            "Svelte"
          ],
          "multiple": true,
          "horizontal": true,
          "checked": ["React", "Vue"]
        },
        {
          "type": "rating",
          "name": "experience_rating",
          "question": "How would you rate this form so far?",
          "outOf": 5,
          "icon": "heart",
          "required": true
        },
        {
          "type": "opinionScale",
          "name": "recommend_score",
          "question": "How likely are you to recommend us?",
          "startAt": 1,
          "outOf": 10,
          "labelStart": "Not Likely",
          "labelEnd": "Very Likely"
        }
      ]
    },
    {
      "slideOptions": {
        "pageProgress": "90%"
      },
      "elements": [
        {
          "type": "blockquote",
          "text": "The final section requires careful attention to detail."
        },
        {
          "type": "pictureChoice",
          "name": "project_icon",
          "question": "Choose a project icon",
          "multiple": true,
          "supersize": true,
          "choices": [
            { "label": "Rocket", "value": "rocket_val", "image": "https://img.icons8.com/clouds/200/rocket.png" },
            { "label": "Briefcase", "value": "work_val", "image": "https://img.icons8.com/clouds/200/briefcase.png" },
            { "label": "Analytics", "value": "data_val", "image": "https://img.icons8.com/clouds/200/combo-chart.png" }
          ]
        },
        {
          "type": "date",
          "name": "start_date",
          "question": "Proposed Start Date",
          "disabled": true,
          "value": "2025-10-20"
        },
        {
          "type": "time",
          "name": "meeting_time",
          "question": "Preferred Meeting Time"
        },
        {
          "type": "datetime",
          "name": "deadline",
          "question": "Project Deadline"
        }
      ]
    },
    {
      "slideOptions": {
        "pageProgress": "100%"
      },
      "elements": [
        {
          "type": "ul",
          "items": ["Final review", "Submit documents", "Agree to terms"]
        },
        {
          "type": "file",
          "name": "project_brief",
          "question": "Upload Project Brief",
          "sizeLimit": 5,
          "imageOnly": true
        },
        {
          "type": "textarea",
          "name": "final_comments",
          "question": "Any final comments?",
          "multiline": true,
          "placeholder": "Add your comments here..."
        },
        {
          "type": "code",
          "content": "{\n  \"status\": \"complete\",\n  \"message\": \"Ready to submit.\"\n}",
          "options": {
            "language": "json"
          }
        }
      ]
    }
  ],
  "endSlide": {
    "slideOptions": {
      "redirectUrl": "https://forms.md/thank-you"
    },
    "elements": [
      {
        "type": "h1",
        "text": "Thank You!"
      },
      {
        "type": "p",
        "text": "Your application has been submitted. You will be redirected shortly."
      }
    ]
  }
};

const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);
const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
);
const SystemIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);


const App: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [language, setLanguage] = useState<'en' | 'fr' | 'ar'>('en');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = () => {
      const isDark =
        theme === 'dark' ||
        (theme === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      root.classList.toggle('dark', isDark);
    };

    applyTheme();

    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

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

  const getThemeButtonClass = (t: 'light' | 'dark' | 'system') => {
    const base = "px-3 py-2 font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors text-sm flex items-center justify-center w-28";
    const active = "bg-blue-600 text-white ring-blue-500";
    const inactive = "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 ring-gray-400";
    return `${base} ${theme === t ? active : inactive}`;
  };

  return (
    <div className="min-h-screen text-gray-900 dark:text-white flex flex-col items-center p-4">
      <div className="flex items-center flex-wrap justify-center gap-4 mb-6">
        <div className="flex space-x-2 p-1 bg-gray-200 dark:bg-gray-900 rounded-lg">
          <button onClick={() => setLanguage('en')} className={getButtonClass('en')}>English</button>
          <button onClick={() => setLanguage('fr')} className={getButtonClass('fr')}>Français</button>
          <button onClick={() => setLanguage('ar')} className={getButtonClass('ar')}>العربية</button>
        </div>
        <div className="flex space-x-2 p-1 bg-gray-200 dark:bg-gray-900 rounded-lg">
          <button onClick={() => setTheme('light')} className={getThemeButtonClass('light')} aria-pressed={theme === 'light'}>
            <SunIcon />
            Light
          </button>
          <button onClick={() => setTheme('dark')} className={getThemeButtonClass('dark')} aria-pressed={theme === 'dark'}>
            <MoonIcon />
            Dark
          </button>
          <button onClick={() => setTheme('system')} className={getThemeButtonClass('system')} aria-pressed={theme === 'system'}>
            <SystemIcon />
            System
          </button>
        </div>
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