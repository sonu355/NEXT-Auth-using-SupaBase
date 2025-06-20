import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { supabase } from "@/lib/supabaseClient"

export default function Login(){

    const handleSocialOauth = (provider: "google" | "github") => {

    }

    return <>
        <Navbar />
        <div className="container mt-5">
            <h2 className="text-center">Login</h2>
            <form className="w-50 mx-auto mt-3">
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" />
                    <p className="text-danger"></p>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" />
                    <p className="text-danger"></p>
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>

            <div className="text-center mt-3">
                <button className="btn btn-danger mx-2" onClick={ handleSocialOauth("google") }>Google</button>
                <button className="btn btn-dark mx-2" onClick={ handleSocialOauth("github") }>Github</button>
            </div>
            <p className="text-center mt-3">
                Don't have an account <a href="/auth/register">Register</a>
            </p>
        </div>
        <Footer />
    </>
}