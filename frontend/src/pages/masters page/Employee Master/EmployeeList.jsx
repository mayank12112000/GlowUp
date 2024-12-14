import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../../utils/apiRequest";
import { ThemeContext } from './../../../context/ThemeProvider';
import Alert from "../../../components/Alert";
import useQuery from "../../../utils/useQuery";
import Spinner from "../../../components/Spinner";


export default function EmployeeList() { 
  const [loading, error, employees, runQuery, success, message] = useQuery("/api/v1/employee", "GET", null);
    console.log(employees)

  const token = localStorage.getItem("accessToken");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    runQuery();
  }, []);

  const handleEdit = (serviceSeq) => {
    navigate(`/masters/services-master/edit/${serviceSeq}`);
  };

  return (
    <>
      {error && (
        <p className="my-5 error-text">
          Failed to load employeess. Please try again later.
        </p>
      )}
      {loading && <Spinner />}
      {employees?.length >0 ? (
        <div className="table-responsive">
          <table className={`table table-striped table-hover table-${ theme === "light" ? "danger" : "dark" }`}>
            <thead>
              <tr>
                <th scope="col">Employee</th>
                <th scope="col">User name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Is active</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((employee) => {
                return (
                  <tr key={employee.service_seq}>
                    <td > {employee.employeeSeq}</td>
                    <td>{employee.username}</td>
                    <td >{employee.email}</td>
                    <td >{employee.mobile}</td>
                    <td>{employee.isActive?"Active":"Inactvie"}</td>
                    <td onClick={() => handleEdit(employee.employee_seq)} className="edit-master text-center">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ):
      <Alert message="No data found"/>}
    </>
  );
}
