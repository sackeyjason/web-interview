import React from 'react'
import PropTypes from 'prop-types'

function SelectorButtons(props) {
  return (
    <div>
      {props.options.map(option => (
        <button
          className={
            'button ' + (props.selected === option.value ? 'active' : '')
          }
          onClick={() => props.clickHandler(option.value)}
          key={option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default SelectorButtons

SelectorButtons.propTypes = {
  selected: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  clickHandler: PropTypes.func.isRequired,
}
