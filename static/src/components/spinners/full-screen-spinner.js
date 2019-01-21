import './full-screen-spinner.scss'

import PropTypes from 'prop-types'
import React from 'react'
import { ScaleLoader } from 'react-spinners'

const FullScreenSpinner = ({ loading = true }) => (
  <div className='full-screen-spinner-container'>
    <ScaleLoader
      loading={loading}
      color={'#cce5ff'}
      height={64}
      width={4}
      margin={'2px'}
      radius={2}
    />
  </div>
)

FullScreenSpinner.displayName = 'FullScreenSpinner'

FullScreenSpinner.propTypes = {
  loading: PropTypes.bool
}

export default FullScreenSpinner
