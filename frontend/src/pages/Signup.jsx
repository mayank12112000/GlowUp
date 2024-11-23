import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";
import Button from "../components/Button";
import Input from "../components/Input";
import { apiRequest } from "../utils/apiRequest";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { toast } from "react-toastify";
export default function Signup() {
  const { theme } = useContext(ThemeContext);
  const [loading,setLoading] = useState(null)
  const [error,setError] = useState(null)
  const [formData,setFormData] = useState({ 
    userName: "",
    email: "",
    password: "",
    mobile: "",
    name: "",
  })
  const [confirmPassword,setConfirmPassword] = useState("")
  const handleOnChange=(e)=>{
    const {name,value,type} = e.target
    setFormData(pre=>{
      return {...pre,[name]:value}
    })
  }
  const handleRegister= async (e)=>{
    e.preventDefault()
    setLoading(true)
    setError(null)
    if(!e.target.checkValidity()){
      e.target.reportValidity()    
    }
    if(formData.password !== confirmPassword){
      alert("password and confirm password should match")
    }
    else if(formData.mobile.toString().length !==10){
      alert("enter correct mobile number")
    }else{
      const response = await apiRequest("/api/v1/user/register","POST",formData)
      if(response.success){
        setError(false)
        toast.success("Logged out successfully",{
          onClose:()=>navigate("/"),
        })
      }else{
        setError({message : response.message})
      }
    }
    setLoading(false)
  }

  
  return (
        <form onSubmit={handleRegister}>
        {error && <Alert message={error?.message}/>}
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
            <div className="col-sm-6">
            <Input name="mobile" onChange={handleOnChange} value={formData.mobile} type="number" label="Mobile number" required={true}/>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
            <Input name="password" onChange={handleOnChange} value={formData.password} type="password" label="Password" required={true}/>
            </div>
            <div className="col-sm-6">
            <Input name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" label="Confirm Password" required={true} />
            </div>
          </div>
          <Button disabled={loading ? true : false} child={loading && <Spinner/>} type="submit" text="Sing Up" variant="secondary" />
        <p><small>Already have an acount <span><Link to="/login">login</Link></span></small></p>
        </form>
  );
}
