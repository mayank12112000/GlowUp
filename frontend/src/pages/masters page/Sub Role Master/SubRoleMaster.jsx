import React from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Button from "./../../../components/Button.jsx";
import SubRoleList from "./SubRoleList.jsx";
import SubRoleDetails from "./SubRoleDetails.jsx";
import SubRoleEdit from "./SubRoleEdit.jsx";
import AddSubRole from "./AddSubRole.jsx";

export default function SubRoleMaster() {
  const param = useParams();
  return (
    <div className="shadow page">
      <div className="heading m-2 d-flex justify-content-around align-items-center">
        <h2 className="text-center">Sub Role Master</h2>
        {param["*"] == "" && (
          <Link to="/masters/employee-master/add-employee">
            <Button text="Add Sub Role" variant="secondary" />
          </Link>
        )}
      </div>
      <Routes>
        <Route path="/" element={<SubRoleList />} />
        <Route path="/:subRoleSeq" element={<SubRoleDetails />} />
        <Route path="/edit/:subRoleSeq" element={<SubRoleEdit />} />
        <Route path="/add-sub-role" element={<AddSubRole />} />
      </Routes>
    </div>
  );
}
