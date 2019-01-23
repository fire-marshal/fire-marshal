import './full-screen-spinner.scss'

import PropTypes from 'prop-types'
import React from 'react'

import Spinner from './spinner'

const FullScreenSpinner = ({ loading = true }) => (
  <div className='full-screen-spinner-container'><Spinner loading={loading}/></div>
)

FullScreenSpinner.displayName = 'FullScreenSpinner'

FullScreenSpinner.propTypes = {
  loading: PropTypes.bool
}

export default FullScreenSpinner
