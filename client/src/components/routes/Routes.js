import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Register from '../../pages/register/Register'
import Loggin from '../../pages/loggin/Loggin'
import Event from '../../pages/event/Event'

const Routes = () => {
  return (
    <div className='container'>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Loggin} />
        <Route exact path='/event/:id' component={Event} />
      </Switch>
    </div>
  )
}

export default Routes
