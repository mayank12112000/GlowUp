import React from 'react'
import { ThemeContext } from '../../context/ThemeProvider';
import { useContext } from 'react';
import Hero from "./Hero.jsx"
import "./homepage.css"
import Services from './Services.jsx';
export default function Homepage() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
        <Hero/>
        <Services/>

    </div>
    
  )
}
