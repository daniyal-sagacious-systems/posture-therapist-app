import React from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { createRoot } from 'react-dom/client'
import axios from 'axios';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs'; import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Calender from './../../components/Calendar/Calender'



import "./AppointmentScheduling.css"

// import './index.css'
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

export default class AppointmentSchedule extends React.Component {

  state = {

    weekendsVisible: true,
    currentEvents: [],
    INITIAL_EVENTS: [],
    show: false,
    doctors: [],
    selectedDoctor: null,
    appointmentTitle: '',
    appointmentStartTime: '',
    appointmentEndTime: '',
    appointmentDate: '',
    patients: [],
    selectedPatient: ''

  }

  async componentDidMount() {

    let events = await (await axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/doctortimeslots/')).data

    let scheduledAppointments = await (await axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/scheduledappointments/')).data

    console.log("time of app", events[0].start_time)

    let array1 = events.map((e) => ({ start: new Date(e.start_time), end: new Date(e.end_time), title: e.first_name, id: e.id, color: "green" }))

    let array2 = scheduledAppointments.map((e) => ({ start: e.start_time, end: e.end_time, title: e.patient, color: "purple", id: e.id }))

    this.setState({ INITIAL_EVENTS: array1.concat(array2) })

    let doctors = await (await axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/users/')).data

    this.setState({ doctors: doctors })

    let patients = await (await axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/patients')).data

    this.setState({ patients: patients })

  }



  handleOpen = () => {
    this.setState({ show: true });
  }


  handleClose = () => {
    this.setState({ show: false });
  }


  calendarRef = React.createRef()

  render() {



    return (

      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Appointment Scheduling' }]} />
        </Box>

        <div className='card'>
          <div className='card-body'>

            <Calender />

          </div>

        </div>




      </Container>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>

          {console.log("events", this.state.currentEvents)}

          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    // let title = prompt('Please enter a new title for your event')
    // let doctor = prompt('Please enter the doctor id')
    // let patient = prompt('Please enter the patient id')

    this.setState({ appointmentStartTime: selectInfo.startStr, appointmentEndTime: selectInfo.endStr, appointmentDate: new Date(selectInfo.start) })

    this.handleOpen()

    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    // console.log("date selected", new Date(selectInfo.start))

    // if (true) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     // title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //     // doctor,
    //     // patient,
    //     scheduledAppointment: true
    //   })
    // }

    console.log("events", this.state.currentEvents)

  }

  handleEventClick = (clickInfo) => {

    // if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }

  }

  handleEvents = (events) => {

    this.setState({
      currentEvents: events
    })

  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event) {
  return (

    <li key={event.id}>
      <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
      <i>{event.title}</i>
    </li>

  )
}
