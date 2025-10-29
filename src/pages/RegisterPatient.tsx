import { useEffect, useState } from "react"

type Doctor = {
  id: string
  name: string
  specialization?: string
}

export default function RegisterPatient() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [name, setName] = useState("")
  const [doctorId, setDoctorId] = useState("")
  const [description, setDescription] = useState("")
  const [emergency, setEmergency] = useState(false)
  const [time, setTime] = useState("")

  useEffect(() => {
    async function loadDoctors() {
      const response = await fetch("http://localhost:5000/api/doctors")
      const data = await response.json()
      setDoctors(data)
    }
    loadDoctors()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData = {
      name,
      doctorId,
      description,
      emergency,
      time,
    }

    await fetch("http://localhost:5000/api/patients/book", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(formData)
    })

    alert("Appointment booked!")
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
          {doctors.map(doc => (
            <option key={doc.id} value={doc.id}>{doc.name}</option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />

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
  )
}
