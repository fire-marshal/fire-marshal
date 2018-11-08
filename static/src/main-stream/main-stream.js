import './main-stream.scss'

import { bind, debounce } from 'decko'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
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
    this.props.validateItems({ lat: 0, long: 0 })
  }

  @bind
  @debounce(config.evidences)
  loadAfter () {

  }

  render () {
    const { items } = this.props
    if (items.invalid) {
      this.validateItems()
    }

    return (
      <InfiniteScroll
        loadMore={this.loadAfter}
        hasMore={items.data /* FIXME just temporal solution */}
        loader={<div className='loader' key={0}>Loading ...</div>}>
        <div className='container main-st ream-container'>
          {items.inProgress && <div>TODO: spinner</div>}
          {items.error && <div>TODO: show error</div>}
          {items.data && items.data.map(item => <MainStreamItem key={item._id} item={item} />)}
        </div>
      </InfiniteScroll>
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
