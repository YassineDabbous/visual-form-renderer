
import React from 'react';
import { FormElement } from '../../types';

export const OrderedList: React.FC<{ element: FormElement }> = ({ element }) => {
  if (!element.items || !Array.isArray(element.items)) {
    return null;
  }
  return (
    <ol className="list-decimal list-inside my-4 space-y-1 text-gray-700 dark:text-gray-300">
      {element.items.map((item, index) => <li key={index}>{item}</li>)}
    </ol>
  );
};
