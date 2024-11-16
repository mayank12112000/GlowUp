import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./sidebar.css"
export default function Sidebar() {
    const [open,setOpen] = useState(false)
    const handleToggle = ()=>{
        document.querySelector("#sidebar").classList.toggle("expand");
        setOpen(!open)
    }

  return (
    <aside id="sidebar">
        <div className="d-flex hamburger">
            <button onClick={handleToggle} className="toggle-btn" type="button">
            {open==false ? <i className="fa fa-bars" aria-hidden="true"></i>:
            <i className="fa fa-times" aria-hidden="true"></i>}
            </button>
            <div className="sidebar-logo">
            </div>
        </div>
        <ul className="sidebar-nav p-0 d-flex flex-column justify-content-evenly">
            <li className="sidebar-item">
                <NavLink to="/" className="sidebar-link">
                <i className="fa fa-user" aria-hidden="true"></i>
                <span>Profile</span>
                </NavLink>
            </li>
            <li className="sidebar-item sidebar-wishlist">
                <NavLink to="/wishlist" className="sidebar-link">
                <i className="fa fa-heart" aria-hidden="true"></i>
                <span>Wishlist</span>
                </NavLink>
            </li>
            <li className="sidebar-item sidebar-cart">
                <NavLink to="/cart" className="sidebar-link">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <span>Cart</span>
                </NavLink>
            </li>
            
            <li className="sidebar-item ">
                <NavLink to="/orders" className="sidebar-link">
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                <span>Orders</span>
                </NavLink>
            </li>
            
          <li className="sidebar-item">
                <NavLink to="/calender" className="sidebar-link">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                    <span>Calender</span>
                </NavLink>
            </li>
            <li className="sidebar-item">
                <NavLink to="/notification" className="sidebar-link">
                <i className="fa fa-bell" aria-hidden="true"></i>
                <span>Notification</span>
                </NavLink>
            </li>
            <li className="sidebar-item sidebar-setting">
                <NavLink to="/settings" className="sidebar-link">
                <i className="fa fa-cog" aria-hidden="true"></i>
                    <span>Settings</span>
                </NavLink>
            </li>
            <li className="sidebar-item">
                <NavLink to="/" className="sidebar-link">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span>Logout</span>
                </NavLink>
            </li>
        </ul>
        
    </aside>
  )
}
