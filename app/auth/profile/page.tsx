import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer" 

export default function Profile(){
    return <>
        <Navbar />
        <div className="container mt-3">
            <h2>Profile</h2>
            <div className="card p-4 shadow-sm">
                <p><strong>Name:</strong>N/A</p>
                <p><strong>Email:</strong></p>
                <p><strong>Phone</strong>N/A</p>
                <p><strong>Gender:</strong>N/A</p>
            </div>
        </div>
        <Footer />
    </>
}