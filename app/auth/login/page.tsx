"use client";

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { supabase } from "@/lib/supabase"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast"
import { useEffect } from "react";
import { myAppHook } from "@/context/AppUtils";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Router } from "next/router";

const formSchema = yup.object().shape({
   email: yup.string().email("Invalid email value").required("email value is required"),
   password: yup.string().required("password is required").min(6, "password is minimum 6 characters"),
})

export default function Login(){
    const router = useRouter()
    const { isLoggedIn, setIsLoggedin, setAuthToken } = myAppHook()

    const {
            register,
            handleSubmit,
            formState: {
                isSubmitting, errors
            }
    } = useForm({
        resolver: yupResolver(formSchema)
    })

    useEffect(() => {

        if(isLoggedIn){
            router.push("/auth/dashboard");
            return;
        }
    }, [isLoggedIn])

    const handleSocialOauth = async (provider: "google" | "github") => {

        const {data, error} = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/dashboard`
            }
        })
        if (error) {
            toast.error("Failed to login Social Oauth")
        }
    }

    const onSubmit = async (formdata: any) => {
        const{ email, password } = formdata;
        const{ error, data } = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(error){
            toast.error("Invalid login details")
        }else{
            if(data.session?.access_token){
            setAuthToken(data.session?.access_token);
            localStorage.setItem("access_token", data.session?.access_token);
            setIsLoggedin(true);
            toast.success("User logged in successfully")
        }
        }
    }

    const handleRegisterRedirect = () => {
        router.push("/auth/register")
    }

    return <>
        <Navbar />
        <div className="container mt-5">
            <h2 className="text-center">Login</h2>
            <form onSubmit={ handleSubmit(onSubmit)} className="w-50 mx-auto mt-3">
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" {...register("email")}/>
                    <p className="text-danger">{errors.email?.message}</p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" {...register("password")}/>
                    <p className="text-danger">{errors.password?.message}</p>
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>

            <div className="text-center mt-3">
                <button className="btn btn-danger mx-2" onClick={ () =>handleSocialOauth("google") }>Google</button>
                <button className="btn btn-dark mx-2" onClick={ () => handleSocialOauth("github") }>Github</button>
            </div>
            <p className="text-center mt-3">
                Don't have an account <a onClick={ handleRegisterRedirect} style={{ cursor: "pointer"}}>Register</a>
            </p>
        </div>
        <Footer />
    </>
}