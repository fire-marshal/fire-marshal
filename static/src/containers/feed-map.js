import { connect } from 'react-redux'

import * as evidencesActions from '../reducers/entities/evidences'
import * as evidencesSelector from '../selectors/entities/evidences'
import * as updatesFeedSelector from '../selectors/ui/updates-feed'

import { FeedMap as FeedMapComponent } from '../components/feed-map'

export const FeedMap = connect(
  (state, props) => ({
    listInProgress: evidencesSelector.getEvidenceItemsInProgress(state, props),
    invalidList: evidencesSelector.getEvidenceItemsInvalid(state, props),
    listError: evidencesSelector.getEvidenceError(state, props),
    listItems: updatesFeedSelector.getSortedItems(state, props),
    hasMoreItems: evidencesSelector.hasMore(state, props),
    startDateISO: updatesFeedSelector.getStartDateISO(state, props)
  }),

  (dispatch, props) => ({
    loadItemsAfter: ({ lat, long, startDateISO }) => dispatch(evidencesActions.fetchEvidences({
      lat,
      long,
      startDateISO
    }))
  })
)(FeedMapComponent)
