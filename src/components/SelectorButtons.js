import React from 'react'
import PropTypes from 'prop-types'

function SelectorButtons(props) {
  return (
    <div>
      {props.options.map((option, i) => (
        <button
          className={
            'button ' +
            (props.selected === (option.id || option.value) ? 'active' : '')
          }
          onClick={() => props.clickHandler(option.value)}
          key={i}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default SelectorButtons

SelectorButtons.propTypes = {
  selected: PropTypes.any.isRequired,
  options: PropTypes.array.isRequired,
  clickHandler: PropTypes.func.isRequired,
}
