import React from "react";

export default function Alert({success=false,message="Something went wrong, please try again"}) {
  return (
    <div style={{height:"4rem"}} className={`alert alert-${success?"success":"warning"} alert-dismissible fade show`} role="alert">
         {message}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
}