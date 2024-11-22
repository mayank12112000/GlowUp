import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeProvider';
import Input from '../components/Input';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import { apiRequest } from '../utils/apiRequest';
import Alert from '../components/Alert';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const [loading,setLoading] = useState(null)
  const [error,setError] = useState(null)
  const [loggedIn,setLoggedIn] = useState(null)
  const [formData,setFormData] = useState({loginParam: "",password: ""})
  const navigate = useNavigate()
  

  const handleOnChange=(e)=>{
    const {name,value} = e.target
    setFormData(pre=>{
      return {...pre,[name]:value}
    })
  }
  const handleLogin=async(e)=>{
    e.preventDefault()
    if(!e.target.checkValidity()){
      e.target.reportValidity()    
    }
    setLoading(true)
    setError(null)
    const {response} = await apiRequest("/api/v1/user/login","POST",formData)
    if(!response?.success){
      setLoading(false)
      setError(response.message)
    }else{
      console.log(response)
      localStorage.setItem("glowup_accessToken",response.data.accessToken)
      localStorage.setItem("glowup_refreshToken",response.data.refreshToken)
      toast.success("Login successful",{
        onClose:()=>navigate("/"),
        onOpen:()=> setLoggedIn(true)
      })
    }
    setLoading(false)
  }
  return (
    <div className="row shadow signup-page" data-bs-theme={`${theme==="dark"?"dark":"light"}`}>
        <form onSubmit={handleLogin}>
        {error && <Alert message={error?.message}/>}
        {error===false && <Alert success={true} message={"User created successfully"}/>}
          <div className="row">
            <div className="col-sm-6">
            <Input name="loginParam" onChange={handleOnChange} value={formData.loginParam} type="text" label="User Name/email/mobile" required={true}/>
            </div>
            
            <div className="col-sm-6">
            <Input name="password" onChange={handleOnChange} value={formData.password} type="password" label="Password" required={true}/>
            </div>
            
          </div>
          <Button disabled={(loading || loggedIn) ? true : false} child={loading && <Spinner/>} type="submit" text="Login" variant="secondary" />
        <p><small>Don't have a acount? <span><Link to="/signup">Sign Up</Link></span></small></p>
        </form>
        <ToastContainer position="top-right" autoClose={800} hideProgressBar={false} newestOnTop={false}
        closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme={theme} transition= {Bounce}
        />
      </div>
  )
}
