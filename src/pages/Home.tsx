import "./HomePage.css";

export default function Home() {
    return (
        <div className="home-shell">
            {/* Top bar / navbar */}
            <header className="topbar">
                <div className="logo">
                    <span className="logo-dot"></span>
                    Healthy Hospital
                </div>

                <ul className="navlinks">
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Doctors</a></li>
                    <li><a href="#">Patients</a></li>
                    <li><a href="#">Bookings</a></li>
                </ul>

                <div className="nav-actions">
                    <span className="user-pill">Admin</span>
                    <button className="btn btn-light">Log out</button>
                </div>
            </header>

            {/* Hero */}
            <section className="hero-modern">
                <div className="hero-left">
                    <div className="hero-pill">
                        <span>●</span> Smart hospital dashboard
                    </div>
                    <h1>Better care, faster operations.</h1>
                    <p className="hero-sub">
                        Manage doctors, patients, appointments and daily tasks from a single modern interface.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn btn-primary">Book appointment</button>
                        <button className="btn btn-outline">View doctors</button>
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

                {/* Right side cards */}
                <div className="hero-right">
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
                </div>
            </section>

            {/* Services */}
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

            {/* Doctors */}
            <section className="section">
                <div className="section-head">
                    <h2>Top doctors</h2>
                </div>
                <div className="doctor-grid">
                    <div className="doctor-card">
                        <div className="avatar-circle">DP</div>
                        <p className="doctor-spec">Dermatology</p>
                        <p className="doctor-desc">Mon–Fri, 9am–3pm</p>
                        <button className="btn btn-ghost btn full">Book</button>
                    </div>
                    <div className="doctor-card">
                        <div className="avatar-circle">AR</div>
                        <p className="doctor-spec">Cardiology</p>
                        <p className="doctor-desc">Mon–Sat, 10am–4pm</p>
                        <button className="btn btn-ghost btn full">Book</button>
                    </div>
                    <div className="doctor-card">
                        <div className="avatar-circle">MS</div>
                        <p className="doctor-spec">Neurology</p>
                        <p className="doctor-desc">Tue–Thu, 11am–2pm</p>
                        <button className="btn btn-ghost btn full">Book</button>
                    </div>
                </div>
            </section>

            {/* Booking */}
            <section className="section section-booking">
                <div className="booking-left">
                    <h2>Book an appointment</h2>
                    <p>Fill the form and the front desk will confirm.</p>
                    <ul className="booking-points">
                        <li>Emergency ready</li>
                        <li>Insurance support</li>
                        <li>SMS reminders</li>
                    </ul>
                </div>
                <form className="booking-form">
                    <label>
                        Full name
                        <input type="text" placeholder="John Doe" />
                    </label>
                    <label>
                        Email
                        <input type="email" placeholder="john@example.com" />
                    </label>
                    <label>
                        Reason
                        <textarea rows={3} placeholder="Consultation..." />
                    </label>
                    <button className="btn btn-primary">Submit</button>
                </form>
            </section>

            {/* Footer */}
            <footer className="footer">
                © {new Date().getFullYear()} Healthy Hospital — All rights reserved.
            </footer>
        </div>
    );
}
