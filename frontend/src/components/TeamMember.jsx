import React from "react";
import "./teamMember.css";

const TeamMember = ({ name, role, rating, image, initials }) => {
  return (
    <div className="team-member">
      {image ? (
        <img src={image} alt={name} className="team-member__image" />
      ) : (
        <div className="team-member__initials">{initials?.toUpperCase()}</div>
      )}
      {rating && <div className="team-member__rating">
        <span>{`${rating} ★`}</span>
      </div>}
      <h3 className="team-member__name">{name}</h3>
      <p className="team-member__role">{role}</p>
    </div>
  );
};

export default TeamMember;
