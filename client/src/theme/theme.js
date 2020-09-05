import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  spacing: 10,
  palette: {
    primary: {
      main: '#00adb5',
      contrastText: '#eee'
    },
    secondary: {
      main: '#f38181'
    }
  },
  typography: {
    button: {
      fontWeight: 300,
      fontSize: '1.6rem',
      textTransform: 'inherit'
    },
    body1: {
      fontSize: '1.6rem',
      fontWeight: 300
    }
  }
})

export default theme
