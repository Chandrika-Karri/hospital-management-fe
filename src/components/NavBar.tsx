// src/components/NavBar.tsx
import { Link, useLocation } from "react-router-dom";
import "../pages/Home.css"; // or "../pages/HomePage.css" – whatever your file is called

export default function NavBar() {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="topbar">
            <div className="logo">
                <span className="logo-dot"></span>
                Healthy Hospital
            </div>

            <ul className="navlinks">
                <li>
                    <Link className={isActive("/") ? "nav-active" : ""} to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        className={isActive("/register-patient") ? "nav-active" : ""}
                        to="/register-patient"
                    >
                        Patient Registration
                    </Link>
                </li>
                <li>
                    <Link
                        className={isActive("/register-doctor") ? "nav-active" : ""}
                        to="/register-doctor"
                    >
                        Doctor Registration
                    </Link>
                </li>
                <li>
                    <Link
                        className={isActive("/contact") ? "nav-active" : ""}
                        to="/contact"
                    >
                        Contact Us
                    </Link>
                </li>
            </ul>
        </header>
    );
}
