import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import RegisterPatient from "./pages/RegisterPatient"

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/register-patient">Patient Registration</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
      </Routes>
    </div>
  )
}
