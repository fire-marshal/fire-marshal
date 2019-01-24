import PropTypes from 'prop-types'
import React from 'react'
import { ScaleLoader } from 'react-spinners'

const Spinner = ({ loading = true }) => (
  <ScaleLoader
    loading={loading}
    color={'#cce5ff'}
    height={64}
    width={4}
    margin={'2px'}
    radius={2}
  />
)

Spinner.displayName = 'Spinner'

Spinner.propTypes = {
  loading: PropTypes.bool
}

export default Spinner
