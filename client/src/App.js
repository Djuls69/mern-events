import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadUser } from './redux/actions/authActions'
import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import theme from './theme/theme'
import Navbar from './components/navbar/Navbar'
import Landing from './pages/landing/Landing'
import Register from './pages/register/Register'
import Loggin from './pages/loggin/Loggin'

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <div className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/loggin' component={Loggin} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  )
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired
}

export default connect(null, { loadUser })(App)
