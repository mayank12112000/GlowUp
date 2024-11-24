import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../../utils/apiRequest";
import "./RoleList.css";
import { ThemeContext } from './../../../context/ThemeProvider';

export default function RoleList() {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("accessToken");
  const {theme} = useContext(ThemeContext)
  const navigate = useNavigate();

  // Function to fetch roles
  const getRoles = async () => {
    try {
      const response = await apiRequest("/api/v1/role/getRoles", "GET", null, token);
      setRoles(response?.data || []);
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  // Fetch roles initially when component mounts
  useEffect(() => {
    getRoles();
  }, []);

  const handleEdit = (roleSeq) => {
    navigate(`/masters/role-master/${roleSeq}/edit`);
  };

  return (
    <>
      {error && <p className="error-text">Failed to load roles. Please try again later.</p>}
      <div className="table-responsive">

      <table className={`table table-striped table-hover table-${theme==="light"?"danger":"dark"}`}>
      <thead>
    <tr >
      <th scope="col">Role</th>
      <th scope="col">Role Code</th>
      <th scope="col">Created By</th>
      <th scope="col" className="text-center">Actions</th>

    </tr>
  </thead>
  <tbody >
    {roles.map((role)=>{
      return <tr key={role.role_seq}>
        <td>{role.role_name}</td>
        <td>{role.role_code}</td>
        <td>{role.created_by}</td>
        <td onClick={()=>handleEdit(role.role_seq)} className="edit-master text-center"><i className="fa fa-pencil" aria-hidden="true"></i></td>
      </tr>
    })}
  </tbody>
  </table>
        </div>
    </>
  );
}
