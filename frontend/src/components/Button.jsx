import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeProvider';
import './button.css';

export default function Button({type="button", text, child, ...props}) {
  const { theme } = useContext(ThemeContext);

  // Combine dynamic and custom classes
  const themeClass = theme === "dark" ? "btn-dark" : "btn-light";

  return (
    <button type={type} {...props} className={`custom-btn ${themeClass} ${props?.className || ""} d-flex`}>
      {text} {child}
    </button>
  );
}
