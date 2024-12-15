import React from "react";
import "./Hero.css"; // Import the styles

export default function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-banner d-flex align-items-center">
        <img src="fairone/dp1.png" alt="Hero Banner" className="hero-banner__img" />
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to FairOne</h1>
        </div>
      </div>

      <div className="hero-grid">
        <div className="hero-grid__item">
          <img src="fairone/dp2.png" alt="Image 1" className="hero-grid__img" />
        </div>
        <div className="hero-grid__item">
          <img src="fairone/dp3.png" alt="Image 2" className="hero-grid__img" />
        </div>
        <div className="hero-grid__item">
          <img src="fairone/dp4.png" alt="Image 3" className="hero-grid__img" />
        </div>
      </div>
    </div>
  );
}
