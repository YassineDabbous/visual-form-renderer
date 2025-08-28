
import React from 'react';
import { FormElement } from '../../types';

export const Code: React.FC<{ element: FormElement }> = ({ element }) => {
  return (
    <pre className="bg-gray-800 text-white p-4 my-4 rounded-md overflow-x-auto">
      <code>{element.content}</code>
    </pre>
  );
};
