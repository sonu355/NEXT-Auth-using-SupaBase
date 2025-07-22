"use client"


import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";

const formSchema = yup.object().shape({
   fullName: yup.string().required("Full name is required"),
   email: yup.string().email("Invalid email value").required("email value is required"),
   phone: yup.string().required("Phone number is required"),
   gender: yup.string().required("gender is required").oneOf(["Male", "Female", "Other"], "Gender is not allowed"),
   password: yup.string().required("password is required").min(6, "password is minimum 6 characters"),
   confirm_password: yup.string().required("Confirm password is required").oneOf([yup.ref("password")], "password didn't match")
})

export default function Register(){

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors, isSubmitting
        }
    } = useForm({
        resolver: yupResolver(formSchema)
    })

    const onSubmit = async (formdata: any) => {
        //  console.log(formdata)
        const{fullName, email, gender, password, phone} = formdata;
        const{data, error} = await supabase.auth.signUp({
            email,
            password,
            options:{
                data:{
                    fullName,
                    gender,
                    phone
                }
            }
        });
        if(error){
            toast.error("failed to register user")
        }else{
            toast.success("User registered sucessfully")
            router.push("/auth/login")
        }
    }

    const handleLoginRegister = () => {
        router.push("/auth/login")
    }

    return <>
        <Navbar />
        <div className="container mt-5">
            <h2 className="text-center">Register Here</h2>
            <form onSubmit={ handleSubmit(onSubmit) } className="w-50 mx-auto mt-3">
                <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" {...register("fullName")}/>
                    <p className="text-danger">{errors.fullName?.message}</p>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" {...register("email")} />
                    <p className="text-danger">{errors.email?.message}</p>
                </div>
                </div>

                <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" {...register("phone")}/>
                    <p className="text-danger">{errors.phone?.message}</p>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <select className="form-control" {...register("gender")}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <p className="text-danger">{errors.gender?.message}</p>
                </div>
                </div>

                <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" {...register("password")} />
                    <p className="text-danger">{errors.password?.message}</p>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" {...register("confirm_password")}/>
                    <p className="text-danger">{errors.confirm_password?.message}</p>
                </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            <p className="text-center mt-3">
                Already have an account? <a onClick={ handleLoginRegister } style={{ cursor: "pointer"}}>Login</a>
            </p>
        </div>
        <Footer />
    </>
}