import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'

export default function Masters() {
    const {roleCode} = useContext(AuthContext)
    const navigate= useNavigate()
    useEffect(()=>{
        if(roleCode!=="ADM"){
            navigate("/login")
        }
    })
  return (
    <div>
      masters
    </div>
  )
}
