import React, { useEffect, useState } from "react";
import useQuery from "../../utils/useQuery";

const Services = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, error, serviceType, runQuery, success, message] =
    useQuery("/api/v1/serviceType/getServiceType", "GET", null);
useEffect( ()=>{
runQuery()
},[])
  const tabs = [
    "Limited Time Offers",
    "Hair Styling & Cut",
    "Hair Color",
    "Hair Treatments",
    "Nails",
    "Threading & Waxing",
  ];

  const tabContent = [
    "Content for Limited Time Offers",
    "Content for Hair Styling & Cut",
    "Content for Hair Color",
    "Content for Hair Treatments",
    "Content for Nails",
    "Content for Threading & Waxing",
  ];

  return (
    <div className="tabs-container">
        <h1>Services</h1>
      <div className="tabs">
        {serviceType?.map((service) => (
          <button key={service.service_type_seq} className={`tab me-2 mb-2 ${activeTab === service.service_type_seq ? "active" : ""}`} onClick={() => setActiveTab(service.service_type_seq)}>
            {service.service_type_name}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {tabContent.map((content, index) => (
          <div key={index} className={`tab-pane ${activeTab === index ? "active" : ""}`}>
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
