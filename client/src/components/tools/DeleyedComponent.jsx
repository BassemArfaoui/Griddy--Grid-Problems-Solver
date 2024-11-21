// DelayedComponent.jsx
import React, { useState, useEffect } from 'react';
import Spinner from './Spinner';

const DelayedComponent = ({ children, delay = 2000 }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isLoading ? <Spinner/> : children;
};

export default DelayedComponent;
