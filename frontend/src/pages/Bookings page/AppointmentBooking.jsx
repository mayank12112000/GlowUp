import React from 'react'
import Services from '../Homepage/Services.jsx'
import CartCard from './CartCard.jsx'
import SmallBookingCard from '../Homepage/SmallBookingCard.jsx'

export default function AppointmentBooking() {
  return (
    <div className="row d-flex justify-content-center">
          <div className="col-md-7">
        <Services/>
          </div>
          <div className="col-md-5">
            <CartCard/>
            <SmallBookingCard/>
          </div>
        </div>
  )
}
