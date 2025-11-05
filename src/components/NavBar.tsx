// src/components/NavBar.tsx
import { Link, useLocation } from "react-router-dom";
import "../pages/Home.css";

export default function NavBar() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="topbar">
            <div className="logo-section flex items-center gap-1">
                <img
                    src="/src/img/logo.png"
                    alt="Healthify General Hospital Logo"
                    style={{width: "250px", height: "75px"}}
                    className="hospital-logo object-contain"
                />
                <p className="hospital-tagline text-sm text-blue-700 -ml-1">
                    Caring for you and your loved ones since 1998
                </p>
            </div>


            {/* Desktop navigation links only */}
            <ul className="navlinks">
                <li>
                    <Link className={isActive("/") ? "nav-active" : ""} to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className={isActive("/register-patient") ? "nav-active" : ""} to="/register-patient">
                        Patient Registration
                    </Link>
                </li>
                <li>
                    <Link className={isActive("/register-doctor") ? "nav-active" : ""} to="/register-doctor">
                        Doctor Registration
                    </Link>
                </li>
                <li>
                    <Link className={isActive("/contact-details") ? "nav-active" : ""} to="/contact-details">
                        Contact Us
                    </Link>
                </li>
            </ul>
        </header>
    );
}
