// src/components/Button.jsx
// Primary and secondary button variants matching Phase 0's component atoms exactly.
// All styles are utility classes from tailwind.config.js — no arbitrary/inline styles.

import React from 'react';

/**
 * Button component implementing Phase 0 styling.
 * 
 * @param {object} props
 * @param {'primary' | 'secondary'} [props.variant='primary'] - Button style variant
 * @param {string} [props.className] - Additional Tailwind classes to merge
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.type='button'] - Button type attribute
 */
export default function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}) {
  const baseStyle = 'px-7 py-3 rounded-full text-sm font-body font-medium transition-colors duration-200 inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-ink text-parchment hover:bg-ink/85',
    secondary: 'border border-ink/30 text-ink hover:bg-ink/5',
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
