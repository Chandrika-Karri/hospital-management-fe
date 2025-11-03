import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "./Home.css"; // 👈 reuse existing styles

type Doctor = {
  _id: string;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  experience: number;
  workStart: string;
  workEnd: string;
};

export default function Contact() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/doctors")
        .then((res) => res.json())
        .then((data) => {
          setDoctors(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching doctors:", err);
          setLoading(false);
        });
  }, []);

  // dynamically get doctor image
  const getDoctorImage = (name: string) => {
    try {
      const formattedName = name.replace(/\s+/g, "");
      return new URL(`../assets/${formattedName}.jpg`, import.meta.url).href;
    } catch {
      return "https://via.placeholder.com/150";
    }
  };

  return (
      <div className="home-shell">
        {/* top navigation */}
        <NavBar />

        {/* HERO section — reuse hero-neon-bg */}
        <section className="hero-neon-bg">
          <div className="hero-neon-container">
            <div className="hero-orb orb-1"></div>
            <div className="hero-orb orb-2"></div>
            <div className="hero-orb orb-3"></div>

            <div className="hero-neon-left">
              <div className="hero-tag">
                <span className="status-dot"></span> ● Get in touch
              </div>
              <h1 className="hero-title">Healthify General Hospital</h1>
              <p className="hero-subtitle">
                Caring for you and your loved ones since 1998
              </p>
              <p className="hero-text">
                We believe every patient deserves exceptional care — reach out to
                us anytime.
              </p>

              <div className="hero-actions">
                <a href="mailto:info@healthifyhospital.com" className="btn btn-neon">
                  ✉️ Email Us
                </a>
                <a
                    href="https://www.google.com/maps?q=1234+Wellness+Avenue,+T-Centralen,+Stockholm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-glass"
                >
                  📍 Find Us
                </a>
              </div>
            </div>

            <div className="hero-neon-right">
              <div className="glass-panel glass-panel--tall">
                <h4>Contact Information</h4>
                <ul className="about-points">
                  <li>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:info@healthifyhospital.com">
                      info@healthifyhospital.com
                    </a>
                  </li>
                  <li>
                    <strong>Phone:</strong>{" "}
                    <a href="tel:+46728456789">+46 72 845 6789</a>
                  </li>
                  <li>
                    <strong>Address:</strong> 1234 Wellness Avenue, Stockholm
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DOCTORS SECTION */}
        <section className="section">
          <div className="section-head">
            <h2>Our Doctors</h2>
            <p>Meet our experienced healthcare professionals.</p>
          </div>

          {loading ? (
              <p>Loading doctors...</p>
          ) : doctors.length === 0 ? (
              <p>No doctors available.</p>
          ) : (
              <div className="doctor-grid">
                {doctors.map((doc) => (
                    <div key={doc._id} className="doctor-card">
                      <img
                          src={getDoctorImage(doc.name)}
                          alt={doc.name}
                          className="avatar-circle"
                      />
                      <div className="doctor-spec">{doc.specialization}</div>
                      <h3>{doc.name}</h3>
                      <div className="doctor-desc">
                        <p>
                          <strong>Experience:</strong> {doc.experience} years
                        </p>
                        <p>
                          <strong>Hours:</strong> {doc.workStart} - {doc.workEnd}
                        </p>
                        <p>
                          <strong>Email:</strong>{" "}
                          <a href={`mailto:${doc.email}`}>{doc.email}</a>
                        </p>
                        <p>
                          <strong>Phone:</strong>{" "}
                          <a href={`tel:${doc.phone}`}>{doc.phone}</a>
                        </p>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="footer">
          © {new Date().getFullYear()} Healthify General Hospital — All rights reserved.
        </footer>
      </div>
  );
}
