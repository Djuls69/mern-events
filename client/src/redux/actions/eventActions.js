import axios from 'axios'
import { GET_EVENTS, GET_EVENT, GET_EVENTS_FAIL, DELETE_EVENT } from '../types'
import { setAlert } from './alertActions'

// Get all events
export const getEvents = () => async dispatch => {
  try {
    const res = await axios.get('/api/events')
    dispatch({
      type: GET_EVENTS,
      payload: res.data.filter(event => new Date(event.date) > new Date())
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
export const createEvent = (formData, history) => async dispatch => {
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
    history.push(`/event/${res.data._id}`)
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.map(error => dispatch(setAlert(error)))
    }
  }
}

// Delete an event
export const deleteEvent = (id, history) => async dispatch => {
  try {
    await axios.delete(`/api/events/${id}`)
    dispatch({
      type: DELETE_EVENT,
      payload: id
    })
    history.push(`/dashboard`)
  } catch (err) {
    console.log(err.response.data)
  }
}
