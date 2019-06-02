import React from 'react'
import PropTypes from 'prop-types'

function SelectorButton(props) {
  return (
    <button
      className={'button ' + (props.active && 'active')}
      onClick={props.clickHandler}
    >
      {props.children}
    </button>
  )
}

export default SelectorButton

SelectorButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
}
