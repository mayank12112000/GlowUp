import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./sidebar.css"
import { ThemeContext } from '../context/ThemeProvider.jsx';
import { AuthContext } from './../context/AuthProvider.jsx';
export default function Sidebar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const {userSeq,roleCode} = useContext(AuthContext)
    const [open,setOpen] = useState(false)
    const handleToggle = ()=>{
        document.querySelector("#sidebar").classList.toggle("expand");
        setOpen(!open)
    }

  return (
    <aside id="sidebar" className={`shadow ${theme === "dark" ? "sidebar-dark" : "sidebar-light"}`}>
        {/* <div className="d-flex hamburger">
            <button onClick={handleToggle} className="toggle-btn" type="button">
            {open==false ? <i className={`fa fa-bars fs-4 ${theme === "dark" ? "text-white":"text-black"}`} aria-hidden="true"></i>:
            <i className={`fa fa-times ${theme === "dark" ? "text-white":"text-black"}`} aria-hidden="true"></i>}
            </button>
            <div className="sidebar-logo">
            </div>
        </div> */}
        <ul className="sidebar-nav p-0 d-flex flex-column justify-content-evenly">
            <li className="sidebar-item sidebar-setting" data-bs-toggle="tooltip" data-bs-placement="right" title="Home">
                <NavLink to="/" className="sidebar-link">
                <i className="fa fa-home fs-4" aria-hidden="true"></i>
                <span>Home</span>
                </NavLink>
            </li>
            {roleCode === "ADM"?
            <li className="sidebar-item sidebar-masters sidebar-setting" data-bs-toggle="tooltip" data-bs-placement="right" title="Masters">
            <NavLink to="/masters" className="sidebar-link">
            <i className="fa fa-th-list fs-4" aria-hidden="true"></i>
            <span>Masters</span>
            </NavLink>
        </li>:
        <>
            <li className="sidebar-item sidebar-wishlist sidebar-setting" data-bs-toggle="tooltip" data-bs-placement="right" title="Wishlist">
                <NavLink to="/wishlist" className="sidebar-link">
                <i className="fa fa-heart fs-4" aria-hidden="true"></i>
                <span>Wishlist</span>
                </NavLink>
            </li>
            <li className="sidebar-item sidebar-cart sidebar-setting" data-bs-toggle="tooltip" data-bs-placement="right" title="Cart">
                <NavLink to="/cart" className="sidebar-link">
                <i className="fa fa-shopping-cart fs-4" aria-hidden="true"></i>
                <span>Cart</span>
                </NavLink>
            </li>
        </>
}
          <li className="sidebar-item sidebar-setting" data-bs-toggle="tooltip" data-bs-placement="right" title="Calender">
                <NavLink to="/calender" className="sidebar-link">
                <i className="fa fa-calendar fs-4" aria-hidden="true"></i>
                    <span>Calender</span>
                </NavLink>
            </li>
            
            <li className="sidebar-item sidebar-orders sidebar-setting" data-bs-toggle="tooltip" data-bs-placement="right" title="Orders">
                <NavLink to="/orders" className="sidebar-link">
                <i className="fa fa-shopping-bag fs-4" aria-hidden="true"></i>
                <span>Orders</span>
                </NavLink>
            </li>
            {roleCode==="ADM"?
            <li className="sidebar-item sidebar-clients sidebar-setting" data-bs-toggle="tooltip" data-bs-placement="right" title="Clients">
            <NavLink to="/clients" className="sidebar-link">
            <i className="fa fa-smile-o fs-4" aria-hidden="true"></i>
            <span>Clients</span>
            </NavLink>
        </li>:
            <li className="sidebar-item sidebar-setting" data-bs-toggle="tooltip" data-bs-placement="right" title="Notifications">
                <NavLink to="/notification" className="sidebar-link">
                <i className="fa fa-bell fs-4" aria-hidden="true"></i>
                <span>Notification</span>
                </NavLink>
            </li>}
            <li className="sidebar-item sidebar-setting" data-bs-toggle="tooltip" data-bs-placement="right" title="Settings">
            <NavLink to="/settings" className="sidebar-link">
                <i className="fa fa-cog fs-4" aria-hidden="true"></i>
                <span>Settings</span>
            </NavLink>
            </li>

            
        </ul>
        
    </aside>
  )
}
