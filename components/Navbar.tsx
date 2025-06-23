"use client"
import Link from "next/link";
import { myAppHook } from "@/context/AppUtils";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
 
const Navbar = () => {

    const { isLoggedIn, setIsLoggedin, setAuthToken } = myAppHook();

    const router = useRouter()

    const handleUserLogout = async () => {
        localStorage.removeItem("access_token")
        setIsLoggedin(false)
        setAuthToken(null)
        await supabase.auth.signOut()
        router.push("/auth/login")
    }   

    return <>
        <nav className="navbar navbar-expand-lg px-4" style={{backgroundColor: "#343a40"}}>
            <Link href="/" className="navbar-brand fw-bold text-white">SupaNext</Link>

            {
                isLoggedIn ? (
                    <div className="ms-auto">
                        <Link href="/auth/dashboard" className="me-3 text-white text-decoration-none">Dashboard</Link>
                        <Link href="/auth/profile" className="me-3 text-white text-decoration-none">Profile</Link>
                        <button className="btn btn-danger" onClick={ handleUserLogout }>Logout</button>
                    </div>
                ) : (
                    <div className="ms-auto">
                        <Link href="/" className="me-3 text-white text-decoration-none">Home</Link>
                        <Link href="/auth/login" className="me-3 text-white text-decoration none">Login</Link>
                    </div>
                )
            }
        </nav>
    </>
}
export default Navbar;