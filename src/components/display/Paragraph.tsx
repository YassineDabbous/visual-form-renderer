
import React from 'react';
import { FormElement } from '../../types';

export const Paragraph: React.FC<{ element: FormElement }> = ({ element }) => {
  return (
    <p className="text-gray-600 dark:text-gray-400 mb-6">
      {element.text}
    </p>
  );
};
