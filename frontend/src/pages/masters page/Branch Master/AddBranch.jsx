import React, { useEffect, useState } from 'react'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import {  useNavigate } from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import Radio from '../../../components/Radio'
import {apiRequest} from "../../../utils/apiRequest.js"
import { toast } from 'react-toastify';
import useQuery from '../../../utils/useQuery.jsx'

export default function AddBranch() {
  const [formData,setFormData] = useState({branchName:"",branchAddress:""})
  const [loading,error,data,runQuery,success,message] = useQuery("/api/v1/branch","POST",formData)
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
    if(error){
      toast.warn(error)
    }
    if(success){
      toast.success(message,{
        onClose:()=>navigate("/masters/branch-master")
      })
    }
  },[data,error,success,message])
  return (
    <form onSubmit={handleSubmit} className='my-3' >
      {error?.message && <Alert message={error?.message} />}
      <div className="row">
        <div className="col-sm-6">
        <Input name="branchName" onChange={handleOnChange} value={formData.branchName} type="text" label="Branch Name" required={true}/>
        </div>
        <div className="col-sm-6">
        <Input name="branchAddress" onChange={handleOnChange} value={formData.branchAddress} type="text" label="Branch Address" required={true}/>
        </div>
      </div>
      <Button disabled={(loading) ? true : false} child={loading && <Spinner/>} type="submit" text="Add" variant="secondary" />
    </form>
  )
}
