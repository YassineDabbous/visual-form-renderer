
import React from 'react';
import { FormElement } from '../../types';

export const Heading: React.FC<{ element: FormElement }> = ({ element }) => {
  const { type, text } = element;

  const commonClasses = "font-bold text-gray-900 dark:text-white mb-4";
  
  switch (type) {
    case 'h1':
      return <h1 className={`text-3xl text-center ${commonClasses}`}>{text}</h1>;
    case 'h2':
      return <h2 className={`text-2xl ${commonClasses}`}>{text}</h2>;
    case 'h3':
      return <h3 className={`text-xl ${commonClasses}`}>{text}</h3>;
    case 'h4':
      return <h4 className={`text-lg ${commonClasses}`}>{text}</h4>;
    case 'h5':
      return <h5 className={`text-base font-semibold ${commonClasses}`}>{text}</h5>;
    case 'h6':
      return <h6 className={`text-sm font-semibold uppercase tracking-wider ${commonClasses}`}>{text}</h6>;
    default:
      // Fallback for any other case
      return <p className={commonClasses}>{text}</p>;
  }
};
