import React, { useEffect, useState } from 'react'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import Radio from '../../../components/Radio'
import {apiRequest} from "../../../utils/apiRequest.js"
import { toast } from 'react-toastify';
export default function RoleEdit() {
  const [error,setError] = useState(null)
  const [formData,setFormData] = useState({roleCode:"",roleName:"",isEmployee:false,isAdmin:false})
  const token = localStorage.getItem("accessToken")
  const [loading,setLoading] = useState(null)
  const [role,setRole] = useState(null)
  const {roleCode} = useParams()
  const navigate = useNavigate()
  const handleOnChange =(e)=>{
    const {name,value,checked,type} = e.target
    setFormData((pre)=>{
      return {...pre,[name]:type==="checkbox"?checked: value}
    })
  }
  const getRoles = async () => {
    try {
      const response = await apiRequest(`/api/v1/role/?roleSeq=${roleCode}`, "GET", null, token);
      setFormData(response?.data || []);
    } catch (err) {
      setError(true);
      console.error(err);
    }
  };

  // Fetch roles initially when component mounts
  useEffect(() => {
    getRoles();
  }, []);
  const handleSubmit=()=>{

  }
  return (
    <form onSubmit={handleSubmit} className='my-3' >
      {error?.message && <Alert message={error?.message} />}
      <div className="row">
        <div className="col-sm-6">
        <Input name="role_code" onChange={handleOnChange} value={formData.role_code} type="text" label="Role Code" required={true}/>
        </div>
        <div className="col-sm-6">
        <Input name="role_name" onChange={handleOnChange} value={formData.role_name} type="text" label="Role Name" required={true}/>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-6">
          <Radio required={true} name="is_Employee" onChange={handleOnChange} checked={formData.is_Employee} value={true}  label={"Is Employee"}/>
        </div>
        <div className="col-sm-6">
        <Radio required={true} name="is_Admin" onChange={handleOnChange} checked={formData.is_Admin} value={true}  label={"Is Admin"}/>
        </div>
      </div>
      <Button disabled={(loading) ? true : false} child={loading && <Spinner/>} type="submit" text="Edit" variant="secondary" />
    </form>
  )
}
