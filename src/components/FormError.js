import React from 'react'
import PropTypes from 'prop-types'

function FormError(props) {
  return props.message ? (
    <div
      style={{
        paddingLeft: 20,
        borderLeft: 'solid 5px red',
      }}
    >
      <h3>Error</h3>
      <p>{props.message}</p>
    </div>
  ) : null
}

export default FormError

FormError.propTypes = {
  message: PropTypes.string,
}
