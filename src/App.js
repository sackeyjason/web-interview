import React, { Component } from 'react'

import logo from './logo.png'
import { API_ENDPOINT } from './config'

import './App.scss'
import UserHeader from './components/UserHeader'
import SelectorButton from './components/SelectorButton'
import FormError from './components/FormError'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      selectedConsultantType: '',
      selectedAppointmentType: '',
      availableSlots: [],
      selectedAppointment: {},
    }
  }

  componentDidMount() {
    fetch(`${API_ENDPOINT}/availableSlots`)
      .then(res => res.json())
      .then(json => {
        this.setState({ availableSlots: json })
      })
      .catch(this.handleError)

    fetch(`${API_ENDPOINT}/users/${this.state.userId}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ userData: json })
      })
      .catch(this.handleError)
  }

  handleError(error) {
    console.log(error)
  }

  bookAppointment() {
    let info = {
      notes: this.state.noteText,
      userId: this.state.userId,
      dateTime: this.state.selectedAppointment.time,
      type: {
        gp: 'GP appointment',
        specialist: 'Specialist appointment',
        physio: 'Physio appointment',
        therapist: 'Therapist appointment',
      }[this.state.selectedConsultantType],
    }
    this.setState({ error: '' })

    // Validate appointment info
    if (!info.dateTime) {
      this.setState({ error: 'You must select an appointment time.' })
      return
    }

    let data = new FormData()
    data.append('json', JSON.stringify(info))

    fetch(`${API_ENDPOINT}/appointments`, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(info),
    }).then(() => {
      window.alert('Appointment booking successful.')
      this.setState({
        selectedAppointment: {},
        selectedConsultantType: '',
        selectedAppointmentType: '',
      })
    })
  }

  render() {
    // calculate matching slots
    let slots = this.state.availableSlots.filter(
      slot =>
        slot.consultantType.indexOf(this.state.selectedConsultantType) >= 0
    )
    let types = []
    if (this.state.selectedAppointment.appointmentType) {
      types = this.state.selectedAppointment.appointmentType.sort().reverse()
    }

    return (
      <div className="app" style={{ minWidth: 320 }}>
        <div className="app-header">
          <div
            style={{
              maxWidth: 600,
              margin: '0 auto',
              padding: '0 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                transform: 'rotate(90deg)',
              }}
            >
              |||
            </span>
            <img src={logo} className="app-logo" alt="Babylon Health" />
            <span
              style={{
                color: 'white',
                background: 'gray',
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'block',
                textAlign: 'center',
                lineHeight: '48px',
              }}
            >
              NU
            </span>
          </div>
        </div>
        <div
          style={{
            maxWidth: 600,
            margin: '24px auto',
            padding: '0 1rem',
          }}
        >
          <h1 className="h6">New appointment</h1>
          <UserHeader user={this.state.userData} />
          <h2>Consultant type</h2>
          {[
            { value: 'gp', label: 'GP' },
            { value: 'therapist', label: 'Therapist' },
            { value: 'physio', label: 'Physio' },
            { value: 'specialist', label: 'Specialist' },
          ].map(consultant => (
            <SelectorButton
              key={consultant.value}
              active={consultant.value === this.state.selectedConsultantType}
              clickHandler={() => {
                this.setState({ selectedConsultantType: consultant.value })
                this.setState({ selectedAppointment: {} })
              }}
            >
              {consultant.label}
            </SelectorButton>
          ))}

          <div>
            <h2>Date &amp; time</h2>
            <div>
              {slots.map(slot => (
                <SelectorButton
                  key={slot.id}
                  active={slot.id === this.state.selectedAppointment.id}
                  clickHandler={() => {
                    this.setState({ selectedAppointment: slot })
                  }}
                >
                  {new Date(slot.time).toLocaleString()}
                </SelectorButton>
              ))}
            </div>
          </div>

          <div>
            <h2>Appointment type</h2>
            <div>
              {types.map(type => (
                <SelectorButton
                  key={type}
                  active={type === this.state.selectedAppointmentType}
                  clickHandler={() => {
                    this.setState({ selectedAppointmentType: type })
                  }}
                >
                  <span style={{ textTransform: 'capitalize' }}>{type}</span>
                </SelectorButton>
              ))}
            </div>
          </div>
          <div>
            <h2>Notes</h2>
            <textarea
              style={{
                width: '100%',
                resize: 'none',
              }}
              onChange={e => {
                this.setState({ noteText: e.target.value })
              }}
            />
          </div>
          <div
            style={{
              marginTop: 16,
              paddingTop: 16,
              borderTop: 'solid 1px silver',
            }}
          >
            <FormError message={this.state.error} />
            <button
              className="button button-block"
              onClick={this.bookAppointment.bind(this)}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
