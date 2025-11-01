import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

export default function BookAppointment() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [name, setName] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [description, setDescription] = useState("");
  const [emergency, setEmergency] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState<string>("");

  // load doctors on mount
  useEffect(() => {
    async function loadDoctors() {
      const res = await fetch("http://localhost:4000/api/doctors");
      const data = await res.json();
      setDoctors(data);
    }
    loadDoctors();
  }, []);

  // load slots when doctor + date selected
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

    await fetch("http://localhost:4000/api/patients/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    alert("Appointment booked successfully!");

    // refresh slots so the booked one is disabled
    if (doctorId && date) {
      const res2 = await fetch(
          `http://localhost:4000/api/doctors/${doctorId}/slots?date=${date}`
      );
      const data2 = await res2.json();
      setSlots(data2);
    }

    // reset form
    setName("");
    setDescription("");
    setEmergency(false);
    setTime("");
    setDate("");
  }

  return (
      <div className="home-shell">
        <NavBar />

        <section className="section section-booking">
          {/* LEFT INFO */}
          <div className="booking-left">
            <h2>Patient Appointment Booking</h2>
            <p>
              Choose doctor, date and an available slot. Emergency patients are
              prioritized.
            </p>
            <ul className="booking-points">
              <li>Live doctor availability</li>
              <li>Automatic slot disabling</li>
              <li>Instant confirmation</li>
            </ul>
          </div>

          {/* FORM */}
          <form className="booking-form" onSubmit={handleSubmit}>
            <label>
              Patient Name
              <input
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
              />
            </label>

            <label>
              Select Doctor
              <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  required
              >
                <option value="">Select doctor</option>
                {doctors.map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.name}{" "}
                      {doc.specialization ? `(${doc.specialization})` : ""}
                    </option>
                ))}
              </select>
            </label>

            <label>
              Appointment Date
              <DatePicker
                  selected={date ? new Date(date) : null}
                  onChange={(d: Date | null) =>
                      setDate(d ? d.toISOString().split("T")[0] : "")
                  }
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  placeholderText="Select appointment date"
                  className="date-input"
              />
            </label>

            <label>
              Time Slot
              <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  disabled={!slots.length}
              >
                <option value="">
                  {slots.length
                      ? "Select time slot"
                      : "Select doctor & date first"}
                </option>
                {slots.map((slot) => (
                    <option
                        key={slot.time}
                        value={slot.time}
                        disabled={slot.isBooked}
                    >
                      {slot.time} {slot.isBooked ? "(Booked)" : "(Available)"}
                    </option>
                ))}
              </select>
            </label>

            <label>
              Describe the issue
              <textarea
                  placeholder="Short description of symptoms or reason for visit…"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
              />
            </label>

            <label className="inline-checkbox">
              <input
                  type="checkbox"
                  checked={emergency}
                  onChange={(e) => setEmergency(e.target.checked)}
              />
              Emergency case
            </label>

            <button className="btn btn-primary" type="submit">
              Book Appointment
            </button>
          </form>
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Healthy Hospital — All rights reserved.
        </footer>
      </div>
  );
}
