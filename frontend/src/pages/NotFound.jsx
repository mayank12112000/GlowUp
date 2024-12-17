import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFound.css";
import Button from "../components/Button";

const NotFound = () => {
  const navigate = useNavigate();


  return (
    <div className="not-found-container">
      <div className="content">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you are looking for might have been removed or is temporarily
          unavailable.
        </p>
        <div className="d-flex justify-content-center">
        <Button onClick={()=>navigate("/")} text={"Go Back Home"}/>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
