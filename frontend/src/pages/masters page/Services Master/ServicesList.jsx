import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeProvider";
import useQuery from "../../../utils/useQuery";
import Spinner from "../../../components/Spinner";
import Alert from '../../../components/Alert';

export default function ServicesList() {
  // [loading,error,data,queryFunction,success,message] query,method,body
  const [loading, error, serviceType, runQuery, success, message] =
    useQuery("/api/v1/services/getService", "GET", null);
    console.log(serviceType)

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
          Failed to load serviceTypes. Please try again later.
        </p>
      )}
      {loading && <Spinner />}
      {serviceType?.length >0 ? (
        <div className="table-responsive">
          <table className={`table table-striped table-hover table-${ theme === "light" ? "danger" : "dark" }`}>
            <thead>
              <tr>
                <th scope="col">Service </th>
                <th className="text-center" scope="col">Price</th>
                <th className="text-center" scope="col">Discount %</th>
                <th className="text-center" scope="col">Time(hours:min)</th>
                <th scope="col">Service Type</th>
                <th scope="col">Created By</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceType?.map((service) => {
                return (
                  <tr key={service.service_seq}>
                    <td className="text-truncate"> {service.service_name}</td>
                    <td className="text-center">{service.price}</td>
                    <td className="text-center">{service.discount_percent}</td>
                    <td className="text-center">{`${service.hours}:${service.minutes}`}</td>
                    <td>{service.service_type_name}</td>
                    <td>{service.created_by}</td>
                    <td onClick={() => handleEdit(service.service_seq)} className="edit-master text-center">
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
