'use client'
if (typeof localStorage === 'undefined') {
  global.localStorage = {
    getItem: () => null,
    setItem: () => null
  }
}

// Set the accent color to the value stored in localStorage, or 'aquamarine' if it's not set
const defaultProfile = '/images/cute-profile.png'

const accentColor = localStorage.getItem('theme-accent-color') || '#2fd6b9';

export { accentColor, defaultProfile }