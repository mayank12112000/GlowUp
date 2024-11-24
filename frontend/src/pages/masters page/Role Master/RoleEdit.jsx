import React, { useEffect, useState } from 'react'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import Radio from '../../../components/Radio'
import {apiRequest} from "../../../utils/apiRequest.js"
import { toast } from 'react-toastify';
export default function RoleEdit() {
  const [error,setError] = useState(null)
  const [formData,setFormData] = useState({roleSeq:"",roleCode:"",roleName:"",isEmployee:false,isAdmin:false})
  const token = localStorage.getItem("accessToken")
  const [loading,setLoading] = useState(null)
  const [role,setRole] = useState(null)
  const param = useParams()
  const navigate = useNavigate()
  const handleOnChange =(e)=>{
    const {name,value,checked,type} = e.target
    setFormData((pre)=>{
      return {...pre,[name]:type==="checkbox"?checked: value}
    })
  }
  const getRoles = async () => {
    try {
      const response = await apiRequest(`/api/v1/role/?roleSeq=${param.roleCode}`, "GET", null, token);
      const {role_code,role_seq,role_name,is_admin,is_employee} = await response.data
      setFormData({roleCode:role_code,roleSeq:role_seq,roleName:role_name,isAdmin:is_admin,isEmployee:is_employee});
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  // Fetch roles initially when component mounts
  useEffect(() => {
    getRoles();
  }, []);
  const handleSubmit= async(e)=>{
    e.preventDefault()
    if(!e.target.checkValidity()){
      e.target.reportValidity()    
    }
    const resp = await apiRequest("/api/v1/role","PATCH",formData,token)
    if(!resp || !resp?.success){
      toast.warn(resp.message)
    }
    if(resp.success){
      toast.success("Role edited successfully",{
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
      <Button disabled={(loading) ? true : false} child={loading && <Spinner/>} type="submit" text="Edit" variant="secondary" />
    </form>
  )
}
