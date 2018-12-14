import './updates-feed.scss'

import { bind, debounce } from 'decko'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import { connect } from 'react-redux'

import config from '../../config'
import { FeedOnDemandUpdatesNotification } from '../../components/feed-updates'

import * as evidencesActions from '../../reducers/entities/evidences'
import * as evidencesSelector from '../../selectors/entities/evidences'
import * as evidencesSubscriber from '../../reducers/evidences-subscriber'
import * as updatesFeedActions from '../../reducers/ui/updates-feed'
import * as updatesFeedSelector from '../../selectors/ui/updates-feed'

import UpdatesFeedItem from './updates-feed-item'

class UpdatesFeed extends React.PureComponent {
  static propTypes = {
    list: PropTypes.object.isRequired,
    onDemandCount: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,

    loadItemsAfter: PropTypes.func.isRequired,
    moveOnDemandToTheVisible: PropTypes.func.isRequired,
    subscribeUpdatesFeed: PropTypes.func.isRequired,
    unsubscribeUpdatesFeed: PropTypes.func.isRequired,
    validateItems: PropTypes.func.isRequired
  }

  componentDidMount () {
    // FIXME: just temporal solution to send update each 5 seconds and check load
    this.interval = setInterval(() => {
      const { location } = this.props.user
      const { startDateISO } = this.props.list
      this.props.subscribeUpdatesFeed({ location, startDateISO })
    }, 5 * 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
    this.props.unsubscribeUpdatesFeed()
  }

  @bind
  @debounce(config.evidences.debounceDelay)
  validateItems () {
    const { location } = this.props.user
    const { startDateISO } = this.props.list
    this.props.validateItems(location)
    this.props.subscribeUpdatesFeed({ location, startDateISO })
  }

  @bind
  @debounce(config.evidences.debounceDelay)
  loadBefore () {
    const { location } = this.props.user
    const { startDateISO } = this.props.list
    this.props.loadItemsAfter({ ...location, startDateISO })
    this.props.subscribeUpdatesFeed({ location, startDateISO })
  }

  render () {
    const { list, onDemandCount, moveOnDemandToTheVisible } = this.props
    if (list.invalid) {
      this.validateItems()
    }

    return (
      <Fragment>
        {onDemandCount > 0 && <FeedOnDemandUpdatesNotification
          count={onDemandCount}
          onClick={moveOnDemandToTheVisible}
        />}
        <InfiniteScroll
          loadMore={this.loadBefore}
          hasMore={list.hasMore && !list.invalid /* FIXME just temporal solution */}
          loader={<div className='loader' key={0}>Loading ...</div>}>
          <div className='container main-stream-container'>
            {
              list.items ? list.items.map(item => <UpdatesFeedItem key={item._id} item={item}/>) : (
                list.inProgress ? <div>TODO: spinner</div> : (
                  list.error && <div>TODO: show error</div>
                )
              )
            }
          </div>
        </InfiniteScroll>
      </Fragment>
    )
  }
}

export default connect(
  (state, props) => ({
    user: {
      // TODO: we should pass real user's position
      location: { lat: 0, long: 0 }
    },

    onDemandCount: updatesFeedSelector.getOnDemandCount(state, props),

    list: {
      inProgress: evidencesSelector.getEvidenceItemsInProgress(state, props),
      invalid: evidencesSelector.getEvidenceItemsInvalid(state, props),
      error: evidencesSelector.getEvidenceError(state, props),
      items: updatesFeedSelector.getSortedItems(state, props),
      hasMore: evidencesSelector.hasMore(state, props),
      startDateISO: updatesFeedSelector.getStartDateISO(state, props)
    }
  }),

  (dispatch, props) => ({
    loadItemsAfter: ({ lat, long, startDateISO }) => dispatch(evidencesActions.fetchEvidences({
      lat,
      long,
      startDateISO
    })),
    moveOnDemandToTheVisible: () => dispatch(updatesFeedActions.moveOnDemandToTheFeed()),
    subscribeUpdatesFeed: (payload) => dispatch(evidencesSubscriber.subscribeEvidences(payload)),
    unsubscribeUpdatesFeed: () => dispatch(evidencesSubscriber.unsubscribeEvidences()),
    validateItems: ({ lat, long }) => dispatch(evidencesActions.fetchEvidences({ lat, long }))
  })
)(UpdatesFeed)
