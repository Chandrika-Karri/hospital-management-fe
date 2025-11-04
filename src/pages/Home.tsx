// 1. bring in React + hooks
import { useEffect, useState } from "react";

// 2. bring in your shared navbar
import NavBar from "../components/NavBar";

// 3. bring in the css for this page
import "./Home.css";

// 4. define the slides that rotate
const HERO_SLIDES = [
    {
        id: "welcome",
        tag: "● Smart hospital platform",
        title: "Healthify General Hospital",
        subtitle: "Real-time care. Zero friction.",
        text: "Monitor patients, doctors, and appointments in a single, intelligent cockpit.",
        primary: "Open dashboard",
        secondary: "View departments",
    },
    {
        id: "services",
        tag: "● Clinical modules",
        title: "Services & departments",
        subtitle: "Modular. Secure. Fast.",
        text: "Outpatient, ER, surgery, diagnostics, pharmacy — all connected.",
        primary: "See modules",
        secondary: "Contact desk",
    },
    {
        id: "about",
        tag: "● About Healthy Hospital",
        title: "Built for Scandinavian hospitals",
        subtitle: "Designed for modern ops teams.",
        text: "A future-ready platform for Swedish clinics, private care and digital health startups.",
        primary: "Our story",
        secondary: "Meet the team",
    },
    {
        id: "heroes",
        tag: "● Our team",
        title: "Meet the Heroes",
        subtitle: "Leaders shaping healthcare innovation",
        text: "Behind every great hospital are exceptional minds working with passion, precision, and care.",
        primary: "Join our mission",
        secondary: "Learn more",
    },
];

// 5. main component
export default function Home() {
    // 6. which slide is active
    const [active, setActive] = useState(0);

    // 7. auto-rotate every 6s
    useEffect(() => {
        const id = setInterval(() => {
            setActive((prev) => (prev + 1) % HERO_SLIDES.length);
        }, 6000);
        return () => clearInterval(id);
    }, []);

    // 8. current slide object
    const current = HERO_SLIDES[active];

    // 9. render
    return (
        <div className="home-shell">
            {/* 10. top nav, reused on all pages */}
            <NavBar />

            {/* 11. full-width dark neon background */}
            <section className="hero-neon-bg">
                {/* 12. centered content (max-width) */}
                <div className="hero-neon-container">
                    {/* 13. glowing background orbs */}
                    <div className="hero-orb orb-1"></div>
                    <div className="hero-orb orb-2"></div>
                    <div className="hero-orb orb-3"></div>

                    {current.id === "heroes" ? (
                        // ✅ SPECIAL FULL-WIDTH LAYOUT FOR "MEET THE HEROES"
                        <div className="hero-heroes-full">
                            <h2 className="heroes-title">The People Powering Our Vision</h2>
                            <p className="heroes-sub">
                                Passionate leaders dedicated to modern healthcare.
                            </p>

                            <div className="heroes-row">
                                <div className="hero-person">
                                    <img src="/src/img/Ashwini.jpg" alt="Director" />
                                    <h5>Dr. Ashwini Shirsat</h5>
                                    <p>Medical Director</p>
                                </div>
                                <div className="hero-person">
                                    <img src="/src/img/chandrika.jpg" alt="Chief surgeon" />
                                    <h5>Dr. Chandrika Karri</h5>
                                    <p>Chief Surgeon</p>
                                </div>
                                <div className="hero-person">
                                    <img src="/src/img/jannatul.jpg" alt="Ops" />
                                    <h5>Dr. Jannatul Ferdous</h5>
                                    <p>Head of Operations</p>
                                </div>
                                <div className="hero-person">
                                    <img src="/src/img/kanisha.jpg" alt="IT" />
                                    <h5>Dr. Kanisha Arora</h5>
                                    <p>Head of Innovation &amp; IT</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // ✅ NORMAL LAYOUT FOR OTHER SLIDES
                        <>
                            {/* 14. LEFT side: text, buttons, metrics */}
                            <div className="hero-neon-left">
                                {/* 15. small tag/pill on top */}
                                <div className="hero-tag">
                                    <span className="status-dot"></span>
                                    {current.tag}
                                </div>

                                {/* 16. main title */}
                                <h1 className="hero-title">{current.title}</h1>

                                {/* 17. subheading */}
                                <p className="hero-subtitle">{current.subtitle}</p>

                                {/* 18. description */}
                                <p className="hero-text">{current.text}</p>

                                {/* 19. main actions */}
                                <div className="hero-actions">
                                    <button className="btn btn-neon">{current.primary}</button>
                                    <button className="btn btn-glass">{current.secondary}</button>
                                </div>

                                {/* 20. bottom metrics */}
                                <div className="hero-metrics">
                                    <div className="metric-card">
                                        <h3>120+</h3>
                                        <p>Active patients</p>
                                    </div>
                                    <div className="metric-card">
                                        <h3>32</h3>
                                        <p>Specialist doctors</p>
                                    </div>
                                    <div className="metric-card">
                                        <h3>98%</h3>
                                        <p>Satisfaction</p>
                                    </div>
                                </div>
                            </div>

                            {/* 22. RIGHT side: glass panels change per slide */}
                            <div className="hero-neon-right">
                                {current.id === "services" ? (
                                    // 23. services slide
                                    <div className="glass-panel glass-panel--tall">
                                        <h4>Live departments</h4>
                                        <ul className="dept-list">
                                            <li>
                                                <span>🫀 Cardiology</span>
                                                <span className="pill online">6 active</span>
                                            </li>
                                            <li>
                                                <span>🧠 Neurology</span>
                                                <span className="pill idle">2 pending</span>
                                            </li>
                                            <li>
                                                <span>🦴 Orthopedics</span>
                                                <span className="pill online">4 active</span>
                                            </li>
                                            <li>
                                                <span>👶 Pediatrics</span>
                                                <span className="pill online">3 active</span>
                                            </li>
                                        </ul>
                                    </div>
                                ) : current.id === "about" ? (
                                    // 24. about slide
                                    <div className="glass-panel glass-panel--tall">
                                        <h4>Why hospitals pick us</h4>
                                        <p className="glass-text">
                                            Secure, hosted in EU, made for Swedish workflows.
                                        </p>
                                        <ul className="about-points">
                                            <li>✅ 20+ clinical modules</li>
                                            <li>✅ Roles & permissions</li>
                                            <li>✅ Realtime appointments</li>
                                            <li>✅ API for integration</li>
                                        </ul>
                                    </div>
                                ) : (
                                    // 25. default / welcome slide
                                    <>
                                        <div className="glass-panel">
                                            <h4>Today’s overview</h4>
                                            <div className="stats-inline">
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
                                        <div className="glass-panel glass-panel--strip">
                                            <p>Next available: Dr. Patel · 11:30</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}

                    {/* 21. slide dots — always visible */}
                    <div className="hero-dots neon">
                        {HERO_SLIDES.map((slide, i) => (
                            <button
                                key={slide.id}
                                onClick={() => setActive(i)}
                                className={i === active ? "is-active" : ""}
                                aria-label={`Go to ${slide.id}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* 26. normal content continues */}
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

            {/* 27. footer */}
            <footer className="footer">
                © {new Date().getFullYear()} Healthy Hospital — All rights reserved.
            </footer>
        </div>
    );
}
