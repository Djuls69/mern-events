import axios from 'axios'
import { REGISTER_USER, LOG_USER, AUTH_ERROR } from '../types'

export const registerUser = formData => async dispatch => {
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
    return alert('Inscription réussie')
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: {
        status: err.response.status,
        message: err.response
      }
    })
  }
}

export const logUser = formData => async dispatch => {
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
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: {
        status: err.response.status,
        message: err.response
      }
    })
  }
}
