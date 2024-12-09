import React, { useContext } from 'react'
import "./footer.css"
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeProvider'
export default function Footer() {
    const {theme} = useContext(ThemeContext)
  return (
    <footer className={`footer p-3 footer-${theme==="dark"?"dark":"light"}`}>
      <div className="footer-container" >
        <div className="footer-section text-center footer-button">
        {/* <h3 className="footer-logo">Glow Up</h3> */}
          <button className="app-button mx-4">
            <span className="icons">
                <img style={{height:"1.5rem"}} src="media/logo.png" alt="" />
            </span><p className='m-0 p-0'>Glow Up</p>
          </button>      
        </div>

        <div className="footer-section px-3">
          <h4>About Glow Up</h4>
          <ul>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Customer Support</Link></li>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/">Sitemap</Link></li>
          </ul>
        </div>

        <div className="footer-section px-3">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms of Service</Link></li>
            <li><Link to="/">Terms of Use</Link></li>
          </ul>
        </div>
        <div className="footer-section px-3">
          <h4>For Business</h4>
          <ul>
            <li><Link to="/">For partners</Link></li>
            <li><Link to="/">Pricing</Link></li>
            <li><Link to="/">Support</Link></li>
            <li><Link to="/">Status</Link></li>
          </ul>
        </div>


        <div className="footer-section px-3">
          <h4>Find us on social</h4>
          <ul>
            <li><Link to="/"><i className="fa fa-external-link" aria-hidden="true"></i> Facebook</Link></li>
            <li><Link to="/"><i className="fa fa-external-link" aria-hidden="true"></i> Twitter</Link></li>
            <li><Link to="/"><i className="fa fa-external-link" aria-hidden="true"></i> LinkedIn</Link></li>
            <li><Link to="/"><i className="fa fa-external-link" aria-hidden="true"></i> Instagram</Link></li>
          </ul>
        </div>
      </div>
    </footer>

  )
}
