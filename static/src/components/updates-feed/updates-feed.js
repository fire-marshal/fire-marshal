import './updates-feed.scss'

import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { FeedOnDemandUpdatesNotification } from '../../components/feed-on-demand-notification'
import { FeedRealtimeUpdateNotification } from '../../components/feed-realtime-update-notification'

import { isList, isMap } from '../../reducers/ui/updates-feed'
import { MapContainer } from '../map'

import { InfinityFeedList } from './infinity-feed-list'

import UpdatesFeedToolbar from './updates-feed-toolbar'

class UpdatesFeed extends React.PureComponent {
  static displayName = 'UpdatesFeed';

  static propTypes = {
    list: PropTypes.object.isRequired,
    isMapVisible: PropTypes.bool.isRequired,
    isRealtime: PropTypes.bool.isRequired,
    onDemandCount: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
    viewMode: PropTypes.string.isRequired,

    loadItemsAfter: PropTypes.func.isRequired,
    enableRealtime: PropTypes.func.isRequired,
    moveOnDemandIdsToTheFeed: PropTypes.func.isRequired,
    setMapVisibility: PropTypes.func.isRequired,
    setViewMode: PropTypes.func.isRequired,
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
      user, viewMode,

      loadItemsAfter, setViewMode, subscribeUpdatesFeed
    } = this.props

    const hasMore = list.hasMore && !list.invalid
    /* FIXME just temporal solution */

    const leftColumn = (isList(viewMode) && isMap(viewMode)) ? 'left-column': 'full-width'

    return (
      <Fragment>
        <UpdatesFeedToolbar
          viewMode={viewMode}
          onSelectOption={setViewMode}
        />
        <FeedRealtimeUpdateNotification
          follow={isRealtime}
          hasMore={hasMore}
          map={isMapVisible}
          onFollow={enableRealtime}
          onMap={setMapVisibility}
        />
        {onDemandCount > 0 && <FeedOnDemandUpdatesNotification
          count={onDemandCount}
          onClick={moveOnDemandIdsToTheFeed}
        />}
        <div className='container-for-list-and-map'>
          {
            isList(viewMode) && <div className={`feed-list-container ${leftColumn}`}>
              <InfinityFeedList
                list={list}
                user={user}
                loadItemsAfter={loadItemsAfter}
                subscribeUpdatesFeed={subscribeUpdatesFeed}
              />
            </div>
          }
          {
            isMap(viewMode) && <MapContainer/>
          }
        </div>
      </Fragment>
    )
  }
}

export default UpdatesFeed
