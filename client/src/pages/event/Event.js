import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { eventStyles } from './EventStyles'
import Moment from 'react-moment'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import GoogleMapReact from 'google-map-react'
import Marker from '../../components/marker/Marker'
import AttendeeItem from '../../components/attendeeItem/AttendeeItem'
import { getEvent } from '../../redux/actions/eventActions'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

const Event = ({ auth, events: { event }, match, getEvent }) => {
  const classes = eventStyles()

  useEffect(() => {
    getEvent(match.params.eventId)
  }, [getEvent, match.params.eventId])

  const eventLocation = {
    center: {
      lat: event && event.lat,
      lng: event && event.lng
    },
    zoom: 13
  }

  const displayImage = () => {
    if (event !== null) {
      switch (event.type) {
        case 'visite':
          return require(`../../assets/img/visite.jpg`)
        case 'concert':
          return require(`../../assets/img/concert.jpg`)
        case 'restaurant':
          return require(`../../assets/img/restaurant.jpg`)
        default:
          return 'https://images.unsplash.com/photo-1599261452733-be5022805941?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80'
      }
    }
  }

  const displayButtons = () => {
    if (!auth.loading && auth.user._id === event.user) {
      return (
        <div className={classes.eventActions}>
          <Button disableRipple variant='contained' color='primary'>
            <i className='fas fa-pen'></i> Editer
          </Button>
          <Button disableRipple variant='contained' color='secondary'>
            <i className='fas fa-eraser'></i> Supprimer
          </Button>
        </div>
      )
    } else if (!auth.loading && auth.user !== null) {
      return (
        <div className={classes.eventActions}>
          <Button disableRipple variant='contained' color='primary'>
            <i className='fas fa-pen'></i> Participer
          </Button>
          <Button disableRipple variant='contained' color='secondary'>
            <i className='fas fa-eraser'></i> Se désister
          </Button>
        </div>
      )
    }
    return
  }

  return event === null ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={3}>
      <Grid item md={8}>
        <Paper className={classes.container}>
          <img src={displayImage()} className={classes.media} alt='' />
          <div className={classes.eventContent}>
            <Typography variant='h2' color='secondary'>
              {event.eventName}
            </Typography>
            <div className={classes.eventDetails}>
              <Typography variant='body1'>{event.address}</Typography>
              <Typography variant='body1'>
                Date de début:{' '}
                <span>
                  <Moment format='DD/MM/YYYY'>{event.date}</Moment>
                </span>
              </Typography>
            </div>
            <Button className={classes.createdBy}>
              <Avatar alt='' src={event.userAvatar} />
              <Typography variant='h5'>{event.userName}</Typography>
            </Button>
            {displayButtons()}
            <div style={{ width: '100%', height: '200px' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLEMAP_KEY }}
                defaultCenter={eventLocation.center}
                defaultZoom={eventLocation.zoom}
              >
                <Marker lat={eventLocation.center.lat} lng={eventLocation.center.lng} />
              </GoogleMapReact>
            </div>
            <div className={classes.description}>
              <Typography variant='h3' color='secondary'>
                Description:
              </Typography>
              <Typography variant='body1'>{event.description}</Typography>
            </div>
            {event.comments.length > 0 && (
              <div className={classes.comments}>
                <Typography variant='h3' color='secondary'>
                  Commentaires:
                </Typography>
                <Paper className={classes.comment}>
                  <div className={classes.commentUser}>
                    <Avatar
                      className={classes.commentUserAvatar}
                      alt=''
                      src='http://www.gravatar.com/avatar/437b9d5cf0923f597160c12329398fde?s=200&r=pg&d=retro'
                    />
                    <Typography variant='h5'>Admin</Typography>
                  </div>
                  <div className='commentText'>
                    <Typography variant='body1'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, quaerat.
                    </Typography>
                  </div>
                </Paper>
              </div>
            )}
          </div>
        </Paper>
      </Grid>
      <Grid item md={4}>
        <Paper className={classes.container}>
          <Typography variant='h4' color='secondary'>
            Liste des participants:
          </Typography>
          <AttendeeItem
            avatar='http://www.gravatar.com/avatar/437b9d5cf0923f597160c12329398fde?s=200&r=pg&d=retro'
            name='Admin'
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

const mapState = state => ({
  events: state.events,
  auth: state.auth
})

Event.propTypes = {
  events: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired
}

export default connect(mapState, { getEvent })(Event)
