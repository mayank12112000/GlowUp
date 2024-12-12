import React from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import Button from './../../../components/Button';
import ServicesTypeList from './ServicesTypeList';
import AddServiceType from './AddServiceType';
import ServiceTypeEdit from './ServiceTypeEdit';
import ServiceTypeDetails from './ServiceTypeDetails';
export default function ServicesTypeMaster() {
  const param = useParams()

  return (
    <div className='shadow page'>
      <div className="heading m-2 d-flex justify-content-around align-items-center">
      <h2 className="text-center">Service Type Master</h2>
     {(param['*'] =="") && <Link to="/masters/services-type-master/add-service-type">
       <Button text="Add Service Type" variant="secondary" />
      </Link>}
      </div>
    <Routes>
      <Route path="/" element={<ServicesTypeList />} />
      <Route path="/:serviceTypeSeq" element={<ServiceTypeDetails />} />
      <Route path="/edit/:serviceTypeSeq" element={<ServiceTypeEdit />} />
      <Route path="/add-service-type" element={<AddServiceType />} />
    </Routes>
    </div>
  )
}
