import PropTypes from 'prop-types'
import React from 'react'

import { NavBar } from '../components/navbar'

const Container = ({ children }) => (
  <div>
    <NavBar />
    {children}
  </div>
)

Container.displayName = 'Container'
Container.propTypes = {
  children: PropTypes.node
}

export default Container
