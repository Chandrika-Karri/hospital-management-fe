// src/pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import "./HomePage.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function HomePage() {
    const [doctors, setDoctors] = useState([]);
    const [loadingDoctors, setLoadingDoctors] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        reason: "",
    });
    const [bookingMsg, setBookingMsg] = useState("");
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    useEffect(() => {
        const getDoctors = async () => {
            try {
                setLoadingDoctors(true);
                const res = await fetch(`${API_BASE}/api/doctors`);
                if (!res.ok) throw new Error("Could not load doctors");
                const data = await res.json();
                setDoctors(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoadingDoctors(false);
            }
        };
        getDoctors();
    }, []);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setBookingMsg("");
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE}/api/appointments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || "Booking failed");
            }

            setBookingMsg("✅ Your request has been sent. We will contact you.");
            setForm({ name: "", email: "", reason: "" });
        } catch (err) {
            setBookingMsg(err.message);
        }
    };

    return (
        <div className="home-shell">
            {/* TOP BAR */}
            <nav className="topbar">
                <div className="logo">
                    <span className="logo-dot" />
                    CityCare
                </div>
                <ul className="navlinks">
                    <li><a href="#services">Services</a></li>
                    <li><a href="#doctors">Doctors</a></li>
                    <li><a href="#booking">Book</a></li>
                </ul>
                <div className="nav-actions">
                    {!isLoggedIn ? (
                        <a href="/login" className="btn btn-outline">Login</a>
                    ) : (
                        <span className="user-pill">Logged in</span>
                    )}
                    <a href="/appointments" className="btn btn-primary sm-hide">
                        Book Appointment
                    </a>
                </div>
            </nav>

            {/* HERO */}
            <header className="hero-modern">
                <div className="hero-left">
                    <p className="hero-pill">24/7 Hospital • Emergency • Online care</p>
                    <h1>Smart healthcare, made human.</h1>
                    <p className="hero-sub">
                        Book visits, see your doctors and manage your care in one secure app your whole team built.
                    </p>
                    <div className="hero-buttons">
                        <a href="/appointments" className="btn btn-primary">
                            Book now
                        </a>
                        <a href="#services" className="btn btn-ghost">
                            View services
                        </a>
                    </div>
                    {!isLoggedIn && (
                        <p className="auth-hint">
                            🔒 Some sections are for logged-in users. <a href="/login">Login</a>
                        </p>
                    )}
                    <div className="hero-stats">
                        <div>
                            <h3>4.9★</h3>
                            <p>Patient rating</p>
                        </div>
                        <div>
                            <h3>120+</h3>
                            <p>Specialists</p>
                        </div>
                        <div>
                            <h3>15 min</h3>
                            <p>Avg. waiting time</p>
                        </div>
                    </div>
                </div>

                <div className="hero-right">
                    <div className="hero-card glass">
                        <p className="card-title">Next available doctor</p>
                        <h3>Dr. Anna Sjoberg</h3>
                        <p className="muted">General Medicine • 09:30 today</p>
                        <button className="btn btn-primary full">Book this slot</button>
                    </div>

                    <div className="hero-card stats-card glass">
                        <p>Today’s overview</p>
                        <div className="stats-grid">
                            <div>
                                <h4>36</h4>
                                <span>Appointments</span>
                            </div>
                            <div>
                                <h4>12</h4>
                                <span>Emergency</span>
                            </div>
                            <div>
                                <h4>5</h4>
                                <span>Available</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-badge glass">
                        <p>ISO 9001 certified hospital ✅</p>
                    </div>
                </div>
            </header>

            {/* SERVICES */}
            <section id="services" className="section section-services">
                <div className="section-head">
                    <h2>Hospital services</h2>
                    <p>Everything a modern clinic needs.</p>
                </div>
                <div className="cards-grid">
                    <article className="info-card">
                        <h3>Emergency care</h3>
                        <p>24/7 priority emergency unit with triage.</p>
                        <span className="tag">Always open</span>
                    </article>
                    <article className="info-card">
                        <h3>Diagnostics</h3>
                        <p>Lab, X-ray, and imaging results in the app.</p>
                        <span className="tag blue">Fast results</span>
                    </article>
                    <article className="info-card">
                        <h3>Pediatrics</h3>
                        <p>Child-friendly care with specialists.</p>
                        <span className="tag green">Family</span>
                    </article>
                    <article className="info-card">
                        <h3>Cardiology</h3>
                        <p>Heart specialists and monitoring.</p>
                        <span className="tag orange">Specialists</span>
                    </article>
                </div>
            </section>

            {/* DOCTORS */}
            <section id="doctors" className="section section-doctors">
                <div className="section-head">
                    <h2>Our doctors</h2>
                    <p>Loaded from Express backend.</p>
                </div>

                {loadingDoctors && <p>Loading doctors…</p>}
                {error && <p className="error-text">{error}</p>}

                <div className="doctor-grid">
                    {doctors.slice(0, 4).map((doc) => (
                        <article key={doc._id || doc.id} className="doctor-card">
                            <div className="avatar-circle">
                                {doc.name ? doc.name[0] : "D"}
                            </div>
                            <h3>{doc.name}</h3>
                            <p className="doctor-spec">{doc.speciality}</p>
                            <p className="doctor-desc">
                                {doc.description || "Trusted specialist at CityCare."}
                            </p>
                            <button className="btn btn-light">View profile</button>
                        </article>
                    ))}

                    {!loadingDoctors && doctors.length === 0 && (
                        <p>No doctors in database yet. Add via backend.</p>
                    )}
                </div>
            </section>

            {/* QUICK BOOKING */}
            <section id="booking" className="section section-booking">
                <div className="booking-left">
                    <h2>Quick booking</h2>
                    <p>
                        Send a request and our staff will assign the right doctor. This form
                        uses <code>POST /api/appointments</code>.
                    </p>
                    <ul className="booking-points">
                        <li>Secure</li>
                        <li>Fast</li>
                        <li>Works with JWT</li>
                    </ul>
                </div>
                <form className="booking-form" onSubmit={handleSubmit}>
                    <label>
                        Full name
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="John Carter"
                        />
                    </label>
                    <label>
                        Email
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="you@example.com"
                        />
                    </label>
                    <label>
                        Reason / symptoms
                        <textarea
                            name="reason"
                            rows={3}
                            value={form.reason}
                            onChange={handleChange}
                            required
                            placeholder="Headache, fever, ..."
                        />
                    </label>
                    <button type="submit" className="btn btn-primary full">
                        Send request
                    </button>
                    {bookingMsg && <p className="form-msg">{bookingMsg}</p>}
                </form>
            </section>

            <footer className="footer">
                <p>© {new Date().getFullYear()} CityCare Hospital • Built by Group</p>
            </footer>
        </div>
    );
}
