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
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import frLocale from 'date-fns/locale/fr'
import { connect } from 'react-redux'
import { createEvent } from '../../redux/actions/eventActions'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '60%',
    margin: '0 auto',
    padding: '5rem'
  },
  textFields: {
    marginBottom: '3rem',
    width: '100%',
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
  datePicker: {
    width: '100%',
    marginBottom: '3rem',
    fontSize: '1.6rem'
  }
}))

const CreateEvent = ({ createEvent }) => {
  // HOOKS
  const classes = useStyles()
  const [formData, setFormData] = useState({
    eventName: '',
    type: '',
    address: '',
    lat: null,
    lng: null,
    date: new Date()
  })
  const { eventName, type, address, date, description } = formData

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleDayChange = date => {
    setFormData({ ...formData, date })
  }

  const handleAddressChange = address => {
    setFormData({ ...formData, address })
  }

  const handleSelect = async address => {
    const res = await geocodeByAddress(address)
    const latLng = await getLatLng(res[0])
    console.log(res[0])
    console.log(latLng)
    setFormData({
      ...formData,
      address,
      lat: latLng.lat,
      lng: latLng.lng
    })
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
          <Select labelId='type-event' name='type' value={type} onChange={handleChange}>
            <MenuItem value={'visite'}>Visite</MenuItem>
            <MenuItem value={'concert'}>Concert</MenuItem>
            <MenuItem value={'restaurant'}>Restaurant</MenuItem>
          </Select>
        </FormControl>

        <PlacesAutocomplete value={address} onChange={handleAddressChange} onSelect={handleSelect}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <TextField
                {...getInputProps({
                  placeholder: 'Lieu',
                  className: classes.textFields
                })}
              />
              <div className='autocomplete-dropdown-container'>
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' }
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
          <DatePicker
            className={classes.datePicker}
            name='date'
            format='dd/MM/yyyy'
            value={date}
            onChange={handleDayChange}
          />
        </MuiPickersUtilsProvider>

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
