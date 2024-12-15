import React from 'react'
import { ThemeContext } from '../../context/ThemeProvider';
import { useContext } from 'react';
import Hero from "./Hero.jsx"
import "./homepage.css"
import Services from './Services.jsx';
import Team from './Team.jsx';
import BookingCard from './BookingCard.jsx';
import About from './About.jsx';
export default function Homepage() {
  return (
    <div>
        <Hero/>
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
        <Services/>
        <Team/>
        <About/>
          </div>
          <div className="col-md-5">
            <BookingCard/>
          </div>
        </div>
    </div>
    
  )
}
