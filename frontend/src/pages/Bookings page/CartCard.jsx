import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'

export default function CartCard() {
  return (
    
        <div className="booking-card shadow">
          <div className="header">
            <h2 className="title">Glow Up</h2>
            <div className="rating">
              <span className="stars">★★★★☆</span>
              <span className="reviewCount">(299)</span>
            </div>
          </div>
    <span className='m-0 p-0 text-muted'>no service selected</span>
    <hr />
          {/* Open Status and Address */}
          <div className="info">
            <div className="openStatus">
              <span className="openDot"><i className="fa fa-clock-o" aria-hidden="true"></i></span> Open until 9:30 pm
            </div>
            <div className="address">
              <span className="openDot"><i className="fa fa-map-marker" aria-hidden="true"></i></span>
            Hanuman Ganj, Beohari <br />
              <a target="_blank" href="https://www.google.com/maps/place/Fair+1+Makeovers/@24.0242736,81.3753453,17z/data=!3m1!4b1!4m6!3m5!1s0x39842f1949fd00a9:0xac7d977bf701be22!8m2!3d24.0242687!4d81.3779256!16s%2Fg%2F11b7vzwmfk?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" className="directions">
                Get directions
              </a>
            </div>
          </div>
    <hr/>
          {/* Membership Section */}
          <div className="membership">
            <p className="membershipText">
              <strong>Memberships</strong> <br />
              <span className="text-muted">Buy a bundle of appointments.</span>
            </p>
            <Button text="Buy"/>
          </div>
        </div>
  )
}
