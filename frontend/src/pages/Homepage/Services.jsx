import React, { useContext, useEffect, useState } from "react";
import useQuery from "../../utils/useQuery";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import "./services.css"
import Button from './../../components/Button';
import { ThemeContext } from "../../context/ThemeProvider";
import Skeleton from "../../components/Skeleton";
const Services = () => {
  const { theme } = useContext(ThemeContext);
  const [currentServiceTypeSeq,setCurrentServiceTypeSeq] = useState(1)
  const [loading, error, serviceType, runQuery, success, message] = useQuery("/api/v1/serviceType/getServiceType","GET",null);
  const [sLoading, sError, service, sRunQuery, sSuccess, sMessage] = useQuery(`/api/v1/services/getServiceFromType?serviceType=${currentServiceTypeSeq}`,"GET",null);
  useEffect(() => {
    runQuery();
  }, []);
  useEffect(()=>{
    sRunQuery()
  },[currentServiceTypeSeq])

  return (
    <div className="tabs-container">
      <h1>Services</h1>
      {loading ? <Spinner/> : !error ? <div className="tabs">
        {serviceType?.map((serviceType) => (
          <button key={serviceType.service_type_seq} className={`tab me-2 mb-2 ${serviceType.service_type_seq === currentServiceTypeSeq ? "active" : ""}`} 
          onClick={() => setCurrentServiceTypeSeq(serviceType.service_type_seq)}>
            {serviceType.service_type_name}
          </button>
        ))}
      </div>:<Alert/>}

      <div className="tab-content mx-2 row d-flex flex-column">
        <div className="row mb-4  p-0">
          {!sLoading && service?.length===0 && <p>no service available</p>}
        {sLoading ? <Skeleton number={2} className="mt-3 p-3 homepage-service-block"/> : service && service?.map((service) => (
          <div className="mt-3 p-3 homepage-service-block d-flex align-items-center justify-content-between" data-bs-toggle="modal" data-bs-target="#serviceModal" key={service.service_seq}>
            <div className="service-content py-2">
            <p className="name m-0">{service.service_name}</p>
            <p className="price m-0">{`₹ ${Math.ceil(service.price - (service.price * (service.discount_percent/100)))}`}
              {service.discount_percent >0 &&
                <span className="mx-3 text-success">Save {Math.ceil(service.price * (service.discount_percent/100))}</span> 
              }
            </p>
            <p className="time text-muted m-0">{`${service.hours} hour:${service.minutes} minute`}</p>
            </div>
          <Button text="Book"/>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
