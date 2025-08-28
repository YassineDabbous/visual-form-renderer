
import React from 'react';
import { FormElement } from '../../types';

export const Image: React.FC<{ element: FormElement }> = ({ element }) => {
  return (
    <div className="w-full flex justify-center my-4">
      <img
        src={element.src || 'https://picsum.photos/400/200'}
        alt={element.alt || 'Form image'}
        className="rounded-lg shadow-md max-w-full h-auto"
      />
    </div>
  );
};
