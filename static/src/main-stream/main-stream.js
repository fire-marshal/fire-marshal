import './main-stream.scss'

import { bind, debounce } from 'decko'
import React from 'react'
import { connect } from 'react-redux'

import config from '../config'
import { fetchEvidences } from '../reducers/evidences'
import * as evidencesSelector from '../selectors/evidences'

import MainStreamItem from './main-stream-item'

class MainStream extends React.PureComponent {
  @bind
  @debounce(config.evidences)
  validateItems () {
    // TODO: we should pass real user's position
    console.log('validateItems')
    this.props.validateItems({ lat: 0, long: 0 })
  }

  render () {
    const { items } = this.props
    if (items.invalid) {
      this.validateItems()
    }

    return (
      <div className='container main-st ream-container'>
        {items.inProgress && <div>TODO: spinner</div>}
        {items.error && <div>TODO: show error</div>}
        {items.data && items.data.map(item => <MainStreamItem key={item._id} item={item} />)}
      </div>
    )
  }
}

export default connect(
  (state, props) => ({
    items: {
      inProgress: evidencesSelector.getEvidenceItemsInProgress(state, props),
      invalid: evidencesSelector.getEvidenceItemsInvalid(state, props),
      error: evidencesSelector.getEvidenceError(state, props),
      data: evidencesSelector.getEvidenceItems(state, props)
    }
  }),

  (dispatch, props) => ({
    validateItems: ({ lat, long }) => dispatch(fetchEvidences({ lat, long }))
  })
)(MainStream)
