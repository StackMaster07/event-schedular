import { React } from "react"
import { Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper } from "@mui/material"

const EventList = ({ events }) => {

  const formatTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":")
    const date = new Date()
    date.setHours(hours, minutes, seconds)

    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="event table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Event Name</strong></TableCell>
            <TableCell><strong>Start Date</strong></TableCell>
            <TableCell><strong>Start Time</strong></TableCell>
            <TableCell><strong>End Time</strong></TableCell>
            <TableCell><strong>Duration</strong></TableCell>
            <TableCell><strong>Repeat Days</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.start_date}</TableCell>
              <TableCell>{formatTime(event.start_time)}</TableCell>
              <TableCell>{formatTime(event.end_time)}</TableCell>
              <TableCell>{event.duration}</TableCell>
              <TableCell>{event.repeat_days ? event.repeat_days : "Once"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EventList
