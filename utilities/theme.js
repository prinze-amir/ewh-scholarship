'use client'
import { useState, useEffect } from 'react';

if (typeof localStorage === 'undefined') {
  global.localStorage = {
    getItem: () => null,
    setItem: () => null
  }
}

// Set the accent color to the value stored in localStorage, or 'aquamarine' if it's not set
const defaultProfile = '/images/cute-profile.png'

const accentColor = localStorage.getItem('theme-accent-color') || '#2fd6b9';

export const ThemeDiv = ({style, children }) => {
  const [accent, setAccent] = useState('');

  useEffect(() => {
    setAccent(accentColor);
  }, [accent]);

  return (
    <div className={style} style={{ backgroundColor: accent }}>
      {children}
    </div>
  );
};

export { accentColor, defaultProfile }