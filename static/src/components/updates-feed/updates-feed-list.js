import PropTypes from 'prop-types'
import React from 'react'

import FeedOnDemandUpdatesNotification from '../feed-on-demand-notification/feed-on-demand-updates-notification'

import { InfinityFeedList } from './infinity-feed-list'

const UpdatesFeedList = ({
  list, onDemandCount, user,
  loadItemsAfter, moveOnDemandIdsToTheFeed, subscribeUpdatesFeed
}) => (
  <>
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
  </>
)

UpdatesFeedList.displayName = 'UpdatesFeedList'

UpdatesFeedList.propTypes = {
  list: PropTypes.object.isRequired,
  onDemandCount: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,

  loadItemsAfter: PropTypes.func.isRequired,
  moveOnDemandIdsToTheFeed: PropTypes.func.isRequired,
  subscribeUpdatesFeed: PropTypes.func.isRequired
}

export default UpdatesFeedList
