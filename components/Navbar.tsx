const Navbar = () => {
    return <>
        <nav className="navbar navbar-expand-lg px-4" style={{backgroundColor: "#343a40"}}>
            <a href="/" className="navbar-brand fw-bold text-white">SupaNext</a>

            <div className="ms-auto">
                <a href="/auth/dashboard" className="me-3 text-white text-decoration-none">Dashboard</a>
                <a href="/auth/profile" className="me-3 text-white text-decoration-none">Profile</a>
                <button className="btn btn-danger">Logout</button>
            </div>

            <div className="ms-auto">
                <a href="/" className="me-3 text-white text-decoration-none">Home</a>
                <a href="/auth/login" className="me-3 text-white text-decoration none">Login</a>
            </div>
        </nav>
    </>
}
export default Navbar;