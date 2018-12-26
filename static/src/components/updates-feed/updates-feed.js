import './updates-feed.scss'

import PropTypes from 'prop-types'
import React, { Fragment, memo, useEffect } from 'react'

import { FeedOnDemandUpdatesNotification } from '../../components/feed-on-demand-notification'
import { isList, isMap } from '../../reducers/ui/updates-feed'

import { MapContainer } from '../map'

import { InfinityFeedList } from './infinity-feed-list'
import UpdatesFeedToolbar from './updates-feed-toolbar'

const UpdatesFeed = ({
  list, isRealtime, onDemandCount, user, viewMode,

  enableRealtime, loadItemsAfter, moveOnDemandIdsToTheFeed,
  setViewMode, subscribeUpdatesFeed, unsubscribeUpdatesFeed
}) => {
  useEffect(() => {
    // FIXME: just temporal solution to send update each 5 seconds and check load
    const interval = setInterval(() => {
      const { location } = user
      const { startDateISO } = list
      subscribeUpdatesFeed({ location, startDateISO })
    }, 5 * 1000)
    return () => {
      clearInterval(interval)
      unsubscribeUpdatesFeed()
    }
  }, [])

  const leftColumnClass = (isList(viewMode) && isMap(viewMode)) ? 'left-column' : 'full-width'

  return (
    <Fragment>
      <UpdatesFeedToolbar
        follow={isRealtime}
        viewMode={viewMode}
        onFollow={enableRealtime}
        onSelectOption={setViewMode}
      />
      <div className='container-for-list-and-map'>
        {
          isList(viewMode) && <div className={`feed-list-container ${leftColumnClass}`}>
            <FeedOnDemandUpdatesNotification
              count={onDemandCount}
              onClick={moveOnDemandIdsToTheFeed}
            />
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

UpdatesFeed.displayName = 'UpdatesFeed'

UpdatesFeed.propTypes = {
  list: PropTypes.object.isRequired,
  isRealtime: PropTypes.bool.isRequired,
  onDemandCount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  viewMode: PropTypes.string.isRequired,

  loadItemsAfter: PropTypes.func.isRequired,
  enableRealtime: PropTypes.func.isRequired,
  moveOnDemandIdsToTheFeed: PropTypes.func.isRequired,
  setViewMode: PropTypes.func.isRequired,
  subscribeUpdatesFeed: PropTypes.func.isRequired,
  unsubscribeUpdatesFeed: PropTypes.func.isRequired
}

export default memo(UpdatesFeed)
