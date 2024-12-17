import React from "react";
import "./Calendar.css";

const Calendar = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="container-fluid calendar-container">
      <div className="calendar-header row gx-0">
        <div className="col-1 time-column"></div>
        {daysOfWeek.map((day, idx) => (
          <div key={idx} className="col text-center day-header">
            <strong>{day}</strong>
          </div>
        ))}
      </div>

      <div className="calendar-body row gx-0">
        <div className="col-1 time-column">
          {hours.map((hour) => (
            <div key={hour} className="time-cell">
              {hour.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>
        {daysOfWeek.map((_, idx) => (
          <div key={idx} className="col day-column">
            {hours.map((hour) => (
              <div key={hour} className="calendar-cell"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
