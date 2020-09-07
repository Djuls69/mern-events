import axios from 'axios'
import { REGISTER_USER, LOG_USER, LOAD_USER, LOGOUT_USER, AUTH_ERROR } from '../types'
import setAuthToken from '../../utils/setAuthToken'
import { setAlert } from './alertActions'

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
      errors.map(error => dispatch(setAlert(error)))
    }
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
      errors.map(error => dispatch(setAlert(error)))
    }
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
    dispatch({ type: AUTH_ERROR })
  }
}

export const logOut = history => dispatch => {
  dispatch({
    type: LOGOUT_USER
  })
  history.push('/login')
}
