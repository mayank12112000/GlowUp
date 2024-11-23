import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import { apiRequest } from '../utils/apiRequest'
import { toast } from 'react-toastify';

export default function Masters() {
    const {userSeq} = useContext(AuthContext)
    const [loading,setLoading] = useState(null)
    const token = localStorage.getItem("accessToken")
    const navigate= useNavigate()
    console.log(loading)
    const retrieveRole = async()=>{

        setLoading(true)
        const {data} = await apiRequest("/api/v1/user/currentRole","GET",null,token)
        if(!data){
            toast.warn("You are not authenticated",{
                onClose:()=>navigate("/"),
              })
        }
        else if(data.roleCode !== "ADM"){
            navigate("/login")
        }else{
            setLoading(false)
        }
    }
    useEffect(()=>{
        retrieveRole()
    },[userSeq])
  return (
    <div className="row row-cols-lg-5 row-cols-md-4 row-cols-sm-3 d-flex justify-content-around">
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>
            
        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
        <div style={{background:"pink",height:"5rem",width:"5rem"}}>

        </div>
    </div>
  )
}
