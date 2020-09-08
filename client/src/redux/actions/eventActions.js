import axios from 'axios'
import { GET_EVENTS, GET_EVENT, GET_EVENTS_FAIL, UPDATE_EVENT } from '../types'
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
    console.error(err.message)
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

// Update an event
export const updateEvent = (eventId, formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post(`/api/events/${eventId}`, formData, config)
    dispatch({
      type: UPDATE_EVENT,
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
  if (window.confirm('Es-tu vraiment VRAIMENT sûr de vouloir supprimer ton event ?')) {
    try {
      await axios.delete(`/api/events/${id}`)
      history.push(`/dashboard`)
    } catch (err) {
      console.log(err.message)
    }
  }
}

// Add a comment
export const addComment = (eventId, text) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post(`/api/events/${eventId}/comment`, text, config)
    dispatch({
      type: UPDATE_EVENT,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.map(error => dispatch(setAlert(error)))
    }
  }
}

// Delete a comment
export const deleteComment = (eventId, commentId) => async dispatch => {
  if (window.confirm('Es-tu sûr de vouloir supprimer ton commentaire ?')) {
    try {
      const res = await axios.delete(`/api/events/${eventId}/comment/${commentId}`)
      dispatch({
        type: UPDATE_EVENT,
        payload: res.data
      })
    } catch (err) {
      console.log(err.message)
    }
  }
}
