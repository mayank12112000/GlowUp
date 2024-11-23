import React, { createContext, useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'
export const AuthContext = createContext()

export default function AuthProvider({children}) {
    const [userSeq,setUserSeq] = useState(null)
    const [roleCode,setRoleCode] = useState(null)
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
    const logout=()=>{
        setUserSeq(null)
        setRoleCode(null)
        localStorage.removeItem("accessToken")
    }
  return (
    <AuthContext.Provider value={{userSeq,logout,roleCode,setRoleCode,setUserSeq}}>
      {children}
    </AuthContext.Provider>
  )
}
