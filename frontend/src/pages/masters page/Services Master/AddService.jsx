import React, { Suspense, useEffect, useMemo, useState } from 'react'
import Input from '../../../components/Input.jsx'
import Button from '../../../components/Button.jsx'
import {  useNavigate } from 'react-router-dom'
import Spinner from '../../../components/Spinner.jsx'
import Radio from '../../../components/Radio.jsx'
import {apiRequest} from "../../../utils/apiRequest.js"
import { toast } from 'react-toastify';
import useQuery from '../../../utils/useQuery.jsx'
export default function AddService() {
  const token = localStorage.getItem("accessToken")
  const [formData,setFormData] = useState({serviceName:"",isActive:true,serviceType:"",mrpPrice:0,discount:0})
  console.log(formData)
  const [loading,error,data,runQuery,success,message] = useQuery("/api/v1/services","POST",formData)
  const [stLoading, stError, serviceTypes, stRunQuery, stSuccess, stMessage] =useQuery("/api/v1/serviceType/getServiceType", "GET", null);
  console.log(serviceTypes)
  const navigate = useNavigate()
  const handleOnChange =(e)=>{
    const {name,value,checked,type} = e.target
    setFormData((pre)=>{
      return {...pre,[name]:type==="checkbox"?checked: value}
    })
  }
  const handleSubmit= async(e)=>{
    e.preventDefault()
    if(!e.target.checkValidity()){
      e.target.reportValidity()    
    }
    await runQuery()
  }
  useEffect(()=>{
    stRunQuery()
  },[])
  useEffect(()=>{
    if(!loading && error){
      toast.warn(message)
    }
    if(success){
      toast.success(message,{
        onOpen:()=>navigate("/masters/services-master")
      })
    }
  },[loading,error,message])
  return (
    <form onSubmit={handleSubmit} className='my-3' >
      {error?.message && <Alert message={error?.message} />}
      <div className="row">
        <div className="col-sm-6">
        <Input name="serviceName" onChange={handleOnChange} value={formData.serviceName} type="text" label="Service Name" required={true}/>
        </div>
        <div className="col-sm-6">
        <label htmlFor="basic-url" className="form-label">Service Type<span className="required-asterisk">*</span></label>
        <select onChange={handleOnChange} name='serviceType' value={formData.serviceType} className="form-select" id="inputGroupSelect01">
          <option value={null}>Choose...</option>
          {!stLoading && serviceTypes && serviceTypes?.map((serviceType)=>{
            return <option key={serviceType.service_type_seq} value={serviceType.service_type_seq}>{serviceType.service_type_name}</option>
          })}
        </select>
        </div>
       </div>
      <div className="row">
      <div className="col-sm-6">
            <Input name="mrpPrice" onChange={handleOnChange} value={formData.mrpPrice} type="number" label="MRP Price" required={true}/>
            </div>
            <div className="col-sm-6">
            <Input name="discount" onChange={handleOnChange} value={formData.discount} type="number" label="Discount %" required={true}/>
            </div>
       </div>
      <div className="row my-3">
        <div className="col-sm-6">
          <Radio required={true} name="isActive" onChange={handleOnChange} checked={formData.isActive} value={true}  label={"Is Active"}/>
        </div>
       </div>
      <Button disabled={(loading) ? true : false} child={loading && <Spinner/>} type="submit" text="Add" variant="secondary" />
    </form>
  )
}
