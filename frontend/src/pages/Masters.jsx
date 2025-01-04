import React from 'react'

import MasterCard from '../components/MasterCard.jsx';
export default function Masters() {
    
  return (
    <>
    <h2 className="text-center">Masters</h2>
   <div className="row row-cols-lg-5 row-cols-md-4 row-cols-sm-3 d-flex justify-content-around">
        <MasterCard text="Employee Master" link='employee-master'/>
        <MasterCard text="Role Master" link='role-master'/>
        <MasterCard text="Sub Role Master" link='sub-role-master'/>
        <MasterCard text="Notifcation Master" link='notification-master'/>
        <MasterCard text="Product Master" link='product-master'/>
        <MasterCard text="Product Type Master" link='product-type-master'/>
        <MasterCard text="Branach Master" link='branch-master'/>
        <MasterCard text="Discount Promo Master" link='discount-promo-master'/>
        <MasterCard text="Services Master" link='services-master'/>
        <MasterCard text="Services Type Master" link='services-type-master'/>
        <MasterCard text="Notification Master" link='notification-master'/>
    </div>
    </>
  )
}
