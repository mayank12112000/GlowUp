import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Spinner from "../../../components/Spinner";
import useQuery from './../../../utils/useQuery';
import Alert from "../../../components/Alert";
import Radio from './../../../components/Radio';
import { toast } from "react-toastify";
export default function AddProduct() {
  const navigate = useNavigate()
  const [formData,setFormData] = useState({userName: "",email: "",mobile: "",name: "",isActive:true})
  const [loading,error,data,queryFunction,success,message] = useQuery("/api/v1/product/","POST",formData)
  
  const handleOnChange=(e)=>{
    const {name,value,type,checked} = e.target
    setFormData(pre=>{
      return {...pre,[name]: type==="checkbox"?checked: value}
    })
  }
  const handleRegister= async (e)=>{
    e.preventDefault()
    if(!e.target.checkValidity()){
      e.target.reportValidity()    
    }
    await queryFunction()
  }
  useEffect(()=>{
    if(success){
      toast.success(message,{
        onClose:()=>navigate("/"),
      })
    }else{
      toast.warn(message)
    }
  },[success])

  
  return (
        <form className="mb-5" onSubmit={handleRegister}>
        {error===false && <Alert success={true} message={"User created successfully"}/>}
          <div className="row">
            <div className="col-sm-6">
            <Input name="userName" onChange={handleOnChange} value={formData.userName} type="text" label="User Name" required={true}/>
            </div>
            <div className="col-sm-6">
            <Input name="name" onChange={handleOnChange} value={formData.name} type="text" label="Full Name" required={true}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
            <Input name="email" onChange={handleOnChange} value={formData.email} type="email" label="Email" required={false}/>
            </div>
            <div className="col-sm-3">
            <Input name="mobile" onChange={handleOnChange} value={formData.mobile} type="number" label="Mobile number" required={true}/>
            </div>
            <div className="col-sm-3">
            <Radio required={true} name="isActive" onChange={handleOnChange} checked={formData.isActive} label={"Is Active"}/>
            </div>
          </div>
          <Button disabled={loading ? true : false} child={loading && <Spinner/>} type="submit" text="Sing Up" variant="secondary" />
        </form>
  );
}
