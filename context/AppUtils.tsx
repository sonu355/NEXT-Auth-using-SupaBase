"use client"
import React, { createContext, useContext, useState} from "react";

interface AppUtilsType{
    isLoggedIn: boolean
}

const AppUtilsContext = createContext<AppUtilsType | undefined>(undefined)

export const AppUtilsProvider = ({children} : {children: React.ReactNode}) =>{
    const[isLoggedIn, setIsLoggedin] = useState<boolean>(false) 

    return(
        <AppUtilsContext.Provider value={{isLoggedIn}}>
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
