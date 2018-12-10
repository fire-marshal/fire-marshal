import { createSelector } from 'reselect'

import { getEvidencesRaw } from '../entities/evidences'

const getUpdatesFeed = state => state.getIn(['ui', 'updatesFeed'])

export const getSortedIdsRaw = createSelector(
  [getUpdatesFeed],
  (feed) => feed && feed.get('data')
)

export const getSortByField = createSelector(
  [getUpdatesFeed],
  (feed) => feed && feed.get('sortByField')
)

export const getSortByFieldAsArray = createSelector(
  [getSortByField],
  (field) => field && field.split('.')
)

/**
 * extract specific field of items
 */
export const getSortedFieldValue = createSelector(
  [getSortByFieldAsArray, getSortedIdsRaw, getEvidencesRaw],
  (field, ids, evidences) => ids && evidences && field && ids.map(id => evidences.get(evidences[id]).getIn(field))
)
