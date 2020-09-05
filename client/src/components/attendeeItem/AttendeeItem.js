import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles(theme => ({
  attendeeUser: {
    margin: '2rem 0',
    display: 'flex',
    alignItems: 'center'
  },
  attendeeAvatar: {
    width: '6rem',
    height: '6rem',
    marginRight: '2rem'
  }
}))

const AttendeeItem = ({ name, avatar }) => {
  const classes = useStyles()
  return (
    <div className={classes.attendeeUser}>
      <Avatar className={classes.attendeeAvatar} alt='' src={avatar} />
      <Typography variant='h5'>{name}</Typography>
    </div>
  )
}

export default AttendeeItem
