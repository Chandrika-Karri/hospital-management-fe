import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar"; // ✅ shared navbar
import "./Home.css";

const HERO_SLIDES = [
    {
        id: "welcome",
        pill: "Smart hospital dashboard",
        title: "Welcome to Healthy Hospital",
        subtitle: "Better care, faster operations.",
        text: "Manage doctors, patients, appointments and daily tasks from a single modern interface.",
        primary: "Book appointment",
        secondary: "View doctors",
    },
    {
        id: "services",
        pill: "What we offer",
        title: "Services & departments",
        subtitle: "From outpatient to emergency.",
        text: "Appointments, doctor scheduling, patient registration, billing and reporting — all in one place.",
        primary: "See services",
        secondary: "Contact desk",
    },
    {
        id: "about",
        pill: "About us",
        title: "Your partner in hospital ops",
        subtitle: "Patient-first, data-driven.",
        text: "We help hospitals deliver better outcomes with integrated technology and a modern experience for staff.",
        primary: "Read our story",
        secondary: "Meet the team",
    },
];

export default function Home() {
    const [active, setActive] = useState(0);

    // auto-rotate every 6s
    useEffect(() => {
        const id = setInterval(() => {
            setActive((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 6000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="home-shell">
            <NavBar /> {/* ✅ now reused across all pages */}

            {/* BIG ROTATING HERO */}
            <section className="hero-modern hero-rotator">
                {HERO_SLIDES.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`hero-slide ${index === active ? "is-active" : ""}`}
                    >
                        <div className="hero-left">
                            <div className="hero-pill">
                                <span>●</span> {slide.pill}
                            </div>

                            <h1>{slide.title}</h1>
                            <h2 className="hero-subtitle">{slide.subtitle}</h2>
                            <p className="hero-sub">{slide.text}</p>

                            <div className="hero-buttons">
                                <button className="btn btn-primary">{slide.primary}</button>
                                <button className="btn btn-outline">{slide.secondary}</button>
                            </div>

                            <div className="hero-stats">
                                <div>
                                    <h3>120+</h3>
                                    <p>Active patients</p>
                                </div>
                                <div>
                                    <h3>32</h3>
                                    <p>Specialist doctors</p>
                                </div>
                                <div>
                                    <h3>98%</h3>
                                    <p>Satisfaction</p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="hero-right">
                            {slide.id === "services" ? (
                                <div className="hero-card services-card">
                                    <h4>Our Departments</h4>
                                    <div className="departments-grid">
                                        <div className="dept-item">
                                            <h5>🫀 Cardiology</h5>
                                            <p>Heart check-ups & advanced care.</p>
                                        </div>
                                        <div className="dept-item">
                                            <h5>🧠 Neurology</h5>
                                            <p>Brain and nervous system care.</p>
                                        </div>
                                        <div className="dept-item">
                                            <h5>🦴 Orthopedics</h5>
                                            <p>Joint, bone, and spine treatments.</p>
                                        </div>
                                        <div className="dept-item">
                                            <h5>👶 Pediatrics</h5>
                                            <p>Child and newborn health specialists.</p>
                                        </div>
                                        <div className="dept-item">
                                            <h5>🦷 Dental</h5>
                                            <p>Full dental care and surgery.</p>
                                        </div>
                                        <div className="dept-item">
                                            <h5>🩺 General Medicine</h5>
                                            <p>Routine check-ups and diagnostics.</p>
                                        </div>
                                    </div>
                                </div>
                            ) : slide.id === "about" ? (
                                <div className="hero-card about-card">
                                    <h4>About Healthy Hospital</h4>
                                    <p>
                                        We combine compassionate care with modern clinical
                                        operations so staff can focus on patients, not paperwork.
                                    </p>
                                    <ul className="about-list">
                                        <li>🏥 20+ specialized departments</li>
                                        <li>👩‍⚕️ Expert, certified staff</li>
                                        <li>🌐 Integrated digital records</li>
                                        <li>💙 Community-first mindset</li>
                                    </ul>
                                    <p>
                                        Our mission: deliver better outcomes, faster, for everyone.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="hero-card stats-card">
                                        <h4>Today’s overview</h4>
                                        <div className="stats-grid">
                                            <div>
                                                <p>New patients</p>
                                                <h3>8</h3>
                                            </div>
                                            <div>
                                                <p>Appointments</p>
                                                <h3>14</h3>
                                            </div>
                                            <div>
                                                <p>Surgeries</p>
                                                <h3>2</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hero-card hero-badge">
                                        Next available: Dr. Patel · 11:30 AM
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}

                {/* dots */}
                <div className="hero-dots">
                    {HERO_SLIDES.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={i === active ? "is-active" : ""}
                        />
                    ))}
                </div>
            </section>

            {/* Services section */}
            <section className="section section-services">
                <div className="section-head">
                    <h2>Hospital services</h2>
                    <p>Fast access to the modules your staff uses most.</p>
                </div>
                <div className="cards-grid">
                    <div className="info-card">
                        <h3>Patient Registry</h3>
                        <p>Add, update and track patients.</p>
                        <span className="tag blue">Patients</span>
                    </div>
                    <div className="info-card">
                        <h3>Doctor Scheduling</h3>
                        <p>Manage shifts and availability.</p>
                        <span className="tag green">Doctors</span>
                    </div>
                    <div className="info-card">
                        <h3>Appointments</h3>
                        <p>Daily and weekly bookings.</p>
                        <span className="tag orange">Bookings</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                © {new Date().getFullYear()} Healthy Hospital — All rights reserved.
            </footer>
        </div>
    );
}
