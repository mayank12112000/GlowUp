import React from 'react'
import "./sidebar.css"
export default function Sidebar() {

    const handleToggle = ()=>{
        document.querySelector("#sidebar").classList.toggle("expand");
    }

  return (
    <div className="wrapper">
    <aside id="sidebar">
        <div className="d-flex">
            <button onClick={handleToggle} className="toggle-btn" type="button">
            <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
            <div className="sidebar-logo">
                {/* <a href="/">CodzSword</a> */}
            </div>
        </div>
        <ul className="sidebar-nav d-flex flex-column justify-content-evenly">
            <li className="sidebar-item">
                <a href="/" className="sidebar-link">
                <i className="fa fa-user" aria-hidden="true"></i>
                <span>Profile</span>
                </a>
            </li>
            <li className="sidebar-item">
                <a href="/" className="sidebar-link">
                <i className="fa fa-heart" aria-hidden="true"></i>
                <span>Wishlist</span>
                </a>
            </li>
            <li className="sidebar-item">
                <a href="/" className="sidebar-link">
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                <span>Cart</span>
                </a>
            </li>
            
            <li className="sidebar-item">
                <a href="/" className="sidebar-link">
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                <span>Orders</span>
                </a>
            </li>
            
          <li className="sidebar-item">
                <a href="/" className="sidebar-link">
                <i className="fa fa-calendar" aria-hidden="true"></i>
                    <span>Calender</span>
                </a>
            </li>
            <li className="sidebar-item">
                <a href="/" className="sidebar-link">
                <i className="fa fa-bell" aria-hidden="true"></i>
                <span>Notification</span>
                </a>
            </li>
            <li className="sidebar-item">
                <a href="/" className="sidebar-link">
                <i className="fa fa-cog" aria-hidden="true"></i>
                    <span>Setting</span>
                </a>
            </li>
            <li className="sidebar-item">
                <a href="/" className="sidebar-link">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
        
    </aside>
</div>
  )
}
