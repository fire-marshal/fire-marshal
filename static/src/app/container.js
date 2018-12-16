import PropTypes from 'prop-types'
import React, { Fragment } from 'react'

import { NavBar } from '../components/navbar'

const Container = ({ children }) => (
  <Fragment>
    <NavBar />
    {children}
  </Fragment>
)

Container.displayName = 'Container'
Container.propTypes = {
  children: PropTypes.node
}

export default Container
