
import React from 'react';
import { FormElement } from '../../types';

export const HorizontalRule: React.FC<{ element: FormElement }> = () => {
  return (
    <hr className="my-6 border-gray-200 dark:border-gray-700" />
  );
};
