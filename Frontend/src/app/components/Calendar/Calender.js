import React, { Component } from 'react'
import moment from 'moment'
import axios from 'axios'
import Timeline, { TimelineMarkers, TodayMarker } from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import './style.css'
import itemRender from './itemRender'
import { withStyles } from '@material-ui/core/styles'

import SundaysMarker from './SundaysMarker'
import groups from './groups'
import items from './items'
import keys from './keys'
import AddItemsForm from './AddItemsForm'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Button } from '@mui/material';







import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'
import classNames from 'classnames'
import MenuItem from '@material-ui/core/MenuItem'
import Modal from 'react-responsive-modal'




var momentTZ = require('moment-timezone');



const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: '1rem 5rem',
    [theme.breakpoints.down('sm')]: {
      margin: '1rem 1rem',
    },
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
  mt1: {
    marginTop: '1rem'
  },
  floatingBtn: {
    position: 'absolute',
    right: '2rem',
    bottom: '2rem',
    zIndex: 9
  }
})

class Calender extends Component {
  state = {
    keys,
    groups,
    items,
    y19: new Date('2023/04/12'),
    patients: [],
    refresh: false,



    doctor: '',
    status: '',
    start: '2019-01-01',
    end: '2019-01-01',
    open: false,
    mentorsList: [],
    patients: [],
    patient: '',
    patientName: '',




    selectedSlot: {}







  }



  // addItemHandler = newItems => {
  //   this.setState(state => ({
  //     items: {...state.items, newItems}
  //   }))
  // }



