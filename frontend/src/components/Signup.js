import React from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { TextField, Button, Typography, Paper, Box, Grid2 } from "@mui/material"
import { postRequest } from "../services/api"

const SignupPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      await postRequest("accounts/signup/", data)
      alert("Signup successful! You can now log in.")
      navigate("/")
    } catch (error) {
      alert("Signup failed: " + error.message)
    }
  }

  return (
    <Grid2 container justifyContent="center" alignItems="center" style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Grid2 item xs={11} sm={8} md={5} lg={4}>
        <Paper elevation={6} style={{ padding: "2rem" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: "1.5rem" }}>
              Sign Up
            </Button>
          </Box>
          <Typography variant="body2" align="center" style={{ marginTop: "1rem" }}>
            Already have an account? <a href="/">Login</a>
          </Typography>
        </Paper>
      </Grid2>
    </Grid2>
  )
}

export default SignupPage
