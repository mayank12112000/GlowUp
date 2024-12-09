import React, { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

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
        {tabs.map((tab, index) => (
          <button key={index} className={`tab me-2 mb-2 ${activeTab === index ? "active" : ""}`} onClick={() => setActiveTab(index)}>
            {tab}
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

export default Tabs;
