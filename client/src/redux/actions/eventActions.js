import axios from 'axios'
import { GET_EVENTS, GET_EVENT, GET_EVENTS_FAIL } from '../types'

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
