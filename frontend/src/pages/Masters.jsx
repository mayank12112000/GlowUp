import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { apiRequest } from '../utils/apiRequest'
import { toast } from 'react-toastify';
import MasterCard from '../components/masterCard';
import Spinner from '../components/Spinner';
import RoleMaster from './masters page/Role Master/RoleMaster';

export default function Masters() {
    
  return (
   <div className="row row-cols-lg-5 row-cols-md-4 row-cols-sm-3 d-flex justify-content-around">
        <MasterCard text="Role Master" link='role-master'/>
        <MasterCard text="Notifcation Master" link='notification-master'/>
        <MasterCard text="Product Master" link='product-master'/>
        <MasterCard text="Product Type Master" link='product-type-master'/>
        <MasterCard text="Branach Master" link='branch-master'/>
        <MasterCard text="Discount Promo Master" link='discount-promo-master'/>
        <MasterCard text="Services Master" link='sercices-master'/>
        <MasterCard text="Notification Master" link='notification-master'/>
    </div>
  )
}
