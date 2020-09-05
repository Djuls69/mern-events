import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appbar: {
    backgroundColor: 'rgba(0, 173, 181, 0.7)'
  },
  title: {
    flexGrow: 1
  },
  navButtons: {
    fontSize: '1.4rem',
    textTransform: 'inherit',
    marginLeft: theme.spacing(2)
  }
}))

const Navbar = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position='absolute' className={classes.appbar}>
        <Toolbar>
          <Typography variant='h4' className={classes.title}>
            Events
          </Typography>
          <Button className={classes.navButtons} color='inherit'>
            Liste des évenements
          </Button>
          <Button className={classes.navButtons} color='inherit'>
            Se connecter
          </Button>
          <Button className={classes.navButtons} color='inherit'>
            S'enregistrer
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
