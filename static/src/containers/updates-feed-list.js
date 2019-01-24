import { connect } from 'react-redux'

import * as evidencesActions from '../reducers/entities/evidences'
import * as evidencesSubscriber from '../reducers/evidences-subscriber'
import * as updatesFeedActions from '../reducers/ui/updates-feed'
import * as evidencesSelector from '../selectors/entities/evidences'
import * as updatesFeedSelector from '../selectors/ui/updates-feed'

import UpdatesFeedListComponent from '../components/updates-feed/updates-feed-list'

export const UpdatesFeedList = connect(
  (state, props) => ({
    list: {
      inProgress: evidencesSelector.getEvidenceItemsInProgress(state, props),
      invalid: evidencesSelector.getEvidenceItemsInvalid(state, props),
      error: evidencesSelector.getEvidenceError(state, props),
      items: updatesFeedSelector.getSortedItems(state, props),
      total: evidencesSelector.getTotalItems(state, props),
      hasMore: updatesFeedSelector.hasMore(state, props),
      startDateISO: updatesFeedSelector.getStartDateISO(state, props)
    },

    listOfItemsWithSelection: updatesFeedSelector.getSortedItemsWithSelection(state, props),

    onDemandCount: updatesFeedSelector.getOnDemandCount(state, props),

    selectedItem: updatesFeedSelector.getSelectedItem(state, props),
    selectionSource: updatesFeedSelector.getSelectionSource(state, props),

    user: {
      // TODO: we should pass real user's position
      location: { lat: 0, long: 0 }
    }
  }),

  (dispatch, props) => ({
    loadItemsAfter: ({ lat, long, startDateISO }) => dispatch(evidencesActions.fetchEvidences({
      lat,
      long,
      startDateISO
    })),
    onSelect: itemId => dispatch(updatesFeedActions.selectItem(itemId, 'list')),
    moveOnDemandIdsToTheFeed: () => dispatch(updatesFeedActions.moveOnDemandIdsToTheFeed()),
    subscribeUpdatesFeed: (payload) => dispatch(evidencesSubscriber.subscribeEvidences(payload))
  })
)(UpdatesFeedListComponent)
