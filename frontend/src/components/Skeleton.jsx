import React from "react";

export default function Skeleton({ className, number = 1 }) {
  return (
    <>
      {Array.from({ length: number }).map((_, idx) => {
        return (
          <div key={idx} className={`card placeholder-glow ${className}`} aria-hidden="true">
            <div className="card-body ">
              <p className="card-text">
                <span className="placeholder col-4"></span>
                <span className="placeholder col-4"></span>
                <span className="placeholder col-6"></span>
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
