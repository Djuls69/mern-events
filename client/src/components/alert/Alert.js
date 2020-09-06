import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto 2rem',
    padding: '2rem',
    backgroundColor: theme.palette.secondary.main,
    color: '#fff'
  }
}))

const Alert = ({ alert }) => {
  const classes = useStyles()
  return alert.map(err => (
    <div className={classes.root}>
      <Typography style={{ fontSize: '1.4rem' }} variant='h4'>
        {err.msg}
      </Typography>
    </div>
  ))
}

const mapState = state => ({
  alert: state.alert
})

Alert.propTypes = {
  alert: PropTypes.array.isRequired
}

export default connect(mapState)(Alert)
