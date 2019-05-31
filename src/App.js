import React, { Component } from 'react'

import logo from './logo.png'
import { API_ENDPOINT } from './config'

import './App.scss'
import SelectorButton from './components/SelectorButton'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      selectedConsultantType: 'gp',
      selectedAppointmentType: 'video',
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
      .catch(() => {
        // TODO: Handle error here
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
      types = this.state.selectedAppointment.appointmentType
    }

    return (
      <div className="app">
        <h2 className="h6">New appointment</h2>
        <div className="app-header">
          <img src={logo} className="app-logo" alt="Babylon Health" />
        </div>
        <div style={{ maxWidth: 600, margin: '24px auto' }}>
          {[
            { value: 'gp', label: 'GP' },
            { value: 'therapist', label: 'Therapist' },
            { value: 'physio', label: 'Physio' },
            { value: 'specialist', label: 'Specialist' },
          ].map(consultant => (
            <SelectorButton
              key={consultant.value}
              value={consultant.value}
              active={consultant.value === this.state.selectedConsultantType}
              clickHandler={() => {
                this.setState({
                  selectedConsultantType: consultant.value,
                })
              }}
            >
              {consultant.label}
            </SelectorButton>
          ))}

          <div>
            <strong>Appointments</strong>
            <div>
              {slots.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => {
                    this.setState({ selectedAppointment: slot })
                  }}
                  className={
                    'button ' +
                    (slot.id === this.state.selectedAppointment.id && 'active')
                  }
                >
                  {new Date(slot.time).toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div>
            <strong>Appointment type</strong>
            <div>
              {types
                .sort()
                .reverse()
                .map(type => (
                  <button
                    key={type}
                    style={{ textTransform: 'capitalize' }}
                    className={
                      'button ' +
                      (type === this.state.selectedAppointmentType && 'active')
                    }
                    onClick={() => {
                      this.setState({ selectedAppointmentType: type })
                    }}
                  >
                    {type}
                  </button>
                ))}
            </div>
          </div>
          <div>
            <strong>Notes</strong>
            <textarea />
          </div>
          <div>
            <button
              className="button button-block"
              onClick={() => {
                /* TODO: submit the data */
              }}
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
