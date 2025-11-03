import "./Home.css"; //base css file
import { useState } from "react";
import NavBar from "../components/NavBar.tsx";

export default function RegisterDoctor() {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableTo, setAvailableTo] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = {
      name,
      specialization,
      email,
      phone,
      experience: Number(experience),
      availableFrom,
      availableTo,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/doctors/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })

      if (response.ok) {
        const savedDoctor = await response.json();
        console.log("Saved doctor:", savedDoctor);
        alert("Doctor registered successfully!");

        // Reset form
        setName("");
        setSpecialization("");
        setEmail("");
        setPhone("");
        setExperience("");
        setAvailableFrom("");
        setAvailableTo("");
      } else {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        alert("Error registering doctor: " + (errorData.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Network or server error:", err);
      alert("Error connecting to server!");
    }
  }

  return (
      <div className="home-shell">
        <NavBar/>

        <section className="section section-booking">
          <div className="booking-left">
            <h2>Register a Doctor</h2>
            <p>Fill out the form below to add a new doctor to your hospital database.</p>
            <ul className="booking-points">
              <li>Verified email contact</li>
              <li>Schedule setup</li>
              <li>Easy editing later</li>
            </ul>
          </div>

          <form className="booking-form" onSubmit={handleSubmit}>
            <label>
              Full Name
              <input
                  type="text"
                  placeholder="Dr. Sarah Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
              />
            </label>

            <label>
              Specialization
              <input
                  type="text"
                  placeholder="Cardiology, Pediatrics..."
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  required
              />
            </label>

            <label>
              Email
              <input
                  type="email"
                  placeholder="doctor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </label>

            <label>
              Phone Number
              <input
                  type="tel"
                  placeholder="123-456-7890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
              />
            </label>

            <label>
              Experience (years)
              <input
                  type="number"
                  placeholder="5"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
              />
            </label>

            <div className="availability-row">
              <label>
                Available From
                <input
                    type="time"
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                />
              </label>

              <label>
                Available To
                <input
                    type="time"
                    value={availableTo}
                    onChange={(e) => setAvailableTo(e.target.value)}
                />
              </label>
            </div>

            <button className="btn btn-primary" type="submit">
              Register Doctor
            </button>
          </form>
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Healthy Hospital — All rights reserved.
        </footer>
      </div>
  );
}
