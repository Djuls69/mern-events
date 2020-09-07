import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ auth: { isAuth, loading }, component: Component, ...otherProps }) => {
  return (
    <Route
      {...otherProps}
      render={props => {
        return !isAuth && !loading ? <Redirect to='/login' /> : <Component {...props} />
      }}
    />
  )
}

const mapState = state => ({
  auth: state.auth
})

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

export default connect(mapState)(PrivateRoute)
