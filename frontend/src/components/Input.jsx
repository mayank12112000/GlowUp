import React from 'react'

export default function Input({label,type,required=false,autoComplete,...props}) {
  return (
    <div className="mb-3" >
        <label htmlFor="basic-url" className="form-label">{label}{required && <span className="required-asterisk">*</span>}</label>
        <div className="input-group">
        <input  {...props} required={required} type={type} className="form-control" aria-describedby="basic-addon3 basic-addon4"/>
        </div>
    </div>
  )
}
