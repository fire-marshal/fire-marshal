import { createSelector } from 'reselect'

import { getUI } from './'

import { getEvidencesByIdRaw } from '../entities/evidences'

const getUpdatesFeed = createSelector(
  [getUI],
  ui => ui.get('updatesFeed')
)

export const getSortedIdsRaw = createSelector(
  [getUpdatesFeed],
  (feed) => feed && feed.get('data')
)

export const getOnDemandRaw = createSelector(
  [getUpdatesFeed],
  (feed) => feed && feed.get('onDemand')
)

export const getOnDemand = createSelector(
  [getOnDemandRaw],
  (raw) => raw && raw.toJS()
)

export const getOnDemandCount = createSelector(
  [getOnDemandRaw],
  (onDemandSet) => onDemandSet && onDemandSet.size
)

export const getSortedItemsRaw = createSelector(
  [getSortedIdsRaw, getEvidencesByIdRaw],
  // FIXME: updates each time when getEvidencesByIdRaw is changed
  (sortedIds, entityById) => sortedIds.map(id => entityById.get(id))
)

export const getSortedItems = createSelector(
  [getSortedItemsRaw],
  raw => raw && raw.toJSON()
)

export const getStartDate = createSelector(
  [getSortedIdsRaw, getEvidencesByIdRaw],
  (sortedIds, entityById) => sortedIds && entityById && entityById.getIn([sortedIds.last(), 'when', 'estimation'])
)

export const getStartDateISO = createSelector(
  [getStartDate],
  (date) => date && date.toISOString()
)

export const isRealtime = createSelector(
  [getUpdatesFeed],
  (feed) => feed && feed.get('realtime')
)

export const getViewMode = createSelector(
  [getUpdatesFeed],
  (feed) => feed && feed.get('viewMode')
)
