import React, { useEffect } from 'react'
import TeamMember from '../../components/TeamMember';
import useQuery from '../../utils/useQuery';
import Spinner from '../../components/Spinner';

export default function Team() {
  const  [loading,error,team,runQuery,success,message] = useQuery("/api/v1/employee?active=true","GET",null)
  useEffect(()=>{
    runQuery()
  },[])
const teamData = [
  { name: "Aidana", role: "Nail Technician", rating: 4.6, initials: "A" },
  { name: "Firas", role: "Hairdresser", rating: 5.0, image: "/images/firas.jpg" },
  { name: "Fadi", role: "Hairdresser", rating: 5.0, image: "/images/fadi.jpg" },
  { name: "Aff", role: "Hairdresser", rating: 4.8, image: "/images/aff.jpg" },
  { name: "Romeo", role: "Hairdresser", rating: 5.0, image: "/images/romeo.jpg" },
  { name: "Malak", role: "Hairdresser", rating: 4.9, image: "/images/malak.jpg" },
  { name: "Nour", role: "Nail Technician", rating: 4.8, initials: "N" },
];

  return (
    <div className="tabs-container">
      <h1>Team</h1>
      <div className="team__list">
        {loading && <Spinner/>}
        {!loading && !error && team?.map((member, index) => (
          <TeamMember initials={member.name[0]} key={index} {...member} />
        ))}
      </div>
    </div>
  );
};
