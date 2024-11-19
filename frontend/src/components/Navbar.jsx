import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeProvider';
import "./navbar.css"
import { Link } from 'react-router-dom';
export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav class={`shadow navbar navbar-expand-lg bg-body-tertiary ${theme==="dark"?"navbar-dark":""}`}>
      <div class="container-fluid">
        <div className="logo">
        <img className='navbar-logo' src="media/logo.png" alt="" />
        <Link class="navbar-brand mx-2" to="/">Navbar</Link>
        </div>
        <div className="theme-toggle">
          {theme == "dark" ?
          <button onClick={toggleTheme} className='btn'><i class="fs-5 text-white fa fa-sun-o" aria-hidden="true"></i></button>:
          <button onClick={toggleTheme} className='btn'><i class="fs-5 text-black fa fa fa-moon-o" aria-hidden="true"></i></button>
          }
        </div>
      </div>
    </nav>
  )
}
