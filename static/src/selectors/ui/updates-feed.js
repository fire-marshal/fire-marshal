import _ from 'lodash'
import { createSelector } from 'reselect'
// import createSelectorPrecise from '../../utils/reselector-precise'

import { getEvidencesById } from '../entities/evidences'

const getUpdatesFeed = state => state.ui.updatesFeed

export const getSortedIds = createSelector(
  [getUpdatesFeed],
  (feed) => feed && feed.data
)

export const getOnDemand = createSelector(
  [getUpdatesFeed],
  (feed) => feed && feed.onDemand
)

export const getOnDemandCount = createSelector(
  [getOnDemand],
  (onDemandSet) => onDemandSet && onDemandSet.size
)

export const getSortedItems = createSelector(
  getSortedIds,
  getEvidencesById,
  (sortedIds, entityById) => sortedIds.map(id => entityById[id])
  // ([sortedIdsOld, entityByIdOld], [sortedIdsNew, entityByIdNew]) => {
  //   if (sortedIdsOld !== sortedIdsNew) {
  //     return false
  //   }
  //
  //   if (entityByIdOld !== entityByIdNew) {
  //     // check all child elements whether any were shallowly changed
  //     return sortedIdsNew.every(item => entityByIdOld[item.id] === entityByIdNew[item.id])
  //   }
  //
  //   return true
  // }
)

export const getStartDate = createSelector(
  [getSortedIds, getEvidencesById],
  (sortedIds, entityById) => sortedIds && entityById && _.get(entityById, [_.last(sortedIds), 'when', 'estimation'])
)

export const getStartDateISO = createSelector(
  [getStartDate],
  (date) => date && date.toISOString()
)

export const isRealtime = createSelector(
  [getUpdatesFeed],
  (feed) => feed && feed.realtime
)

export const getViewMode = createSelector(
  [getUpdatesFeed],
  (feed) => feed && feed.viewMode
)
