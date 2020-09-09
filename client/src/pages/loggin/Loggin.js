import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { logUser } from '../../redux/actions/authActions'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '60%',
    margin: '0 auto',
    padding: '5rem'
  },
  textFields: {
    fontSize: '1.6rem',
    marginBottom: '3rem'
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '3rem'
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      maxWidth: '100%',
      margin: '0 auto',
      padding: '1rem',
      marginBottom: '3rem'
    },
    formTitle: {
      textAlign: 'center',
      marginBottom: '3rem',
      fontSize: '2rem'
    }
  }
}))

const Loggin = ({ logUser, auth: { isAuth, loading }, history }) => {
  // HOOKS
  const classes = useStyles()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData

  if (isAuth && !loading) {
    return <Redirect to='/' />
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    logUser(formData, history)
  }

  return (
    <Paper className={classes.root}>
      <form noValidate onSubmit={handleSubmit}>
        <Typography className={classes.formTitle} variant='h2' color='primary'>
          Connectes toi !!
        </Typography>
        <Input
          className={classes.textFields}
          name='email'
          type='email'
          value={email}
          onChange={handleChange}
          placeholder='Email'
          fullWidth
        />
        <Input
          className={classes.textFields}
          name='password'
          type='password'
          value={password}
          onChange={handleChange}
          placeholder='Mot de passe'
          fullWidth
        />
        <Button variant='contained' color='primary' type='submit'>
          Envoyer
        </Button>
      </form>
    </Paper>
  )
}

const mapState = state => ({
  auth: state.auth
})

Loggin.propTypes = {
  logUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapState, { logUser })(Loggin)