  async componentDidMount() {


    let events = await (await axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/doctortimeslots/')).data

    let scheduledAppointments = await (await axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/scheduledappointments/')).data


    let array1 = events.map((e, i) => ({
      id: i,
      className: "htmlCss",
      start: moment(new Date(e.start_time.split('.')[0])),
      end: moment(new Date(e.end_time.split('.')[0])),
      title: e.first_name,
      group: e.doctor,
      canMove: false,
      canResize: false,
      canChangeGroup: false,
    }))

    let array2 = scheduledAppointments.map((e, i) => ({
      id: array1.length + i,
      className: "confirm",
      start: moment(new Date(e.start_time.split('.')[0])), end: moment(new Date(e.end_time.split('.')[0])),
      title: e.patient,
      group: e.doctor,
      scheduledAppointment: true,
      canMove: false,
      canResize: false,
      canChangeGroup: false
    }))

    this.setState({ items: array1.concat(array2) })


    let doctors = await (await axios.get(process.env.REACT_APP_ORIGIN_URL + 'api/users/')).data

    let doctorsArray = doctors.map((e, i) => ({
      id: e.id,
      title: e.first_name
    }))


    this.setState({ groups: doctorsArray })


    let patients = await (await axios.get('http://192.168.5.21:8081/api/patients')).data

    this.setState({ patients: patients })


  }

  // async componentDidUpdate(prevProps, prevState) {

  //   if (this.state.refresh != prevState.refresh) {


  //     let events = await (await axios.get('http://192.168.5.21:8081/api/doctortimeslots/')).data

  //     let scheduledAppointments = await (await axios.get('http://192.168.5.21:8081/api/scheduledappointments/')).data


  //     let array1 = events.map((e, i) => ({
  //       id: i,
  //       className: "htmlCss",
  //       start: moment(new Date(e.start_time)).add(-4, 'hours'),
  //       end: moment(new Date(e.end_time)).add(-4, 'hours'),
  //       title: e.first_name,
  //       group: e.doctor,
  //       canMove: false,
  //       canResize: false,
  //       canChangeGroup: false,
  //     }))

  //     let array2 = scheduledAppointments.map((e, i) => ({
  //       id: array1.length + i,
  //       className: "confirm",
  //       start: moment(new Date(e.start_time)).add(-4, 'hours'), end: moment(new Date(e.end_time)).add(-4, 'hours'),
  //       title: e.patient,
  //       group: e.doctor,
  //       scheduledAppointment: true,
  //       canMove: false,
  //       canResize: false,
  //       canChangeGroup: false
  //     }))

  //     this.setState({ items: array1.concat(array2) })


  //     let doctors = await (await axios.get('http://192.168.5.21:8081/api/users/')).data

  //     let doctorsArray = doctors.map((e, i) => ({
  //       id: e.id,
  //       title: e.first_name
  //     }))


  //     this.setState({ groups: doctorsArray })
  //   }

  // }





  onOpenModal = () => this.setState({ open: true })

  onCloseModal = () => this.setState({ open: false })

  handleChange = prop => event => this.setState({ [prop]: event.target.value })





  toTimestamp = strDate => {
    const d = new Date(strDate)
    return (Date.parse(d)) / 1000
  }


  timzoneCorrection = date => {

    let x = new Date(date);
    let hoursDiff = x.getHours() - x.getTimezoneOffset() / 60;
    let minutesDiff = (x.getHours() - x.getTimezoneOffset()) % 60;
    x.setHours(hoursDiff);
    x.setMinutes(minutesDiff);

    return x
  }

  addItemHandler = item => {


    console.log("timezone corrected time", moment.utc(item.start).tz("Asia/Taipei").format())

    if (item.doctor == '' || item.patient == '' || item.end <= item.start) {
      NotificationManager.error("Please input the required fields correctly");
      return;
    }

    let doctorAvailable = false

    this.state.items.filter((i) => i.group == item.doctor).forEach((it) => {

      if (new Date(item.start) >= new Date(it.start) && new Date(item.end) <= new Date(it.end)) {

        let alreadyScheduledAppointment = false

        this.state.items.filter((i) => i.group == item.doctor && i.scheduledAppointment).forEach((ff) => {

          if (new Date(item.start) >= new Date(ff.start) && new Date(item.start) <= new Date(ff.end) ||

            new Date(item.end) <= new Date(ff.end) && new Date(item.end) >= new Date(ff.start)) {

            alreadyScheduledAppointment = true


          } else {
            console.log("inside else")
          }
        })

        if (!alreadyScheduledAppointment) {

          const newItem = {
            id: 1 + this.state.items.reduce((max, value) => value.id > max ? value.id : max, 0),
            group: item.doctor,
            title: item.patientName,
            patient: item.patient,
            className: "confirm",
            // start: JSON.stringify(this.timzoneCorrection( new Date(item.start))),
            // start: momentTZ.tz(item.start, "Karachi/Asia"),
            // end: momentTZ.tz(item.end, "Karachi/Asia"),
            start: moment(item.start),
            end: moment(item.end),
            canMove: false,
            canResize: false,
            canChangeGroup: false,
            scheduledAppointment: true,
            currentlyAdded: true,

          }

          this.setState(state => ({
            items: [...state.items, newItem]
          }))

          NotificationManager.success("Successfully scheduled an appointment");

          console.log("new state", this.state.items)

          return;
        }

        if (alreadyScheduledAppointment) {

          NotificationManager.error("Doctor has already an appointment");

        }

        doctorAvailable = true



      }
      else {
        // console.log("it is outside the doctor slots")
      }

    })

    if (!doctorAvailable) {
      NotificationManager.error("No Doctor available at this time slot");
    }


  }
  handleItemMove = (itemId, dragTime, newGroupOrder) => {
    // const {items, groups} = this.state

    // const group = groups[newGroupOrder]

    // this.setState({
    //   items: items.map(item =>
    //     item.id === itemId
    //       ? Object.assign({}, item, {
    //         start: dragTime,
    //         end: dragTime + (item.end - item.start),
    //         group: group.id
    //       })
    //       : item
    //   )
    // })

  }

  handleItemResize = (itemId, time, edge) => {
    const { items } = this.state

    this.setState({
      items: items.map(item =>
        item.id === itemId
          ? Object.assign({}, item, {
            start: edge === 'left' ? time : item.start,
            end: edge === 'left' ? item.end : time
          })
          : item
      )
    })

  }

  render() {
    const { keys, groups, items, y19 } = this.state
    const { classes } = this.props

    return (

      <>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h5>Appointment scheduling</h5>

          <Button color="primary" variant="contained" type="submit" onClick={async () => {

            try {



              await axios.post(`${process.env.REACT_APP_ORIGIN_URL}api/scheduledappointments`,
                this.state.items.filter((f) => f.scheduledAppointment && f.currentlyAdded).map(se => ({
                  start_time: moment.utc(se.start).tz("Asia/Taipei").format(), end_time: moment.utc(se.end).tz("Asia/Taipei").format(), doctor: se.group,
                  patient: se.patient, title: '', date: "2023-03-01T00:00:00.000Z"
                }))
              )
              NotificationManager.success("Successfully updated appointment scheduling");
            }
            catch {
              NotificationManager.error("Nothing to update");
            }
          }}
          >Update</Button></div>


        <br />

        <Timeline
          style={{ width: "90vw" }}
          keys={keys}
          groups={groups}
          onItemClick={(e) => {
            console.log("item click", e)
            // this.setState({ refresh: !this.state.refresh })


            console.log("object to add", items)

            this.setState({ selectedSlot: { id: items[e].group, name: items[e].title, start: items[e].start, end: items[e].end } })

            this.setState({ open: true })


          }}
          // onItemSelect={ this.setState({open:true})}

          // onCanvasClick={(e)=>{console.log("canvas click", e)}}


          items={items}
          // rightSidebarWidth={50}
          // rightSidebarContent="Skills"

          defaultTimeStart={moment().add(-1, 'day')}
          defaultTimeEnd={moment().add(7, 'day')}
          sidebarContent="Doctors"
          lineHeight={50}
          itemRenderer={itemRender}
          // defaultTimeStart={moment(y19).add(0, 'day')}
          // defaultTimeEnd={moment(y19).add(1, 'day')}
          maxZoom={1.5 * 365.24 * 86400 * 1000}
          minZoom={1.24 * 86400 * 1000 * 7 * 3}
          fullUpdate
          itemTouchSendsClick={false}
          stackItems
          itemHeightRatio={0.75}
          showCursorLine
          canMove={false}
          canResize={'both'}
          onItemMove={this.handleItemMove}
          onItemResize={this.handleItemResize}
        >
          {/* <TimelineMarkers>
              <TodayMarker>
                {({ styles, date }) => <div style={{ ...styles, width: '0.5rem', backgroundColor: 'rgba(255,0,0,0.5)' }} />}
              </TodayMarker>
              <SundaysMarker />
            </TimelineMarkers> */}
        </Timeline>
        <AddItemsForm onAddItem={this.addItemHandler} />
        <NotificationContainer />



        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <div
            className={classes.root}
          >
            <Grid container spacing={24}>
              <Grid item xs={12}>


                <h4>Schedule an appointment</h4>

                <form onSubmit={this.formSubmitHandler}>
                  {/*Mentors list*/}

                  <span style={{ fontWeight: 600 }}>Doctor:</span> <span> {this.state.selectedSlot.name}</span>
                  <br />
                  <span style={{ fontWeight: 600 }}>Date:</span> <span> {this.state.selectedSlot.start && this.state.selectedSlot.start.utc().tz("Asia/Karachi").format('LL')}</span>

                  <br />
                  <span style={{ fontWeight: 600 }}>Availability time:</span> <span> {this.state.selectedSlot.start && this.state.selectedSlot.start.utc().tz("Asia/Karachi").format('LT')}</span>
                  <span style={{ fontWeight: 600 }}> to </span> <span> {this.state.selectedSlot.end && this.state.selectedSlot.end.utc().tz("Asia/Karachi").format('LT')}</span>
                  {/* <TextField
                    select
                    label="Chose Doctor"
                    className={classNames(classes.margin, classes.textField)}
                    value={this.state.doctor}
                    onChange={this.handleChange('doctor')}
                    fullWidth={true}
                  >
                    {this.state.mentorsList.map(option => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.title}
                      </MenuItem>
                    ))}
                  </TextField> */}
                  <br />

                  <TextField
                    select
                    label="Chose Patient"
                    className={classNames(classes.margin, classes.textField)}
                    wid
                    value={this.state.patient}
                    // onChange={this.handleChange('patientName')}

                    onChange={
                      (e) => {
                        this.setState({ patientName: e.currentTarget.innerText })

                        console.log("e.target", e.currentTarget.innerText)
                        this.setState({ patient: e.target.value });

                      }
                    }

                    // onClick={(e)=>{console.log("click",e.currentTarget.innerText)}}
                    fullWidth={true}
                  >
                    {this.state.patients.map(patient => (
                      <MenuItem key={patient.id} name={patient.id}
                        value={patient.id}
                      // value={{patientId:patient.id, patientName: patient.first_name}}

                      >
                        {patient.first_name}
                      </MenuItem>
                    ))}
                  </TextField>



                  <br />

                  <br />



                  {/*status*/}

                  {/* <TextField
                    id="standard-name"
                    label="status"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('status')}
                    margin="normal"
                    fullWidth={true}
                  /> */}
                  {/*Date*/}
                  <Grid container spacing={24}>
                    {/*start*/}
                    <Grid item md={8}>
                      {/* <TextField
                        id="date"
                        label="Start"
                        // <input type="datetime-local" id="birthdaytime" name="birthdaytime"></input>
                        type="time"
                        min="00:00:00" 
                        max="01:30:00"
                        defaultValue={this.state.start}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                     
                          // min:"00:00:00", 
                          max:"01:30:00",
                     
                          min: new Date().toISOString().slice(0, 16)
                        }}   
                        onChange={this.handleChange('start')}
                        fullWidth={true}
                      /> */}

                     Start time: &nbsp; <input type="time" defaultValue={this.state.selectedSlot.start}  onChange={(e)=>{this.setState({start:e.target.value})}} />



                    </Grid>
                    {/*end*/}





                    <Grid item md={8}>
                      {/* <TextField
                        id="date"
                        label="End"
                        type="time"
                        // inputProps={{
                        //   min: new Date().toISOString().slice(0, 16)
                        // }}             
                        defaultValue={this.state.end}
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={this.handleChange('end')}
                        fullWidth={true}
                      /> */}

End time: &nbsp; &nbsp; <input type="time" defaultValue={this.state.selectedSlot.end} onChange={(e)=>{this.setState({end:e.target.value})}}/>





                    </Grid>
                  </Grid>

                  <br />

                  {/*Submit*/}
                  <Button onClick={() => {

                    this.onCloseModal()

                    console.log("itemAdded", this.state)

                    const addAppointment = {
                      doctor: this.state.selectedSlot.id,
                      patient: this.state.patient,
                                       
                      start: this.state.start,
                      end: this.state.end,
                   
                      patientName: this.state.patientName
                    }

                    console.log("itemAddedForaddAppointment", addAppointment)


                    this.addItemHandler(addAppointment)

                    // return this.props.onAddItem(this.state)

                  }}
                    //  className={classes.mt1} 
                    variant="contained" color="primary">
                    <AddIcon /> add
                  </Button>
                </form>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </>
    )
  }
}


export default withStyles(styles)(Calender)