import { createSelector } from 'reselect'

import { getEvidencesByIdRaw } from '../entities/evidences'

const getUpdatesFeed = state => state.getIn(['ui', 'updatesFeed'])

export const getSortedIdsRaw = createSelector(
  [getUpdatesFeed],
  (feed) => feed && feed.get('data')
)

export const getSortedItemsRaw = createSelector(
  [getSortedIdsRaw, getEvidencesByIdRaw],
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
