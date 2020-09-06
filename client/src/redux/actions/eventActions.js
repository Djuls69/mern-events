import axios from 'axios'
import { GET_EVENTS, GET_EVENT, GET_EVENTS_FAIL } from '../types'
import { setAlert } from './alertActions'

// Get all events
export const getEvents = () => async dispatch => {
  try {
    const res = await axios.get('/api/events')
    dispatch({
      type: GET_EVENTS,
      payload: res.data
    })
  } catch (err) {
    console.error(err.response.data)
    dispatch({
      type: GET_EVENTS_FAIL
    })
  }
}

// Get one event by ID
export const getEvent = id => async dispatch => {
  try {
    const res = await axios.get(`/api/events/${id}`)
    dispatch({
      type: GET_EVENT,
      payload: res.data
    })
  } catch (err) {
    console.error(err.response.data)
    dispatch({
      type: GET_EVENTS_FAIL
    })
  }
}

// Create an event
export const createEvent = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/events', formData, config)
    dispatch({
      type: GET_EVENT,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.map(error => setAlert(error))
    }
  }
}
