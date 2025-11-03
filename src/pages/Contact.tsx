import { useEffect, useState } from "react";
import "./Contact.css";
import NavBar from "../components/NavBar";

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
    fetch("http://localhost:4000/api/doctors") // backend endpoint
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

  // Function to dynamically get doctor image based on name
  const getDoctorImage = (name: string) => {
    try {
      // Replace spaces and capitalize for consistent naming (e.g., Chandrika.jpg)
      const formattedName = name.replace(/\s+/g, "");
      return new URL(`../assets/${formattedName}.jpg`, import.meta.url).href;
    } catch (e) {
      // fallback to a placeholder image if not found
      return "https://via.placeholder.com/150";
    }
  };

  return (
    
    <div className="hospital-container">
          {/* 10. top nav, reused on all pages */}
                  <NavBar />
      <header className="hospital-header">
        <h1>Healthify General Hospital</h1>
        <p>Caring for you and your loved ones since 1998</p>
      </header>

      <section className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Email</h3>
            <a href="mailto:info@healthifyhospital.com">info@healthifyhospital.com</a>
          </div>
          <div className="contact-card">
            <h3>Phone</h3>
            <a href="tel:+46123456789">+46 72 845 6789</a>
          </div>
          <div className="contact-card">
            <h3>Address</h3>
            <a
              href="https://www.google.com/maps?q=1234+Wellness+Avenue,+T-Centralen,+Stockholm+10001"
              target="_blank"
              rel="noopener noreferrer"
            >
              1234 Wellness Avenue, T-Centralen, Stockholm 10001
            </a>
          </div>
        </div>
      </section>

      <section className="doctors-section">
        <h2>Our Doctors</h2>
        {loading ? (
          <p>Loading doctors...</p>
        ) : doctors.length === 0 ? (
          <p>No doctors available.</p>
        ) : (
          <div className="doctors-grid">
            {doctors.map((doc) => (
              <div key={doc._id} className="doctor-card">
                <img
                  src={getDoctorImage(doc.name)}
                  alt={doc.name}
                  className="doctor-image"
                />
                <h3>{doc.name}</h3>
                <p className="specialty">{doc.specialization}</p>
                <p className="about">
                  <strong>Experience:</strong> {doc.experience} years <br />
                  <strong>Email:</strong> {doc.email} <br />
                  <strong>Phone:</strong> {doc.phone} <br />
                  <strong>Working Hours:</strong> {doc.workStart} - {doc.workEnd}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="hospital-footer">
      <p>&copy; {new Date().getFullYear()} Healthify General Hospital. All rights reserved.</p>
      </footer>
    </div>
  );
}
