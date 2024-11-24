import React from 'react'

export default function Radio({name,value,label,required,...props}) {
  return (
    <div className="form-check">
        <input {...props} name={name} className="shadow border border-secondary form-check-input" type="checkbox" value={value} id="flexCheckDefault"/>
        <label className="fs-6 form-check-label" htmlFor="flexCheckDefault">
            {label}{required && <span className="required-asterisk">*</span>}
        </label>
    </div>
  )
}
