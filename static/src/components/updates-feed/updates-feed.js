import './updates-feed.scss'

import { bind, debounce } from 'decko'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

import config from '../../config'
import { FeedOnDemandUpdatesNotification } from '../../components/feed-on-demand-notification'
import { FeedRealtimeUpdateNotification } from '../../components/feed-realtime-update-notification'

import { MapContainer } from '../../containers/map'

import UpdatesFeedItem from './updates-feed-item'

class UpdatesFeed extends React.PureComponent {
  static propTypes = {
    list: PropTypes.object.isRequired,
    isMapVisible: PropTypes.bool.isRequired,
    isRealtime: PropTypes.bool.isRequired,
    onDemandCount: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,

    loadItemsAfter: PropTypes.func.isRequired,
    enableRealtime: PropTypes.func.isRequired,
    moveOnDemandIdsToTheFeed: PropTypes.func.isRequired,
    setMapVisibility: PropTypes.func.isRequired,
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
    const {
      list, isMapVisible, isRealtime, onDemandCount,
      enableRealtime, moveOnDemandIdsToTheFeed, setMapVisibility
    } = this.props

    if (list.invalid) {
      this.validateItems()
    }

    return (
      <Fragment>
        <FeedRealtimeUpdateNotification
          follow={isRealtime}
          onFollow={enableRealtime}
          map={isMapVisible}
          onMap={setMapVisibility}
        />
        {onDemandCount > 0 && <FeedOnDemandUpdatesNotification
          count={onDemandCount}
          onClick={moveOnDemandIdsToTheFeed}
        />}
        <div className='container-for-list-and-map'>
          <InfiniteScroll
            loadMore={this.loadBefore}
            hasMore={list.hasMore && !list.invalid /* FIXME just temporal solution */}
            loader={<div className='loader' key={0}>Loading ...</div>}>
            <div className='main-stream-container'>
              {
                list.items ? list.items.map(item => <UpdatesFeedItem key={item._id} item={item}/>) : (
                  list.inProgress ? <div>TODO: spinner</div> : (
                    list.error && <div>TODO: show error</div>
                  )
                )
              }
            </div>
          </InfiniteScroll>
          { isMapVisible && <MapContainer/>}
        </div>
      </Fragment>
    )
  }
}

export default UpdatesFeed
