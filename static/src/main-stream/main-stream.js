import './main-stream.scss'

import React from 'react'
import { connect } from 'react-redux'

import MainStreamItem from './main-stream-item'

import { getEvidenceItems, getEvidenceItemsInProgress, getEvidenceError } from '../selectors/evidences'

const MainStream = ({ items }) => (
  <div className='container main-st ream-container'>
    {items.inProgress && <div>TODO: spinner</div>}
    {items.error && <div>TODO: show error</div>}
    {items.data && items.data.map(item => <MainStreamItem key={item.id} item={item} />)}
  </div>
)

MainStream.displayName = 'MainStream'

export default connect(
  (state, props) => ({
    items: {
      inProgress: getEvidenceItemsInProgress(state, props),
      error: getEvidenceError(state, props),
      data: getEvidenceItems(state, props)
    }
  }),
  (dispatch, props) => ({})
)(MainStream)
