
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      previous: 'Previous',
      next: 'Next',
      requiredField: 'This field is required.',
      invalidEmail: 'Please enter a valid email address.',
      invalidUrl: 'Please enter a valid URL.',
      invalidNumber: 'Please enter a valid number.',
      minValue: 'Value must be at least {{min}}.',
      maxValue: 'Value must be no more than {{max}}.',
      patternMismatch: 'The input does not match the required pattern.',
      reviewAnswers: 'Review Your Answers',
      reviewInstructions: 'Please check your answers below before submitting.',
      editAnswers: 'Edit Answers',
      submit: 'Confirm & Submit',
      submitting: 'Submitting...',
      results: 'Results',
      totalScore: 'Total Score',
      yourAnswer: 'Your Answer:',
      notAnswered: 'Not answered',
      correctAnswer: 'Correct Answer:',
      explanation: 'EXPLANATION',
      chooseAsMany: 'Choose as many as you like.',
      chooseFile: 'Choose File',
      fileTooLarge: 'File is too large. Max size is {{size}}MB.',
      invalidFileType: 'Only image files are allowed.',
      disagree: 'Disagree',
      agree: 'Agree'
    }
  },
  fr: {
    translation: {
      previous: 'Précédent',
      next: 'Suivant',
      requiredField: 'Ce champ est obligatoire.',
      invalidEmail: 'Veuillez saisir une adresse e-mail valide.',
      invalidUrl: 'Veuillez saisir une URL valide.',
      invalidNumber: 'Veuillez saisir un nombre valide.',
      minValue: 'La valeur doit être au moins de {{min}}.',
      maxValue: 'La valeur ne doit pas dépasser {{max}}.',
      patternMismatch: "L'entrée ne correspond pas au format requis.",
      reviewAnswers: 'Vérifiez vos réponses',
      reviewInstructions: 'Veuillez vérifier vos réponses ci-dessous avant de soumettre.',
      editAnswers: 'Modifier les réponses',
      submit: 'Confirmer et Soumettre',
      submitting: 'Soumission en cours...',
      results: 'Résultats',
      totalScore: 'Score Total',
      yourAnswer: 'Votre réponse :',
      notAnswered: 'Pas de réponse',
      correctAnswer: 'Bonne réponse :',
      explanation: 'EXPLICATION',
      chooseAsMany: 'Choisissez-en autant que vous le souhaitez.',
      chooseFile: 'Choisir un fichier',
      fileTooLarge: 'Le fichier est trop volumineux. La taille maximale est de {{size}}MB.',
      invalidFileType: 'Seuls les fichiers image sont autorisés.',
      disagree: "Pas d'accord",
      agree: "D'accord"
    }
  },
  ar: {
    translation: {
      previous: 'السابق',
      next: 'التالي',
      requiredField: 'هذا الحقل مطلوب.',
      invalidEmail: 'الرجاء إدخال عنوان بريد إلكتروني صالح.',
      invalidUrl: 'الرجاء إدخال عنوان URL صالح.',
      invalidNumber: 'الرجاء إدخال رقم صالح.',
      minValue: 'يجب أن تكون القيمة {{min}} على الأقل.',
      maxValue: 'يجب ألا تزيد القيمة عن {{max}}.',
      patternMismatch: 'لا يتطابق الإدخال مع النمط المطلوب.',
      reviewAnswers: 'مراجعة إجاباتك',
      reviewInstructions: 'يرجى التحقق من إجاباتك أدناه قبل الإرسال.',
      editAnswers: 'تعديل الإجابات',
      submit: 'تأكيد وإرسال',
      submitting: 'جارٍ الإرسال...',
      results: 'النتائج',
      totalScore: 'النتيجة الإجمالية',
      yourAnswer: 'إجابتك:',
      notAnswered: 'لم تتم الإجابة',
      correctAnswer: 'الإجابة الصحيحة:',
      explanation: 'الشرح',
      chooseAsMany: 'اختر أي عدد تريده.',
      chooseFile: 'اختر ملف',
      fileTooLarge: 'الملف كبير جدًا. الحجم الأقصى هو {{size}} ميجابايت.',
      invalidFileType: 'يُسمح بملفات الصور فقط.',
      disagree: 'غير موافق',
      agree: 'موافق'
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['cookie', 'localStorage'],
    },
  });

export default i18n;