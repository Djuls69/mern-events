import { combineReducers } from 'redux'
import auth from './authReducer'
import events from './eventsReducer'
import alert from './alertReducer'

const rootReducer = combineReducers({ auth, events, alert })

export default rootReducer
