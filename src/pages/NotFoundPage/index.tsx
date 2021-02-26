import React from 'react';
import { useLocation } from 'react-router-dom';

// Components
import { RenderCounter } from '@components/RenderCounter';

export const NotFoundPage: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <RenderCounter />

      <h3>Not Found Page at: {pathname}</h3>
    </div>
  );
};
