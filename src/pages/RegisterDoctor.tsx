import { useState } from "react";

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
      experience: Number(experience), // convert to number
      availableFrom,
      availableTo,
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/doctors/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        })

      if (response.ok) {
        const savedDoctor = await response.json();
        console.log("Saved doctor:", savedDoctor);

        alert("Doctor registered successfully!");
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
    <div>
      <h2>Doctor Registration</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Experience (years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />

        <label>
          Available From:
          <input
            type="time"
            value={availableFrom}
            onChange={(e) => setAvailableFrom(e.target.value)}
          />
        </label>

        <label>
          Available To:
          <input
            type="time"
            value={availableTo}
            onChange={(e) => setAvailableTo(e.target.value)}
          />
        </label>

        <button type="submit">Register Doctor</button>
      </form>
    </div>
  );
}
