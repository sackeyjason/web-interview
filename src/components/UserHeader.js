import React from 'react'
import PropTypes from 'prop-types'

function UserHeader(props) {
  let avatar

  if (!props.user) return null
  avatar = (
    <img alt="" src={props.user.avatar} style={{ width: 64, height: 64 }} />
  )

  return (
    <div
      style={{
        paddingBottom: 20,
        borderBottom: 'solid 1px silver',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      {avatar}
      <span
        style={{
          fontWeight: 'bold',
          marginLeft: 20,
        }}
      >
        {props.user.firstName} {props.user.lastName}
      </span>
      <a
        href="#!"
        style={{
          color: '#25bcbb',
          marginLeft: 'auto',
          textDecoration: 'none',
        }}
      >
        Change
      </a>
    </div>
  )
}

export default UserHeader

UserHeader.propTypes = {
  user: PropTypes.object,
}
