import React, { useEffect } from 'react'
import Hero from "./Hero.jsx"
import "./homepage.css"
import Services from './Services.jsx';
import Team from './Team.jsx';
import BookingCard from './BookingCard.jsx';
import About from './About.jsx';
import SmallBookingCard from './SmallBookingCard.jsx';
import AdditionalInfo from './AdditionalInfo.jsx';
import Reviews from './Reviews.jsx';
export default function Homepage() {
  
  return (
    <div>
        <Hero/>
        <div className="row d-flex justify-content-center">
          <div className="col-md-7">
        <Services/>
        <Team/>
        <Reviews/>
        <About/>
        <AdditionalInfo/>
          </div>
          <div className="col-md-5">
            <BookingCard/>
            <SmallBookingCard/>
          </div>
        </div>
    </div>
    
  )
}
