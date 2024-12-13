import React, { Suspense, useEffect, useState } from 'react'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import {  useNavigate } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import Radio from '../../../components/Radio'
import {apiRequest} from "../../../utils/apiRequest.js"
import { toast } from 'react-toastify';
import useQuery from '../../../utils/useQuery.jsx'
export default function AddServiceType() {
  const token = localStorage.getItem("accessToken")
  const [formData,setFormData] = useState({serviceTypeName:"",isActive:false})
  const [loading,error,data,runQuery,success,message] = useQuery("/api/v1/serviceType","POST",formData)
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
    if(!loading && error){
      toast.warn(message)
    }
    if(success){
      toast.success(message,{
        onClose:()=>navigate("/masters/services-type-master")
      })
    }
  },[loading,error,message])
  return (
    <form onSubmit={handleSubmit} className='my-3' >
      {error?.message && <Alert message={error?.message} />}
      <div className="row">
        <div className="col-sm-6">
        <Input name="serviceTypeName" onChange={handleOnChange} value={formData.serviceTypeName} type="text" label="Service Type Name" required={true}/>
        </div>
        <div className="col-sm-6">
          <Radio required={true} name="isActive" onChange={handleOnChange} checked={formData.isActive} value={true}  label={"Is Active"}/>
        </div>
       </div>
      <Button disabled={(loading) ? true : false} child={loading && <Spinner/>} type="submit" text="Add" variant="secondary" />
    </form>
  )
}
