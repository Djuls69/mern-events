import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import GoogleMapReact from 'google-map-react'
import Marker from '@material-ui/icons/Room'

const useStyles = makeStyles(theme => ({
  container: {
    padding: '3rem'
  },
  media: {
    maxHeight: '30rem',
    width: '100%',
    objectFit: 'cover',
    borderRadius: 10
  },
  eventContent: {
    marginTop: '3rem'
  },
  eventDetails: {
    margin: '2rem 0'
  },
  createdBy: {
    display: 'flex',
    alignItems: 'center',
    '& h5': {
      marginLeft: '1rem'
    }
  },
  marker: {
    width: 30,
    height: 30,
    fill: theme.palette.secondary.main
  }
}))

const testLocation = {
  center: {
    lat: 48.8608048,
    lng: 2.3317647
  },
  zoom: 13
}

const Event = props => {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item md={8}>
        <Paper className={classes.container}>
          <img
            src='https://images.unsplash.com/photo-1527325751564-cfd0b9b893f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
            className={classes.media}
            alt=''
          />
          <div className={classes.eventContent}>
            <Typography variant='h2' color='secondary'>
              Springbreak!
            </Typography>
            <div className={classes.eventDetails}>
              <Typography variant='h5'>Paris, La défense</Typography>
              <Typography variant='h6'>
                Date de début: <span>05/09/2020</span>
              </Typography>
            </div>
            <Button className={classes.createdBy}>
              <Avatar alt='' src='http://www.gravatar.com/avatar/437b9d5cf0923f597160c12329398fde?s=200&r=pg&d=retro' />
              <Typography variant='h5'>Admin</Typography>
            </Button>
            <div style={{ width: '100%', height: '200px' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAP_KEY }}
                defaultCenter={testLocation.center}
                defaultZoom={testLocation.zoom}
              >
                <Marker className={classes.marker} lat={testLocation.center.lat} lng={testLocation.center.lng} />
              </GoogleMapReact>
            </div>
          </div>
        </Paper>
      </Grid>
      <Grid item md={4}>
        <Paper className={classes.container}>
          <Typography variant='h4' color='secondary'>
            Liste des participants
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

Event.propTypes = {}

export default Event
