import React from 'react'
import PropTypes from 'prop-types'

const Beer = ({ name, brewer, abv, _id, description, requestBeer, dispatch }) => (
  <div>
    <p>{name}</p>
    <p>{brewer}</p>
    <p>{abv}</p>
    <p>{description}</p>
  </div>
)

Beer.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  brewer: PropTypes.string.isRequired,
  abv: PropTypes.number.isRequired,
  description: PropTypes.number.isRequired
}

export default Beer
