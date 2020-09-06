import { SET_ALERT, CLEAR_ALERT } from '../types'

export const setAlert = error => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: error
  })

  setTimeout(() => {
    dispatch({ type: CLEAR_ALERT })
  }, 3000)
}
