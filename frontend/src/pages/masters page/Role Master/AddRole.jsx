import React, { useState } from 'react'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import Radio from '../../../components/Radio'
import {apiRequest} from "../../../utils/apiRequest.js"
import { toast } from 'react-toastify';
export default function AddRole() {
  const [error,setError] = useState(null)
  const [formData,setFormData] = useState({roleCode:"",roleName:"",isEmployee:false,isAdmin:false})
  const token = localStorage.getItem("accessToken")
  const [loading,setLoading] = useState(null)
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
    const resp = await apiRequest("/api/v1/role","POST",formData,token)
    if(!resp || !resp?.success){
      toast.warn(resp.message)
    }
    if(resp.success){
      toast.success(resp.message,{
        onClose:()=>navigate("/masters/role-master")
      })
    }
  }
  return (
    <form onSubmit={handleSubmit} className='my-3' >
      {error?.message && <Alert message={error?.message} />}
      <div className="row">
        <div className="col-sm-6">
        <Input name="roleCode" onChange={handleOnChange} value={formData.roleCode} type="text" label="Role Code" required={true}/>
        </div>
        <div className="col-sm-6">
        <Input name="roleName" onChange={handleOnChange} value={formData.roleName} type="text" label="Role Name" required={true}/>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6">
          <Radio required={true} name="isEmployee" onChange={handleOnChange} checked={formData.isEmployee} value={true}  label={"Is Employee"}/>
        </div>
        <div className="col-sm-6">
        <Radio required={true} name="isAdmin" onChange={handleOnChange} checked={formData.isAdmin} value={true}  label={"Is Admin"}/>
        </div>
      </div>
      <Button disabled={(loading) ? true : false} child={loading && <Spinner/>} type="submit" text="Add" variant="secondary" />
    </form>
  )
}
