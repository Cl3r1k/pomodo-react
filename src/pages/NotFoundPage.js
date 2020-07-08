import React from 'react';
import { useLocation } from 'react-router-dom';

export const NotFoundPage = () => {
  const { pathname } = useLocation();
  return <div>Not Found Page at: {pathname}</div>;
};
