import React, { useState } from 'react'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { Link } from 'react-router-dom'
import Spinner from '../../../components/Spinner'

export default function AddRole() {
  const [error,setError] = useState(null)
  const [formData,setFormData] = useState({roleCode:"",roleName:""})
  const [loading,setLoading] = useState(null)
  const handleOnChange =(e)=>{
    const {name,value} = e.target
    setFormData((pre)=>{
      return {...pre,[name]:value}
    })
  }
  return (
    <form className='my-3' >
      {error?.message && <Alert message={error?.message} />}
      <div className="row">
        <div className="col-sm-6">
        <Input name="roleCode" onChange={handleOnChange} value={formData.roleCode} type="text" label="Role Code" required={true}/>
        </div>
        <div className="col-sm-6">
        <Input name="roleName" onChange={handleOnChange} value={formData.roleName} type="text" label="Role Name" required={true}/>
        </div>
      </div>

      <Button disabled={(loading) ? true : false} child={loading && <Spinner/>} type="submit" text="Add" variant="secondary" />
    </form>
  )
}
