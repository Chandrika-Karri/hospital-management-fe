Hospital Management System
A Hospital Management Web Application designed to simplify the management of hospital operations such as doctor registration, patient appointments, and scheduling.
It allows administrators to register doctors, patients to book appointments, and provides an easy-to-use interface built with React, Node.js,Express and MongoDB.

🚀 Features and CRUD Operations
1.Doctor registration with specialization and available hours (CREATE Operation)
2.Patient appointment booking with date, time slot and emergency availability and also after successful appointment booking the patient has option to change the date and time or cancel the appointment(CREATE, POST, GET, DELETE)
3.In the contact page there is information about hospital like phone number, email,address, and available doctors at the hopital (GET)
4.Real-time synchronization between frontend and backend.
5.Responsive, clean, and modern UI built with React and Global CSS for styling Home and subpages.


📦 Required Node Packages
Frontend
react
react-dom
react-router-dom
react-datepicker
typescript
vite
Backend
express
mongoose
cors
dotenv
nodemon
(These are installed using npm)

🎨 Graphic Profile

| Element             | Description                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Design Style**    | Modern healthcare aesthetic with soft glassmorphism and neon-accented gradients                            |
| **Primary Palette** | `#0f172a` (Midnight Navy), `#0e7490` (Teal Primary), `#f97316` (Accent Orange), `#f8fafc` (Soft White)     |
| **Typography**      | Rounded, clean sans-serif (system default). Emphasis on readable medium weights.                           |
| **Layout System**   | Max-width container (1180px), responsive grid and flex layouts                                             |
| **UI Motif**        | Rounded edges (`--radius-md` / `--radius-lg`), glowing accents, subtle drop shadows, and gradient surfaces |


| Layer             | Color / Effect                                            | Purpose                                     |
| ----------------- | ----------------------------------------------------      | ------------------------------------------- |
| **Background**    | `radial-gradient(circle at 0% 0%, #e0f2fe → #ffffff)`| Gentle medical softness                     |
| **Surface**       | `rgba(248, 250, 252, 0.65)`                            | Frosted glass cards                         |
| **Accent (Neon)** | `#0ea5e9`, `#22d3ee`, `#6366f1`                          | Modern “tech-health” energy                 |
| **Text**          | `#0f172a` (dark), `#94a3b8` (muted secondary)            | High readability on light and dark surfaces |

🌿 Branch Structure
Branch	                                   Purpose
main	                                     Stable production-ready code
feature/appointment-page	                 For patient registration
confirm-booking                            For confirming, changing and cancelling the patient appointment
dev-1                                      Global styling for home and subpages
kanisha-contactpage                        Shows info related to the hospital like email,phone no. and also displays the registered doctors
kanisha-contactpage-v2                     For adding pictures for the registered doctors
 

🗄️ Database Structure
MongoDB Collections
doctors
{
  "_id": "ObjectId",
  "name": "Dr. John Smith",
  "specialization": "Cardiology",
  "email": "john@example.com",
  "phone": "9876543210",
  "experience": 5,
  "availableFrom": "09:00",
  "availableTo": "17:00"
}
patients
{
  "_id": "ObjectId",
  "name": "Alice Johnson",
  "doctorId": "ObjectId",
  "date": "2025-11-05",
  "time": "10:30",
  "description": "Chest pain and fatigue",
  "emergency": false
}

🧩 Upcoming Features
Add admin login for doctor registration form using json web token



🧠 Author & Contributors
Developed by Chandrika, Ashwini, Kanisha, Jannatul 

