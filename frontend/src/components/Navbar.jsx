import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeProvider';
import "./navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { toast } from 'react-toastify';
export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [showProfileOptions, setShowProfileOptions] = useState(false);
    const {userSeq,roleCode,logout} = useContext(AuthContext)
    const navigate = useNavigate()
    // Toggle profile options visibility
    const toggleProfileOptions = () => {
      setShowProfileOptions(!showProfileOptions);
    };

    const handleLogout=async()=>{
      const resp = await logout()
      if(resp){
        toast.success("Logged out successfully",{
          onOpen:()=>navigate("/"),
        })
      }
    }
  return (
    <nav className={`shadow navbar navbar-expand-lg bg-body-tertiary ${theme==="dark"?"navbar-dark":"navbar-light"}`}>
      <div className="container-fluid">
        <div className="logo">
        <img className='navbar-logo' src="media/logo.png" alt="" />
        <Link className="navbar-brand mx-2" to="/">Glow Up</Link>
        </div>
        <div className="options d-flex align-items-center">
        
        <div className="theme-toggle">
          {theme == "dark" ?
          <button onClick={toggleTheme} className='btn'><i className="fs-5 text-white fa fa-sun-o" aria-hidden="true"></i></button>:
          <button onClick={toggleTheme} className='btn'><i className="fs-5 text-black fa fa fa-moon-o" aria-hidden="true"></i></button>
        }
        </div>
        <div className="dropdown mx-3" data-bs-theme={`${theme==="dark"?"dark":"light"}`}>
            <i className="fa fa-user fs-4" onClick={toggleProfileOptions} aria-hidden="true"></i>
            <ul  className={`dropdown-menu ${showProfileOptions ? "show" : ""}`} aria-labelledby="profileDropdown">

              <li  onClick={toggleProfileOptions}><Link className="dropdown-item" to="/my-profile">My Profile</Link></li>
              <li  onClick={toggleProfileOptions}><Link className="dropdown-item" to="/orders">Orders</Link></li>
              <li  onClick={toggleProfileOptions}><Link className="dropdown-item" to="/cart">Cart</Link></li>
              {userSeq ? 
              <li  onClick={handleLogout} className="dropdown-item">Logout</li>:
              <>
              <li  onClick={toggleProfileOptions}><Link className="dropdown-item" to="/login">Login</Link></li>
              <li  onClick={toggleProfileOptions}><Link className="dropdown-item" to="/signup">Signup</Link></li>
              </>
              } 
           </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
