import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import { connect } from 'react-redux'
import { getEvents } from '../../redux/actions/eventActions'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles({
  card: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '3rem'
  },
  mediaContainer: {
    width: '33%',
    marginRight: '3rem'
  },
  cardMedia: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
    display: 'block'
  }
})

const EventsList = ({ events: { events, loading }, getEvents }) => {
  const classes = useStyles()

  useEffect(() => {
    getEvents()
  }, [getEvents])

  return events !== null && !loading ? (
    <Fragment>
      {events.map(event => (
        <Card component={Link} to={`/event/${event._id}`} key={event._id} className={classes.card}>
          <div className={classes.mediaContainer}>
            <img src={require(`../../assets/img/${event.type}.jpg`)} className={classes.cardMedia} alt='' />
          </div>
          <div className={classes.mediaDetails}>
            <Typography variant='h2' color='secondary'>
              {event.eventName}
            </Typography>
            <Typography variant='body1'>
              Créé le <Moment format='DD/MM/YYYY'>{event.date}</Moment> par {event.userName}
            </Typography>
          </div>
        </Card>
      ))}
    </Fragment>
  ) : (
    <CircularProgress />
  )
}

const mapState = state => ({
  events: state.events
})

Event.propTypes = {
  events: PropTypes.object.isRequired,
  getEvents: PropTypes.func.isRequired
}

export default connect(mapState, { getEvents })(EventsList)
