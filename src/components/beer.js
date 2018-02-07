import React from 'react'
import PropTypes from 'prop-types'

const linkStyle = {
  color: 'black',
  textDecoration: 'none' /* no underline */
}

const Beer = ({ name, brewer, abv, _id, requestBeer, dispatch }) => (
  <a href="#" style={linkStyle} onClick={(e) => dispatch(requestBeer(_id))}>
    <tr>
      <td>{name}</td>
      <td>{brewer}</td>
      <td>{abv} %</td>
    </tr>
  </a>
)

Beer.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  brewer: PropTypes.string.isRequired,
  abv: PropTypes.number.isRequired
}

export default Beer
