import { GET_EVENTS_FAIL, GET_EVENTS, GET_EVENT } from '../types'

const INIT_STATE = {
  loading: true,
  events: null,
  event: null
}

const eventReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false
      }
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false
      }
    case GET_EVENTS_FAIL:
      return {
        ...state,
        events: null,
        loading: false
      }
    default:
      return state
  }
}

export default eventReducer
