import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./Home.css";

type Doctor = { _id: string; name: string; specialization?: string };
type Slot = { time: string; isBooked: boolean };

export default function RegisterPatient() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [name, setName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [description, setDescription] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    async function loadDoctors() {
      try {
        const res = await fetch("http://localhost:4000/api/doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Failed to fetch doctors:", err);
      }
    }
    loadDoctors();
  }, []);

  useEffect(() => {
    if (!doctorId || !date) return;
    async function loadSlots() {
      try {
        const res = await fetch(
          `http://localhost:4000/api/doctors/${doctorId}/slots?date=${date}`
        );
        const data = await res.json();
        setSlots(data);
      } catch (err) {
        console.error("Failed to fetch slots:", err);
      }
    }
    loadSlots();
  }, [doctorId, date]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/patients/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, doctorId, description, emergency, time, date }),
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Failed to book appointment");
        return;
      }
      const data = await res.json();
      navigate(`/appointment/${data._id}`);
      setName(""); setDoctorId(""); setDescription(""); setEmergency(false); setTime(""); setDate(""); setSlots([]);
    } catch (err) {
      console.error(err);
      alert("Network error. Try again.");
    }
  }

  return (
    <div className="home-shell">
      <NavBar />
      <section className="section section-booking">
        <div className="booking-left">
          <h2>Patient Appointment Booking</h2>
          <p>Send a request and our staff will assign the right doctor.</p>
        </div>
        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Patient Name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Doctor
            <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name} {doc.specialization ? `(${doc.specialization})` : ""}
                </option>
              ))}
            </select>
          </label>
          <label>
            Appointment Date
            <DatePicker
              selected={date ? new Date(date) : null}
              onChange={(d) => setDate(d ? d.toISOString().split("T")[0] : "")}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              placeholderText="Select appointment date"
            />
          </label>
          <label>
            Time Slot
            <select value={time} onChange={(e) => setTime(e.target.value)} required>
              <option value="">Select Time Slot</option>
              {slots.map((slot) => (
                <option key={slot.time} value={slot.time} disabled={slot.isBooked} style={{color: slot.isBooked ? "red" : "green"}}>
                  {slot.time} {slot.isBooked ? "(Booked)" : "(Available)"}
                </option>
              ))}
            </select>
          </label>
          <label>
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            <input type="checkbox" checked={emergency} onChange={(e) => setEmergency(e.target.checked)} /> Emergency
          </label>
          <button className="btn btn-primary" type="submit">Book Appointment</button>
        </form>
      </section>
    </div>
  );
}
