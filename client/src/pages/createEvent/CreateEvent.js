import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { connect } from 'react-redux'
import { createEvent } from '../../redux/actions/eventActions'
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
  }
}))

const CreateEvent = ({ createEvent }) => {
  // HOOKS
  const classes = useStyles()
  const [formData, setFormData] = useState({
    eventName: '',
    type: '',
    address: '',
    date: ''
  })
  const { eventName, type, address, date, description } = formData

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <Paper className={classes.root}>
      <form noValidate onSubmit={handleSubmit}>
        <Typography className={classes.formTitle} variant='h2' color='primary'>
          Créé ton event !!
        </Typography>
        <TextField
          className={classes.textFields}
          name='eventName'
          value={eventName}
          onChange={handleChange}
          placeholder='Donnes un titre'
          fullWidth
        />
        <FormControl className={classes.textFields} fullWidth>
          <InputLabel id='type-event'>Type</InputLabel>
          <Select labelId='type-event' value={type} onChange={handleChange}>
            <MenuItem value={'visite'}>Visite</MenuItem>
            <MenuItem value={'concert'}>Concert</MenuItem>
            <MenuItem value={'restaurant'}>Restaurant</MenuItem>
          </Select>
        </FormControl>
        <TextField
          className={classes.textFields}
          name='address'
          type='text'
          value={address}
          onChange={handleChange}
          placeholder='Lieu'
          fullWidth
        />
        <TextField
          className={classes.textFields}
          name='date'
          type='date'
          value={date}
          onChange={handleChange}
          placeholder='Date de départ'
          fullWidth
        />
        <TextField
          className={classes.textFields}
          name='description'
          multiline
          rows={5}
          value={description}
          onChange={handleChange}
          placeholder='Description'
          fullWidth
        />
        <Button variant='contained' color='primary' type='submit'>
          Envoyer
        </Button>
      </form>
    </Paper>
  )
}

CreateEvent.propTypes = {
  createEvent: PropTypes.func.isRequired
}

export default connect(null, { createEvent })(CreateEvent)
