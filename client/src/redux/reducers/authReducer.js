import { REGISTER_USER, AUTH_ERROR } from '../types'

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
      localStorage.setItem('eventsUserToken', payload.token)
      return {
        ...state,
        isAuth: true,
        token: localStorage.eventsUserToken,
        loading: false
      }
    case AUTH_ERROR:
      localStorage.removeItem('eventsUserToken')
      return {
        ...state,
        isAuth: false,
        loading: false,
        token: null
      }
    default:
      return state
  }
}

export default authReducer
