import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../context/ThemeProvider';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const [loading,setLoading] = useState(null)
  const [error,setError] = useState(null)
  const [formData,setFormData] = useState({ 
    loginParam: "",
    password: ""
  })

  const handleOnChange=(e)=>{
    const {name,value,type} = e.target
    setFormData(pre=>{
      return {...pre,[name]:value}
    })
  }
  const handleLogin=(e)=>{
    e.preventDefault()
    if(!e.target.checkValidity()){
      e.target.reportValidity()    
    }
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
          <Button disabled={loading ? true : false} child={loading && <Spinner/>} type="submit" text="Login" variant="secondary" />
        <p><small>Don't have a acount? <span><Link to="/signup">Sign Up</Link></span></small></p>
        </form>
      </div>
  )
}
