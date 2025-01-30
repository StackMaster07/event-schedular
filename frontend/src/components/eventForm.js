import React, { useState } from "react"
import {
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Stack,
  FormHelperText,
  Typography,
} from "@mui/material"

const EventForm = ({ onSubmit }) => {
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  })
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    const selectedDays = Object.keys(days).filter((day) => days[day])

    const eventData = {
      name,
      start_date: date,
      start_time: startTime,
      end_time: endTime,
      repeat: selectedDays.length > 0 ? "REPEATED" : "NONE",
      repeat_days: selectedDays.join(", "),
    }

    onSubmit(eventData)

    setName("")
    setDate("")
    setStartTime("")
    setEndTime("")
    setDays({
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    })
    setError("")
  }

  const selectedDays = Object.keys(days).filter((day) => days[day])

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            required
            fullWidth
          />
          <TextField
            label="Start Time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            required
            fullWidth
          />
          <TextField
            label="End Time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
            required
            fullWidth
          />
        </Stack>

        <FormGroup>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "center",
              padding: "10px 0",
              flexWrap: "wrap",
            }}
          >
            {Object.keys(days).map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={days[day]}
                    onChange={(e) =>
                      setDays({ ...days, [day]: e.target.checked })
                    }
                  />
                }
                label={day}
              />
            ))}
          </Stack>
        </FormGroup>

        {selectedDays.length > 0 && (
          <Typography variant="body1" color="textSecondary">
            Weekly: Repeat every {selectedDays.join(", ")}
          </Typography>
        )}

        {error && <FormHelperText error>{error}</FormHelperText>}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Stack>
    </form>
  )
}

export default EventForm
