import './main-stream.scss'

import React from 'react'
import { connect } from 'react-redux'

import MainStreamItem from './main-stream-item'

import { getEvidenceItems } from '../selectors/evidences'

const MainStream = ({ items }) => (
  <div className='container main-stream-container'>
    {items.map(item => <MainStreamItem key={item.id} item={item} />)}
  </div>
)

MainStream.displayName = 'MainStream'

export default connect(
  (state, props) => ({
    items: getEvidenceItems(state, props)
  }),
  (dispatch, props) => ({})
)(MainStream)
