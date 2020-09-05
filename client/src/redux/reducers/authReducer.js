import { REGISTER_USER, AUTH_ERROR, LOAD_USER, LOG_USER, LOGOUT_USER } from '../types'

const INIT_STATE = {
  isAuth: false,
  loading: true,
  token: localStorage.getItem('eventsUserToken'),
  user: null
}

const authReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case REGISTER_USER:
    case LOG_USER:
      localStorage.setItem('eventsUserToken', payload.token)
      return {
        ...state,
        isAuth: true,
        token: localStorage.eventsUserToken,
        loading: false
      }
    case LOAD_USER:
      return {
        ...state,
        isAuth: true,
        user: payload,
        loading: false
      }
    case AUTH_ERROR:
    case LOGOUT_USER:
      localStorage.removeItem('eventsUserToken')
      return {
        ...state,
        isAuth: false,
        loading: false,
        token: null,
        user: null
      }
    default:
      return state
  }
}

export default authReducer
