import './tile-spinner.scss'

import React from 'react'

import { Spinner } from '../spinners'

const TileSpinner = (props) => (
  <div {...props} className='tile-spinner'><Spinner /></div>
)

TileSpinner.displayName = 'TileSpinner'

export default TileSpinner
