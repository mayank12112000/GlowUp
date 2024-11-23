import React from 'react'
import { ThemeContext } from '../context/ThemeProvider';
import { useContext } from 'react';

export default function Homepage() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div  >

        hoempage 
    </div>
    
  )
}
