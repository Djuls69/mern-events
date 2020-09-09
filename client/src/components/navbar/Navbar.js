import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Drawer from '@material-ui/core/Drawer'
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
    padding: '0 8px',
    '& h4': {
      fontSize: '1.4rem',
      fontWeight: 400,
      marginLeft: '1rem'
    }
  },
  menuButton: {
    '& svg': {
      width: '2.6rem',
      height: '2.6rem'
    }
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '2rem',
    alignItems: 'flex-end'
  }
}))

const Navbar = ({ logOut, auth: { loading, isAuth, user }, history }) => {
  const classes = useStyles()
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const theme = useTheme()
  const match = useMediaQuery(theme.breakpoints.down('sm'))

  const authLinks = (
    <Fragment>
      {user && (
        <div className={classes.user}>
          <Avatar alt={user.name} src={`http:${user.avatar}`} />
          <Typography variant='h4'>{user.name}</Typography>
        </div>
      )}
      <Button
        component={Link}
        to='/dashboard'
        onClick={() => setToggleDrawer(false)}
        className={classes.navButtons}
        color='inherit'
      >
        Liste des évenements
      </Button>
      <Button
        component={Link}
        to='/create-event'
        onClick={() => setToggleDrawer(false)}
        className={classes.navButtons}
        color='inherit'
      >
        Créer un évenement
      </Button>
      <Button
        onClick={() => {
          logOut(history)
          setToggleDrawer(false)
        }}
        className={classes.navButtons}
        color='inherit'
      >
        Se déconnecter
      </Button>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <Button
        component={Link}
        to='/dashboard'
        onClick={() => setToggleDrawer(false)}
        className={classes.navButtons}
        color='inherit'
      >
        Liste des évenements
      </Button>
      <Button
        component={Link}
        to='/login'
        onClick={() => setToggleDrawer(false)}
        className={classes.navButtons}
        color='inherit'
      >
        Se connecter
      </Button>
      <Button
        component={Link}
        to='/register'
        onClick={() => setToggleDrawer(false)}
        className={classes.navButtons}
        color='inherit'
      >
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
          {!match && (!loading && isAuth ? authLinks : guestLinks)}
          {match && (
            <IconButton
              onClick={() => setToggleDrawer(true)}
              edge='end'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='right'
        open={toggleDrawer}
        onClose={() => setToggleDrawer(false)}
        classes={{ paper: classes.drawerPaper }}
      >
        {!loading && isAuth ? authLinks : guestLinks}
      </Drawer>
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
