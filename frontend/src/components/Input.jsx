import React, { useState } from 'react'

export default function Input({label,type,required=false,autoComplete,...props}) {
  const [show,setShow] = useState(false)
  const toggleShow=()=>{
    setShow(!show)
  }
  return (
    <div className="mb-3" >
        <label htmlFor="basic-url" className="form-label">{label}{required && <span className="required-asterisk">*</span>}</label>
        <div className="input-group">
        <input  {...props} required={required} type={type!="password"?type:show?"text":"password"} className="shadow-sm form-control" aria-describedby="basic-addon3 basic-addon4"/>
        {type=="password" && 
        <>
        {show ? <i onClick={toggleShow} type='button' style={{position:"absolute",right:"1rem",top:"0.55rem",zIndex:"800000"}} class="fa fs-6 px-1 eye-input fa-eye-slash" aria-hidden="true"></i>:
        <i onClick={toggleShow} type='button' style={{position:"absolute",right:"1rem",top:"0.55rem",zIndex:"800000"}} class="fa fs-6 px-1 eye-input fa-eye" aria-hidden="true"></i>
}</>
        }
        </div>
    </div>
  )
}
