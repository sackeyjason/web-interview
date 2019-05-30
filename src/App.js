import React, { Component } from 'react'

import logo from './logo.png'
import { API_ENDPOINT } from './config'

import './App.scss'
import SelectorButtons from './components/SelectorButtons'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      selectedAppointmentType: 'gp',
      availableSlots: [],
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
        slot.consultantType.indexOf(this.state.selectedAppointmentType) >= 0
    )

    return (
      <div className="app">
        <h2 className="h6">New appointment</h2>
        <div className="app-header">
          <img src={logo} className="app-logo" alt="Babylon Health" />
        </div>
        <div style={{ maxWidth: 600, margin: '24px auto' }}>
          <SelectorButtons
            selected={this.state.selectedAppointmentType}
            options={[
              { value: 'gp', label: 'GP' },
              { value: 'therapist', label: 'Therapist' },
              { value: 'physio', label: 'Physio' },
              { value: 'specialist', label: 'Specialist' },
            ]}
            clickHandler={value =>
              this.setState({
                selectedAppointmentType: value,
              })
            }
          />
          <div>
            <strong>Appointments</strong>
            <SelectorButtons
              selected={
                this.state.selectedAppointment
                  ? this.state.selectedAppointment.id
                  : ''
              }
              options={slots.map(slot => {
                return {
                  value: slot,
                  label: slot.time,
                  id: slot.id,
                }
              })}
              clickHandler={value => {
                this.setState({ selectedAppointment: value })
              }}
            />
          </div>
          <div>
            <strong>Notes</strong>
            <textarea />
          </div>
          <div>
            <div
              className="button"
              onClick={() => {
                /* TODO: submit the data */
              }}
            >
              Book appointment
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
