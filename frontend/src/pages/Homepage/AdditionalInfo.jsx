import React from "react";
import "./AdditionalInfo.css"; // Add the CSS for styling

export default function AdditionalInfo() {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const currentDay = new Date().getDay()
  return (
    <div className="row additional-info my-3">
      {/* Opening Times Section */}
      <div className="col-sm-7">
        <h4 className="section-title">Opening times</h4>
        <ul className="opening-times">
          {days.map((day,idx)=>(
            <li key={idx}>
              <span className={`day ${currentDay == idx? "font-bold":""}`}>● {day}</span> <span className={`time ${currentDay == idx? "font-bold":""}`}>10:00 am – 9:30 pm</span>
          </li>
          ))}
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
