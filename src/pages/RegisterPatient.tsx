import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // your base styles (home-shell, section, booking-form, etc.)
import NavBar from "../components/NavBar";

type Doctor = {
  _id: string;
  name: string;
  specialization?: string;
};

type Slot = {
  time: string;
  isBooked: boolean;
};

export default function RegisterPatient() {
  const navigate = useNavigate(); // ✅ Must be inside the component

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [name, setName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [description, setDescription] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState<string>("");

  // Load doctors on mount
  useEffect(() => {
    async function loadDoctors() {
      const res = await fetch("http://localhost:4000/api/doctors");
      const data = await res.json();
      setDoctors(data);
    }
    loadDoctors();
  }, []);

  // Load slots when doctor or date changes
  useEffect(() => {
    if (!doctorId || !date) return;
    async function loadSlots() {
      const res = await fetch(
        `http://localhost:4000/api/doctors/${doctorId}/slots?date=${date}`
      );
      const data = await res.json();
      setSlots(data);
    }
    loadSlots();
  }, [doctorId, date]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = {
      name,
      doctorId,
      description,
      emergency,
      time,
      date,
    };

    const res = await fetch("http://localhost:4000/api/patients/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Failed to book appointment");
      return;
    }

    const data = await res.json(); // ✅ The created patient

    // Redirect to appointment confirmation page
    navigate(`/appointment/${data._id}`);

    // Optional: reset form fields
    setName("");
    setDoctorId("");
    setDescription("");
    setEmergency(false);
    setTime("");
    setDate("");
    setSlots([]);
  }

  return (
    <div>
      <h2>Patient Appointment Booking</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name}
            </option>
          ))}
        </select>

        <label>
          Appointment Date:
          <DatePicker
            selected={date ? new Date(date) : null}
            onChange={(d: Date | null) =>
              setDate(d ? d.toISOString().split("T")[0] : "")
            }
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            placeholderText="Select appointment date"
          />
        </label>

        {/* Time slot selector */}
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        >
          <option value="">Select Time Slot</option>
          {slots.map((slot) => (
            <option
              key={slot.time}
              value={slot.time}
              style={{ color: slot.isBooked ? "red" : "green" }}
              disabled={slot.isBooked}
            >
              {slot.time} {slot.isBooked ? "(Booked)" : "(Available)"}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Describe the issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={emergency}
            onChange={(e) => setEmergency(e.target.checked)}
          />
          Emergency
        </label>

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}
