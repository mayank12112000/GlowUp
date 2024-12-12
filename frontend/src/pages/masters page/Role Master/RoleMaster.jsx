import React from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import RoleList from './RoleList';
import RoleEdit from './RoleEdit';
import RoleDetails from './RoleDetails';
import Button from './../../../components/Button';
import AddRole from './AddRole';

export default function RoleMaster() {
  const param = useParams()
  console.log("role master param",param)
  
  return (
    <div className='shadow page'>
      <div className="heading m-2 d-flex justify-content-around align-items-center">
      <h2 className="text-center">Role Master</h2>
     {(param['*'] =="") && <Link to="/masters/role-master/add-role">
       <Button text="Add Role" variant="secondary" />
      </Link>}
      </div>
    <Routes>
      <Route path="/" element={<RoleList />} />
      <Route path="/:roleCode" element={<RoleDetails />} />
      <Route path="/edit/:roleCode" element={<RoleEdit />} />
      <Route path="/add-role" element={<AddRole />} />
    </Routes>
    </div>
  )
}
