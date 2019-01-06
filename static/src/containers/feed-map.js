import { connect } from 'react-redux'

import * as evidencesActions from '../reducers/entities/evidences'
import * as updatesFeedActions from '../reducers/ui/updates-feed'
import * as evidencesSelector from '../selectors/entities/evidences'
import * as updatesFeedSelector from '../selectors/ui/updates-feed'

import { FeedMap as FeedMapComponent } from '../components/feed-map'

export const FeedMap = connect(
  (state, props) => ({
    invalidList: evidencesSelector.getEvidenceItemsInvalid(state, props),
    itemsBounce: updatesFeedSelector.getItemsBounce(state, props),
    listError: evidencesSelector.getEvidenceError(state, props),
    listInProgress: evidencesSelector.getEvidenceItemsInProgress(state, props),
    listItems: updatesFeedSelector.getSortedItems(state, props),
    hasMoreItems: evidencesSelector.hasMore(state, props),
    selectedItem: updatesFeedSelector.getSelectedItem(state, props),
    startDateISO: updatesFeedSelector.getStartDateISO(state, props)
  }),

  (dispatch, props) => ({
    loadItemsAfter: ({ lat, long, startDateISO }) => dispatch(evidencesActions.fetchEvidences({
      lat,
      long,
      startDateISO
    })),
    onSelect: itemId => dispatch(updatesFeedActions.selectItem(itemId)),
    onUnSelect: () => dispatch(updatesFeedActions.selectItem(null))
  })
)(FeedMapComponent)
