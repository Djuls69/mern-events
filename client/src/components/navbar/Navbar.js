import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
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
  },
  user: {
    display: 'flex',
    alignItems: 'center',
    '& h4': {
      fontSize: '1.4rem',
      fontWeight: 400,
      marginLeft: '1rem'
    }
  }
}))

const Navbar = ({ logOut, auth: { loading, isAuth, user }, history }) => {
  const classes = useStyles()

  const authLinks = (
    <Fragment>
      {user && (
        <div className={classes.user}>
          <Avatar alt={user.name} src={`http:${user.avatar}`} />
          <Typography variant='h4'>{user.name}</Typography>
        </div>
      )}
      <Button component={Link} to='/dashboard' className={classes.navButtons} color='inherit'>
        Liste des évenements
      </Button>
      <Button component={Link} to='/create-event' className={classes.navButtons} color='inherit'>
        Créer un évenement
      </Button>
      <Button onClick={() => logOut(history)} className={classes.navButtons} color='inherit'>
        Se déconnecter
      </Button>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <Button component={Link} to='/dashboard' className={classes.navButtons} color='inherit'>
        Liste des évenements
      </Button>
      <Button component={Link} to='/login' className={classes.navButtons} color='inherit'>
        Se connecter
      </Button>
      <Button component={Link} to='/register' className={classes.navButtons} color='inherit'>
        S'enregistrer
      </Button>
    </Fragment>
  )

  return (
    <div className={classes.root}>
      <AppBar position='absolute' className={classes.appbar}>
        <Toolbar>
          <Typography component={Link} to='/' variant='h4' className={classes.title}>
            Events
          </Typography>
          {!loading && isAuth ? authLinks : guestLinks}
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
