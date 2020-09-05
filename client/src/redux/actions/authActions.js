import axios from 'axios'
import { REGISTER_USER, LOG_USER, AUTH_ERROR, LOAD_USER, LOGOUT_USER } from '../types'
import setAuthToken from '../../utils/setAuthToken'

export const registerUser = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/users', formData, config)
    dispatch({
      type: REGISTER_USER,
      payload: res.data
    })
    dispatch(loadUser())
    history.push('/')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.map(error => console.log(error))
    }
    dispatch({
      type: AUTH_ERROR,
      payload: errors
    })
  }
}

export const logUser = (formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/auth', formData, config)
    dispatch({
      type: LOG_USER,
      payload: res.data
    })
    dispatch(loadUser())
    history.push('/')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.map(error => console.log(error))
    }
    dispatch({
      type: AUTH_ERROR,
      payload: errors
    })
  }
}

export const loadUser = () => async dispatch => {
  if (localStorage.eventsUserToken) {
    setAuthToken(localStorage.eventsUserToken)
  }

  try {
    const res = await axios.get('/api/users')
    dispatch({
      type: LOAD_USER,
      payload: res.data
    })
  } catch (err) {
    console.log(err.message)
    dispatch({
      type: AUTH_ERROR,
      payload: err.message
    })
  }
}

export const logOut = history => dispatch => {
  dispatch({
    type: LOGOUT_USER
  })
  history.push('/login')
}
