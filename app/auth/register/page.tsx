import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Register(){
    return <>
        <Navbar />
        <div className="container mt-5">
            <h2 className="text-center">Register Here</h2>
            <form className="w-50 mx-auto mt-3">
                <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" />
                    <p className="text-danger"></p>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" />
                    <p className="text-danger"></p>
                </div>
                </div>

                <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" />
                    <p className="text-danger"></p>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <select className="form-control">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    </select>
                    <p className="text-danger"></p>
                </div>
                </div>

                <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" />
                    <p className="text-danger"></p>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" />
                    <p className="text-danger"></p>
                </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            <p className="text-center mt-3">
                Already have an account? <a href="/auth/login">Login</a>
            </p>
        </div>
        <Footer />
    </>
}