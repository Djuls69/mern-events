import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions/authActions'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '60%',
    margin: '0 auto',
    padding: '5rem'
  },
  textFields: {
    marginBottom: '3rem',
    '& input': {
      fontSize: '1.6rem'
    },
    '& p': {
      fontSize: '1.2rem'
    }
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

const mapState = state => ({
  auth: state.auth
})

const Register = ({ registerUser, auth: { isAuth, loading }, history }) => {
  // HOOKS
  const classes = useStyles()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { name, email, password, confirmPassword } = formData

  if (isAuth && !loading) {
    return <Redirect to='/' />
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    registerUser(formData, history)
  }

  return (
    <Paper className={classes.root}>
      <form noValidate onSubmit={handleSubmit}>
        <Typography className={classes.formTitle} variant='h2' color='primary'>
          Inscris toi !!
        </Typography>
        <TextField
          className={classes.textFields}
          name='name'
          value={name}
          onChange={handleChange}
          placeholder='Nom'
          fullWidth
        />
        <TextField
          className={classes.textFields}
          name='email'
          type='email'
          value={email}
          onChange={handleChange}
          placeholder='Email'
          helperText="Merci d'utiliser un email associé à Gravatar si vous souhaitez une image personnalisée"
          fullWidth
        />
        <TextField
          className={classes.textFields}
          name='password'
          type='password'
          value={password}
          onChange={handleChange}
          placeholder='Mot de passe'
          fullWidth
        />
        <TextField
          className={classes.textFields}
          name='confirmPassword'
          type='password'
          value={confirmPassword}
          onChange={handleChange}
          placeholder='Confirmes ton mot de passe'
          fullWidth
        />
        <Button variant='contained' color='primary' type='submit'>
          Envoyer
        </Button>
      </form>
    </Paper>
  )
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

export default connect(mapState, { registerUser })(Register)
