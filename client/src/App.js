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
import Routes from './components/routes/Routes'

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Switch>
      </ThemeProvider>
    </Router>
  )
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired
}

export default connect(null, { loadUser })(App)
