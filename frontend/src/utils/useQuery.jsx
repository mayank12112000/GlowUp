import React, { useState } from 'react'
import { apiRequest } from './apiRequest'

export default function useQuery(query,method,body) {
    const [loading,setLoading] = useState(null)
    const [error,setError] = useState(null)
    const [data,setData] = useState(null)
    const [success,setSuccess] = useState(null)
    const [message,setMessage] = useState(null)
    const token = localStorage.getItem("accessToken");

    // const response = await apiRequest("/api/v1/role/getRoles", "GET", null, token);
    const queryFunction = async()=>{
        setLoading(true)
        setMessage(null)
        setError(null)
        setSuccess(null)
        const response = await apiRequest(query,method,body,token)
        setSuccess(response.success)
        if(response.success){
            setLoading(false)
            setError(null)
            setData(response.data)
            setMessage(response.message)
        }else{
            setError(response.message)
            setLoading(false)
            setMessage(response.message)
        }
    }
    
  return [loading,error,data,queryFunction,success,message]
}
