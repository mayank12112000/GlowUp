import React from "react";
import "./AdditionalInfo.css"; // Add the CSS for styling

export default function AdditionalInfo() {
  return (
    <div className="row additional-info">
      {/* Opening Times Section */}
      <div className="col-sm-7">
        <h4 className="section-title">Opening times</h4>
        <ul className="opening-times">
          <li>
            <span className="day">● Monday</span> <span className="time">10:00 am – 9:30 pm</span>
          </li>
          <li>
            <span className="day">● Tuesday</span> <span className="time">10:00 am – 9:30 pm</span>
          </li>
          <li>
            <span className="day">● Wednesday</span> <span className="time">10:00 am – 9:30 pm</span>
          </li>
          <li>
            <span className="day">● Thursday</span> <span className="time">10:00 am – 9:30 pm</span>
          </li>
          <li>
            <span className="day font-bold">● Friday</span>{" "} <span className="time font-bold">10:00 am – 9:30 pm</span>
          </li>
          <li>
            <span className="day">● Saturday</span> <span className="time">10:00 am – 9:30 pm</span>
          </li>
          <li>
            <span className="day">● Sunday</span> <span className="time">10:00 am – 9:30 pm</span>
          </li>
        </ul>
      </div>

      {/* Additional Information Section */}
      <div className="col-sm-5">
        <h4 className="section-title">Additional information</h4>
        <ul className="additional-info-list">
          <li>✓ Instant Confirmation</li>
          <li>💳 Pay by app</li>
        </ul>
      </div>
    </div>
  );
}
