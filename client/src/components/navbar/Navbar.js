import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { logOut } from '../../redux/actions/authActions'

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

const Navbar = ({ logOut, auth: { loading, isAuth }, history }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='absolute' className={classes.appbar}>
        <Toolbar>
          <Typography component={Link} to='/' variant='h4' className={classes.title}>
            Events
          </Typography>
          <Button className={classes.navButtons} color='inherit'>
            Liste des évenements
          </Button>
          {!loading && isAuth ? (
            <Button onClick={() => logOut(history)} className={classes.navButtons} color='inherit'>
              Se déconnecter
            </Button>
          ) : (
            <Fragment>
              <Button component={Link} to='/loggin' className={classes.navButtons} color='inherit'>
                Se connecter
              </Button>
              <Button component={Link} to='/register' className={classes.navButtons} color='inherit'>
                S'enregistrer
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapState = state => ({
  auth: state.auth
})

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired
}

export default withRouter(connect(mapState, { logOut })(Navbar))
