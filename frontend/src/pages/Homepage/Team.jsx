import React, { useEffect } from 'react'
import TeamMember from '../../components/TeamMember';
import useQuery from '../../utils/useQuery';
import Spinner from '../../components/Spinner';

export default function Team() {
  const  [loading,error,team,runQuery,success,message] = useQuery("/api/v1/employee?active=true","GET",null)
  useEffect(()=>{
    runQuery()
  },[])

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
