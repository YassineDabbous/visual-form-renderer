
import React from 'react';
import { FormElement } from '../../types';

export const Blockquote: React.FC<{ element: FormElement }> = ({ element }) => {
  return (
    <blockquote className="ps-4 my-4 border-s-4 border-gray-300 dark:border-gray-600 italic text-gray-600 dark:text-gray-400">
      {element.text}
    </blockquote>
  );
};