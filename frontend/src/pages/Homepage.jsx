import React from 'react'
import { ThemeContext } from '../context/ThemeProvider';
import { useContext } from 'react';

export default function Homepage() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
<nav className={`container-fluid m-0 navbar ${theme === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>

    <div className='row'>
        <button className="btn btn-primary" onClick={toggleTheme}>
          Toggle Theme
        </button>
    </div>
    </nav>
  )
}
