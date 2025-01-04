import React, { useEffect } from 'react'
import TeamMember from '../../components/TeamMember.jsx';
import useQuery from '../../utils/useQuery.jsx';
import Spinner from '../../components/Spinner.jsx';

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
          <TeamMember role={member.sub_role_name} initials={member.name[0]} key={index} {...member} />
        ))}
      </div>
    </div>
  );
};
