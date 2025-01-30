import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Container, Typography } from "@mui/material"
import EventForm from "./components/eventForm"
import EventList from "./components/EventList"
import LoginPage from "./components/Login"
import SignupPage from "./components/Signup"
import { postRequest, getRequest } from "./services/api"
import Toast from "./components/Toast"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"))
  const [events, setEvents] = useState([])
  const [toastOpen, setToastOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState("success")

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
    if (token) {
      loadEvents()
    }
  }, [isLoggedIn])

  const loadEvents = async () => {
    try {

      const data = await getRequest("events/")
      setEvents(data)

    } catch (error) {
      console.error("Failed to load events", error)
    }
  }

  const handleAddEvent = async (event) => {
    const repeatChoices = ['NONE', 'WEEKLY']
    
    if (!repeatChoices.includes(event.repeat)) {
      event.repeat = 'NONE'
    }
    
    try {
      const response = await postRequest("events/", event)
  
      if (response.id) {
        setToastMessage("Your event has been successfully scheduled!")
        setToastType("success")
        loadEvents()
      } else if (response.non_field_errors) {
        setToastMessage(response.non_field_errors[0])
        setToastType("error")
      } else if (response.detail) {
        setToastMessage(response.detail)
        setToastType("error")
      } else {
        setToastMessage("⚠️ Unexpected error occurred.")
        setToastType("error")
      }
    } catch (error) {
      setToastMessage(error.message || "Failed to add event.")
      setToastType("error")
    }
  
    setToastOpen(true)
  }  

  const handleCloseToast = () => {
    setToastOpen(false)
  }

  return (
    <Router>
      <Toast message={toastMessage} open={toastOpen} onClose={handleCloseToast} type={toastType} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/events" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/events" element={isLoggedIn ? (
          <Container sx={{ padding: "30px", backgroundColor: "#f9f9f9", borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
              Event Scheduler
            </Typography>
            <EventForm onSubmit={handleAddEvent} />
            <Typography variant="h6" gutterBottom>
              Scheduled Events
            </Typography>
            <EventList events={events} />
          </Container>
        ) : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
