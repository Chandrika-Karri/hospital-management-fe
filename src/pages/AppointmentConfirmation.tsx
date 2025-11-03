import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./Home.css"; // reuses your old/light styles (home-shell, section-booking, booking-form, btns, etc.)

type Patient = {
  _id: string;
  name: string;
  doctorId: { name: string };
  date: string;
  time: string;
  description?: string;
  status: string;
  emergency: boolean;
};

export default function AppointmentConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const res = await fetch(`http://localhost:4000/api/patients/${id}`);
        const data = await res.json();
        setAppointment(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchAppointment();
  }, [id]);

  const handleConfirm = async () => {
    await fetch(`http://localhost:4000/api/patients/${id}/confirm`, { method: "PUT" });
    alert("Appointment confirmed!");
    navigate("/");
  };

  const handleCancel = async () => {
    await fetch(`http://localhost:4000/api/patients/cancel/${id}`, { method: "DELETE" });
    alert("Appointment cancelled!");
    navigate("/");
  };

  const handleChangeTime = async () => {
    const newDate = prompt("Enter new date (yyyy-mm-dd):", appointment?.date);
    const newTime = prompt("Enter new time (HH:mm):", appointment?.time);
    if (!newDate || !newTime) return;

    const res = await fetch(`http://localhost:4000/api/patients/${id}/change-time`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newDate, newTime }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.message);
      return;
    }

    const updated = await res.json();
    setAppointment(updated);
    alert("Appointment time updated!");
  };

  // Loading state (old style)
  if (loading) {
    return (
        <div className="home-shell">
          <NavBar />
          <section className="section section-booking">
            <div className="booking-left">
              <h2>Loading appointment…</h2>
              <p>Please wait a moment while we fetch your booking.</p>
            </div>
            <div className="booking-form">
              <p>Fetching data…</p>
            </div>
          </section>
        </div>
    );
  }

  // Not found (old style)
  if (!appointment) {
    return (
        <div className="home-shell">
          <NavBar />
          <section className="section section-booking">
            <div className="booking-left">
              <h2>No appointment found</h2>
              <p>The booking you’re looking for could not be located.</p>
            </div>
            <div className="booking-form">
              <button className="btn btn-outline" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          </section>
        </div>
    );
  }

  // Main (old/light layout)
  return (
      <div className="home-shell">
        <NavBar />

        <section className="section section-booking">
          {/* Left column text */}
          <div className="booking-left">
            <h2>Appointment Confirmation</h2>
            <p>Review your details below, then confirm or adjust the booking.</p>

            <ul className="booking-points" style={{ marginTop: ".75rem" }}>
              <li>Change the time if the selected slot no longer works</li>
              <li>Emergency bookings are prioritized by our staff</li>
            </ul>
          </div>

          {/* Right column card */}
          <div className="booking-form">
            <div>
              <strong>Patient</strong>
              <div className="form-msg">{appointment.name}</div>
            </div>

            <div>
              <strong>Doctor</strong>
              <div className="form-msg">{appointment.doctorId?.name}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem" }}>
              <label>
                <span>Date</span>
                <input className="input" value={appointment.date} readOnly />
              </label>
              <label>
                <span>Time</span>
                <input className="input" value={appointment.time} readOnly />
              </label>
            </div>

            <div>
              <strong>Status</strong>
              <div className="form-msg">{appointment.status}</div>
            </div>

            <div>
              <strong>Emergency</strong>
              <div className="form-msg">{appointment.emergency ? "Yes" : "No"}</div>
            </div>

            {appointment.description && (
                <label>
                  <span>Notes</span>
                  <textarea className="input" rows={3} value={appointment.description} readOnly />
                </label>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: ".6rem", marginTop: ".6rem", flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={handleConfirm}>
                Confirm
              </button>
              <button className="btn btn-outline" onClick={handleChangeTime}>
                Change Time
              </button>
              <button className="btn btn-ghost" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </section>
      </div>
  );
}
