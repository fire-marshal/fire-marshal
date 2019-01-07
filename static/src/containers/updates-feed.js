import { connect } from 'react-redux'

import * as evidencesActions from '../reducers/entities/evidences'
import * as evidencesSubscriber from '../reducers/evidences-subscriber'
import * as updatesFeedActions from '../reducers/ui/updates-feed'
import * as updatesFeedSelector from '../selectors/ui/updates-feed'

import { UpdatesFeed as UpdatesFeedComponent } from '../components/updates-feed'

export const UpdatesFeed = connect(
  (state, props) => ({
    listStartDateISO: updatesFeedSelector.getStartDateISO(state, props),
    isAutomaticMapFitting: updatesFeedSelector.isAutomaticMapFitting(state, props),
    isRealtime: updatesFeedSelector.isRealtime(state, props),
    onDemandCount: updatesFeedSelector.getOnDemandCount(state, props),
    user: {
      // TODO: we should pass real user's position
      location: { lat: 0, long: 0 }
    },
    viewMode: updatesFeedSelector.getViewMode(state, props)
  }),

  (dispatch, props) => ({
    enableRealtime: (enable) => dispatch(updatesFeedActions.enableRealtime(enable)),
    loadItemsAfter: ({ lat, long, startDateISO }) => dispatch(evidencesActions.fetchEvidences({
      lat,
      long,
      startDateISO
    })),
    onAutoMapFittingChange: (fit) => dispatch(updatesFeedActions.autoMapFitting(fit)),
    moveOnDemandIdsToTheFeed: () => dispatch(updatesFeedActions.moveOnDemandIdsToTheFeed()),
    setViewMode: viewMode => dispatch(updatesFeedActions.setViewMode(viewMode)),
    subscribeUpdatesFeed: (payload) => dispatch(evidencesSubscriber.subscribeEvidences(payload)),
    unsubscribeUpdatesFeed: () => dispatch(evidencesSubscriber.unsubscribeEvidences())
  })
)(UpdatesFeedComponent)
