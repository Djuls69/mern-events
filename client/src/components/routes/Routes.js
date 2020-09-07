import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Register from '../../pages/register/Register'
import Loggin from '../../pages/loggin/Loggin'
import Event from '../../pages/event/Event'
import EventsList from '../../pages/eventsList/EventsList'
import Alert from '../alert/Alert'
import CreateEvent from '../../pages/createEvent/CreateEvent'
import PrivateRoute from './PrivateRoute'
import EditEvent from '../../pages/editEvent/EditEvent'

const Routes = () => {
  return (
    <div className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Loggin} />
        <Route exact path='/dashboard' component={EventsList} />
        <Route exact path='/event/:eventId' component={Event} />
        <PrivateRoute exact path='/create-event' component={CreateEvent} />
        <PrivateRoute exact path='/edit-event/:id' component={EditEvent} />
      </Switch>
    </div>
  )
}

export default Routes
