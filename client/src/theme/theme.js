import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  spacing: 10,
  palette: {
    primary: {
      main: '#00adb5',
      contrastText: '#eee'
    }
  },
  typography: {
    button: {
      fontWeight: 300,
      fontSize: '1.6rem',
      textTransform: 'inherit'
    }
  }
})

export default theme
