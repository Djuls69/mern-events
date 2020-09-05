import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions/authActions'

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
  }
}))

const Register = ({ registerUser }) => {
  // HOOKS
  const classes = useStyles()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { name, email, password, confirmPassword } = formData

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    registerUser(formData)
  }

  return (
    <Paper className={classes.root}>
      <form noValidate onSubmit={handleSubmit}>
        <Typography className={classes.formTitle} variant='h2' color='primary'>
          Inscris toi !!
        </Typography>
        <Input
          className={classes.textFields}
          name='name'
          value={name}
          onChange={handleChange}
          placeholder='Nom'
          fullWidth
        />
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
        <Input
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
  registerUser: PropTypes.func.isRequired
}

export default connect(null, { registerUser })(Register)
