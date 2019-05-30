import React from 'react'
import PropTypes from 'prop-types'

function SelectorButtons(props) {
  return (
    <div>
      {Object.keys(props.options).map(key => (
        <button
          className={'button ' + (props.selected === key ? 'active' : '')}
          onClick={() => props.clickHandler(key)}
          key={key}
        >
          {props.options[key]}
        </button>
      ))}
    </div>
  )
}

export default SelectorButtons

SelectorButtons.propTypes = {
  selected: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  clickHandler: PropTypes.func.isRequired,
}
