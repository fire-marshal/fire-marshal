import './main-stream.scss'

import { bind, debounce } from 'decko'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'

import config from '../config'
import * as evidencesActions from '../reducers/evidences'
import * as evidencesSubscriber from '../reducers/evidences-subscriber'
import * as evidencesSelector from '../selectors/evidences'

import MainStreamItem from './main-stream-item'

class MainStream extends React.PureComponent {
  componentDidMount () {
    // FIXME: just temporal solution to send update each 5 seconds and check load
    setInterval(() => {
      const { location } = this.props.user
      const { startDateISO } = this.props.list
      this.props.subscribeDataStream({ location, startDateISO })
    }, 5 * 1000)
  }

  componentWillUnmount () {
    this.props.unsubscribeDataStream()
  }

  @bind
  @debounce(config.evidences.debounceDelay)
  validateItems () {
    const { location } = this.props.user
    const { startDateISO } = this.props.list
    this.props.validateItems(location)
    this.props.subscribeDataStream({ location, startDateISO })
  }

  @bind
  @debounce(config.evidences.debounceDelay)
  loadBefore () {
    const { location } = this.props.user
    const { startDateISO } = this.props.list
    this.props.loadItemsAfter({ ...location, startDateISO })
    this.props.subscribeDataStream({ location, startDateISO })
  }

  render () {
    const { list } = this.props
    if (list.invalid) {
      this.validateItems()
    }

    return (
      <InfiniteScroll
        loadMore={this.loadBefore}
        hasMore={list.hasMore && !list.invalid /* FIXME just temporal solution */}
        loader={<div className='loader' key={0}>Loading ...</div>}>
        <div className='container main-st ream-container'>
          {
            list.items ? list.items.map(item => <MainStreamItem key={item._id} item={item}/>) : (
              list.inProgress ? <div>TODO: spinner</div> : (
                list.error && <div>TODO: show error</div>
              )
            )
          }
        </div>
      </InfiniteScroll>
    )
  }
}

export default connect(
  (state, props) => ({
    user: {
      // TODO: we should pass real user's position
      location: { lat: 0, long: 0 }
    },

    list: {
      inProgress: evidencesSelector.getEvidenceItemsInProgress(state, props),
      invalid: evidencesSelector.getEvidenceItemsInvalid(state, props),
      error: evidencesSelector.getEvidenceError(state, props),
      items: evidencesSelector.getEvidenceItems(state, props),
      hasMore: evidencesSelector.hasMore(state, props),
      startDateISO: evidencesSelector.getStartDateISO(state, props)
    }
  }),

  (dispatch, props) => ({
    validateItems: ({ lat, long }) => dispatch(evidencesActions.fetchEvidences({ lat, long })),
    subscribeDataStream: (payload) => dispatch(evidencesSubscriber.subscribeEvidences(payload)),
    unsubscribeDataStream: () => dispatch(evidencesSubscriber.unsubscribeEvidences()),
    loadItemsAfter: ({ lat, long, startDateISO }) => dispatch(evidencesActions.fetchEvidences({
      lat,
      long,
      startDateISO
    }))
  })
)(MainStream)
