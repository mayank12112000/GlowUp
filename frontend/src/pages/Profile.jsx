import React, { useContext } from "react";
import "./Profile.css"; // Custom CSS for additional styling
import { AuthContext } from "../context/AuthProvider";
import Button from './../components/Button';
import Spinner from './../components/Spinner';

const Profile = () => {
  const {email,mobile,roleCode,logout,name,isMobileVerified} = useContext(AuthContext)

  

  return (
    // <div className="profile-container d-flex justify-content-center align-items-center">
      // <div className="card shadow-lg profile-card">
        <div className="card-body">
          <div className="text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile Avatar"
              className="rounded-circle profile-avatar"
            />
            <h3 className="mt-3">{""}</h3>
            <p className="text-muted">{name}</p>
          </div>
          <hr />
          <div className="profile-details">
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Mobile:</strong> {mobile} {isMobileVerified ? "verfied": "not verified"}
              {/* {!isMobileVerified && <Button  type="submit" text="Verify your number" variant="secondary" />} */}
            </p>
          </div>
        </div>
      // </div>
    // </div>
  );
};

export default Profile;
