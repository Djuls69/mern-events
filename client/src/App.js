import React from 'react'
import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import theme from './theme/theme'
import Navbar from './components/navbar/Navbar'
import Landing from './pages/landing/Landing'
import Register from './pages/register/Register'

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <div className='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  )
}

export default App
