import { GET_EVENTS_FAIL, GET_EVENTS, GET_EVENT } from '../types'

const INIT_STATE = {
  events: null,
  event: null
}

const eventReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload
      }
    case GET_EVENT:
      return {
        ...state,
        event: payload
      }
    case GET_EVENTS_FAIL:
      return {
        ...state,
        events: null
      }
    default:
      return state
  }
}

export default eventReducer
