import React, { useContext } from 'react'
import Button from '../../components/Button'
import "./smallBookingCard.css"
import { ThemeContext } from '../../context/ThemeProvider'
export default function SmallBookingCard() {
    const {theme} = useContext(ThemeContext)
  return (
    <div  className={`p-3 small-booking-card d-flex justify-content-between shadow align-items-center small-booking-card-${theme==="dark"?"dark":"light"}`}>
        <span className='text-muted'>59 services available</span>
      <Button text="Book Now"/>
    </div>
  )
}
