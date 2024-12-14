import React from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import EmployeeList from './EmployeeList.jsx';
import EmployeeEdit from './EmployeeEdit.jsx';
import EmployeeDetails from './EmployeeDetails.jsx';
import Button from './../../../components/Button.jsx';
import AddEmployee from './AddEmployee.jsx';

export default function EmployeeMaster() {
    const param = useParams()
  return (
    <div className='shadow page'>
          <div className="heading m-2 d-flex justify-content-around align-items-center">
          <h2 className="text-center">Employee Master</h2>
         {(param['*'] =="") && <Link to="/masters/employee-master/add-employee">
           <Button text="Add Employee" variant="secondary" />
          </Link>}
          </div>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/:EmployeeSeq" element={<EmployeeDetails />} />
          <Route path="/edit/:EmployeeSeq" element={<EmployeeEdit />} />
          <Route path="/add-employee" element={<AddEmployee/>} />
        </Routes>
        </div>
  )
}
