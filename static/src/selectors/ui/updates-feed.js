import _ from 'lodash'
import { createSelector } from 'reselect'

import { getUI } from './'

import { getEvidencesByIdRaw } from '../entities/evidences'

const getUpdatesFeed = createSelector(
  [getUI],
  ui => ui.updatesFeed
)

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
  [getSortedIds, getEvidencesByIdRaw],
  // FIXME: updates each time when getEvidencesByIdRaw is changed
  (sortedIds, entityById) => sortedIds.map(id => entityById.get(id).toJS())
)

export const getStartDate = createSelector(
  [getSortedIds, getEvidencesByIdRaw],
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
