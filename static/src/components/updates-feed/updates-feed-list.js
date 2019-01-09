import PropTypes from 'prop-types'
import React from 'react'

import FeedOnDemandUpdatesNotification from '../feed-on-demand-notification/feed-on-demand-updates-notification'

import { InfinityFeedList } from './infinity-feed-list'

const UpdatesFeedList = ({
  list, listOfItemsWithSelection, onDemandCount, selectedItem, selectionSource, user,
  onSelect, loadItemsAfter, moveOnDemandIdsToTheFeed, subscribeUpdatesFeed
}) => (
  <>
    <FeedOnDemandUpdatesNotification
      count={onDemandCount}
      onClick={moveOnDemandIdsToTheFeed}
    />
    <InfinityFeedList
      list={list}
      listOfItemsWithSelection={listOfItemsWithSelection}
      selectedId={selectedItem && selectedItem.id}
      selectionSource={selectionSource}
      user={user}
      onSelect={onSelect}
      loadItemsAfter={loadItemsAfter}
      subscribeUpdatesFeed={subscribeUpdatesFeed}
    />
  </>
)

UpdatesFeedList.displayName = 'UpdatesFeedList'

UpdatesFeedList.propTypes = {
  list: PropTypes.object.isRequired,
  listOfItemsWithSelection: PropTypes.array,
  onDemandCount: PropTypes.number.isRequired,
  selectedItem: PropTypes.object,
  selectionSource: PropTypes.string,
  user: PropTypes.object.isRequired,

  onSelect: PropTypes.func.isRequired,
  loadItemsAfter: PropTypes.func.isRequired,
  moveOnDemandIdsToTheFeed: PropTypes.func.isRequired,
  subscribeUpdatesFeed: PropTypes.func.isRequired
}

export default UpdatesFeedList
