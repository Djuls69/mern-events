import React from 'react'
import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme/theme'
import Navbar from './components/navbar/Navbar'
import Landing from './pages/landing/Landing'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Landing />
    </ThemeProvider>
  )
}

export default App
