import React from 'react'
import PropTypes from 'prop-types'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

const PlacesAutocomplete = ({ handleAddressChange }) => {
  const handleSelect = async address => {
    const res = await geocodeByAddress(address)
    return getLatLng(res[0])
  }

  return <div></div>
}

PlacesAutocomplete.propTypes = {
  handleAddressChange: PropTypes.func.isRequired
}

export default PlacesAutocomplete
