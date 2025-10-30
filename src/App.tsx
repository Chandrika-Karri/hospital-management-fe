import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import RegisterPatient from "./pages/RegisterPatient"
import RegisterDoctor from "./pages/RegisterDoctor"

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/register-patient">Patient Registration</Link> |{" "}
        <Link to="/register-doctor">Doctor Registration</Link> 
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/register-doctor" element={<RegisterDoctor />} />
      </Routes>
    </div>
  )
}
