import React, { useState } from "react";

export default function Alert({ success = false, message = "Something went wrong, please try again", onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  // Function to handle the close action of the alert
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose(); // If provided, trigger the onClose callback
    }
  };

  // If the alert is not visible, return null to stop rendering it
  if (!isVisible) return null;

  return (
    <div
      style={{ height: "4rem" }}
      className={`alert alert-${success ? "success" : "warning"} alert-dismissible fade show`}
      role="alert"
    >
      {message}
      <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
    </div>
  );
}
