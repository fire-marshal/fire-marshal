import './updates-feed.scss'

import { bind, debounce } from 'decko'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'

import config from '../../config'
import { FeedOnDemandUpdatesNotification } from '../../components/feed-on-demand-notification'
import { FeedRealtimeUpdateNotification } from '../../components/feed-realtime-update-notification'

import { MapContainer } from '../../containers/map'

import { InfinityList } from '../infinity-list'

import UpdatesFeedItem from './updates-feed-item'

const itemSize = 622

class FeedInfinityList extends React.PureComponent {
  static dialogName = 'FeedInfinityList';

  static propTypes = {
    list: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,

    loadItemsAfter: PropTypes.func.isRequired,
    subscribeUpdatesFeed: PropTypes.func.isRequired
  }

  @bind
  @debounce(config.evidences.debounceDelay)
  _loadBefore () {
    const { location } = this.props.user
    const { startDateISO } = this.props.list
    this.props.loadItemsAfter({ ...location, startDateISO })
    this.props.subscribeUpdatesFeed({ location, startDateISO })
  }

  @bind
  _itemKey (index) {
    const { list } = this.props
    const item = list.items[index]
    return (item && item.id) ? item.id : index
  }

  @bind
  _renderItem ({ index, style }) {
    const { list } = this.props
    const item = list.items[index]
    return (
      <div style={style}>
        <UpdatesFeedItem item={item}/>
      </div>
    )
  }

  @bind
  _renderFallback ({ index, style }) {
    return (
      <div key={index} style={style} className='loader'>Loading ...</div>
    )
  }

  render () {
    const {
      list
    } = this.props

    if (list.invalid) {
      this._loadBefore()
    }

    const itemCount = list.items ? list.items.length : 0
    const hasMore = list.hasMore && !list.invalid /* FIXME just temporal solution */

    return (
      <AutoSizer>
        {({ height, width }) => (
          <InfinityList
            height={height}
            itemCount={itemCount}
            itemKey={this._itemKey}
            itemSize={itemSize}
            loadMore={this._loadBefore}
            hasMoreItems={hasMore}
            fallback={this._renderFallback}
            width={width}
          >
            {this._renderItem}
          </InfinityList>
        )}
      </AutoSizer>
    )
  }
}

class UpdatesFeed extends React.PureComponent {
  static displayName = 'UpdatesFeed';

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
    unsubscribeUpdatesFeed: PropTypes.func.isRequired
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

  render () {
    const {
      list, isMapVisible, isRealtime, onDemandCount,
      enableRealtime, moveOnDemandIdsToTheFeed, setMapVisibility,
      user,

      loadItemsAfter, subscribeUpdatesFeed
    } = this.props

    const hasMore = list.hasMore && !list.invalid /* FIXME just temporal solution */

    return (
      <Fragment>
        <FeedRealtimeUpdateNotification
          follow={isRealtime}
          onFollow={enableRealtime}
          map={isMapVisible}
          onMap={setMapVisibility}
          hasMore={hasMore}
        />
        {onDemandCount > 0 && <FeedOnDemandUpdatesNotification
          count={onDemandCount}
          onClick={moveOnDemandIdsToTheFeed}
        />}
        <div className='container-for-list-and-map'>
          <div className="feed-list-container">
            <FeedInfinityList
              list={list}
              user={user}
              loadItemsAfter={loadItemsAfter}
              subscribeUpdatesFeed={subscribeUpdatesFeed}
            />
          </div>
          {isMapVisible && <MapContainer/>}
        </div>
      </Fragment>
    )
  }
}

export default UpdatesFeed
