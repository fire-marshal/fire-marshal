import _ from 'lodash'
import { createSelector } from 'reselect'

import createSelectorPrecise from '../../utils/reselector-precise'

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

export const getSortedItems = createSelectorPrecise(
  getSortedIds,
  getEvidencesById,
  (sortedIds, entityById) => sortedIds.map(id => entityById[id])
)(([sortedIdsLast, entityByIdLast], [sortedIds, entityById]) => {
  if (sortedIdsLast !== sortedIds) {
    return false
  }

  if (entityByIdLast !== entityById) {
    // check all child elements whether any were shallowly changed
    return sortedIds.every(item => entityByIdLast[item.id] === entityById[item.id])
  }

  return true
})

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
