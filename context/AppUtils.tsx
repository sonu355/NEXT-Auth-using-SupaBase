"use client"
import React, { createContext, useContext, useEffect, useState} from "react";

interface AppUtilsType{
    isLoggedIn: boolean,
    setIsLoggedin: (state: boolean) => void
    setAuthToken: (state: null) => void
    setUserProfile: (state: null) => void
    userProfile: null
}

const AppUtilsContext = createContext<AppUtilsType | undefined>(undefined)

export const AppUtilsProvider = ({children} : {children: React.ReactNode}) =>{
    const[isLoggedIn, setIsLoggedin] = useState<boolean>(false) 
    const[authtoken, setAuthToken] = useState<null|string>(null)
    const[userProfile, setUserProfile] = useState<null>(null)

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        const userProfile = localStorage.getItem("user_profile")
        if(token){
            setAuthToken(token)
            setIsLoggedin(true)
        }
    }, [])

    return(
        <AppUtilsContext.Provider value={{ isLoggedIn,setAuthToken, setIsLoggedin, userProfile, setUserProfile }}>
            {children}
        </AppUtilsContext.Provider>
    )
}

export const myAppHook = () => {
    const context = useContext(AppUtilsContext);
    if(!context){
        throw new Error("app utils function must be wrapped inside AppUtils Provide");
    }
    return context;
}
