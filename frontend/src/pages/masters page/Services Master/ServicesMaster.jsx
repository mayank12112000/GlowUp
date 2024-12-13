import React from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import Button from '../../../components/Button';
import ServicesList from './ServicesList';
import ServiceDetails from './ServiceDetails';
import ServiceEdit from './ServiceEdit';
import AddService from './AddService';
export default function ServicesMaster() {
  const param = useParams()
  return (
    <div className='shadow page'>
    <div className="heading m-2 d-flex justify-content-around align-items-center">
    <h2 className="text-center">Service Master</h2>
   {(param['*'] =="") && <Link to="/masters/services-master/add-service">
     <Button text="Add Service" variant="secondary" />
    </Link>}
    </div>
  <Routes>
    <Route path="/" element={<ServicesList />} />
    <Route path="/:serviceSeq" element={<ServiceDetails />} />
    <Route path="/edit/:serviceSeq" element={<ServiceEdit />} />
    <Route path="/add-service" element={<AddService />} />
  </Routes>
  </div>
  )
}
