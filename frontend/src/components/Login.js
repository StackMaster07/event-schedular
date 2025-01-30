import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { TextField, Button, Grid2, Typography, Paper, Box } from "@mui/material"
import { postRequest } from "../services/api"

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await postRequest("accounts/token/", data)
      if (res.access) {
        setIsLoggedIn(true)
        localStorage.setItem("token", res.access)
        alert("Login successful!")
        navigate("/events")
      }
    } catch (error) {
      alert("Login failed: " + error.message)
    }
  }

  return (
    <Grid2 container justifyContent="center" alignItems="center" style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Grid2 item xs={11} sm={8} md={5} lg={4}>
        <Paper elevation={6} style={{ padding: "2rem" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "1.5rem" }}>
              Login
            </Button>
          </Box>
          <Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
            Don't have an account? <a href="/signup">Sign Up</a>
          </Typography>
        </Paper>
      </Grid2>
    </Grid2>
  )
}

export default LoginPage
