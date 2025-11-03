import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

  useEffect(() => {
    async function fetchAppointment() {
      const res = await fetch(`http://localhost:4000/api/patients/${id}`);
      const data = await res.json();
      setAppointment(data);
    }
    fetchAppointment();
  }, [id]);

  const handleConfirm = async () => {
    await fetch(`http://localhost:4000/api/patients/${id}/confirm`, { method: "PUT" });
    alert("Appointment confirmed!");
    navigate("/"); // back to home
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
      body: JSON.stringify({ newDate, newTime })
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

  if (!appointment) return <div>Loading...</div>;

  return (
    <div>
      <h2>Appointment Booked Successfully!</h2>
      <p><strong>Name:</strong> {appointment.name}</p>
      <p><strong>Doctor:</strong> {appointment.doctorId.name}</p>
      <p><strong>Date:</strong> {appointment.date}</p>
      <p><strong>Time:</strong> {appointment.time}</p>
      <p><strong>Status:</strong> {appointment.status}</p>
      <p><strong>Description:</strong> {appointment.description}</p>
      <p><strong>Emergency:</strong> {appointment.emergency ? "Yes" : "No"}</p>

      <button onClick={handleConfirm}>Confirm</button>
      <button onClick={handleChangeTime}>Change Time</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}
