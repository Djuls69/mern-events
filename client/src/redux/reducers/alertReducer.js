const { SET_ALERT, CLEAR_ALERT } = require('../types')

const INIT_STATE = []

const alertReducer = (state = INIT_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_ALERT:
      return [...state, payload]
    case CLEAR_ALERT:
      return []
    default:
      return state
  }
}

export default alertReducer
