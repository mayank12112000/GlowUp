import React, { createContext, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
import { apiRequest } from './../utils/apiRequest';
export const AuthContext = createContext()

export default function AuthProvider({children}) {
    const [userSeq,setUserSeq] = useState(null)
    const [roleCode,setRoleCode] = useState(null)
    const token= localStorage.getItem("accessToken")
    useEffect(()=>{
        const token = localStorage.getItem("accessToken")
        if(token){
            const decoded = jwtDecode(token)
            if(decoded.exp * 1000 > Date.now()){
                setUserSeq(decoded.userSeq)
                setRoleCode(decoded.roleCode)
            }else{
                localStorage.removeItem("accessToken")
                setUserSeq(null)
                setRoleCode(null)
            }
        }
    },[])
    const logout= async()=>{
      const {response} = await apiRequest("/api/v1/user/logout","POST",null,token)
      if(response.success){
        setUserSeq(null)
        setRoleCode(null)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        return true
      }
    }
  return (
    <AuthContext.Provider value={{userSeq,logout,roleCode,setRoleCode,setUserSeq}}>
      {children}
    </AuthContext.Provider>
  )
}