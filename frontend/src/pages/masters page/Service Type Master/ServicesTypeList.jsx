import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./../../../context/ThemeProvider";
import useQuery from "../../../utils/useQuery";
import Spinner from "../../../components/Spinner";
import Alert from './../../../components/Alert';

export default function ServicesTypeList() {
  // [loading,error,data,queryFunction,success,message] query,method,body
  const [loading, error, serviceType, runQuery, success, errorMessage] =
    useQuery("/api/v1/serviceType/getServiceType", "GET", null);

  const token = localStorage.getItem("accessToken");
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    runQuery();
  }, []);

  const handleEdit = (serviceTypeSeq) => {
    navigate(`/masters/service-type-master/edit/${serviceTypeSeq}`);
  };

  return (
    <>
      {error && (
        <p className="my-5 error-text">
          Failed to load roles. Please try again later.
        </p>
      )}
      {loading && <Spinner />}
      {serviceType?.length >0 ? (
        <div className="table-responsive">
          <table className={`table table-striped table-hover table-${ theme === "light" ? "danger" : "dark" }`}>
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Role Code</th>
                <th scope="col">Created By</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceType?.map((role) => {
                return (
                  <tr key={role.role_seq}>
                    <td>{role.role_name}</td>
                    <td>{role.role_code}</td>
                    <td>{role.created_by}</td>
                    <td onClick={() => handleEdit(role.role_seq)} className="edit-master text-center">
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ):
      // { success = false, message = "Something went wrong, please try again", onClose }
      <Alert message="No data found"/>}
    </>
  );
}
