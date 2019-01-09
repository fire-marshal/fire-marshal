import _ from 'lodash'
import { createSelector } from 'reselect'

import { extractLatLng } from '../../reducers/entities/model'
import getBounce from '../../utils/map/get-bounce'
import createSelectorPrecise from '../../utils/reselector-precise'

import { getEvidencesById } from '../entities/evidences'

const getUpdatesFeed = state => state.ui.updatesFeed

export const isAutomaticMapFitting = createSelector(
  [getUpdatesFeed],
  (feed) => feed.autoMapFitting
)

export const getSortedIds = createSelector(
  [getUpdatesFeed],
  (feed) => feed.data
)

export const getOnDemand = createSelector(
  [getUpdatesFeed],
  (feed) => feed.onDemand
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

export const getItemsBounce = createSelector(
  [getSortedItems],
  items => items && getBounce(items.map(extractLatLng))
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

export const getSelectedId = createSelector(
  [getUpdatesFeed],
  (feed) => feed.selectedId
)

export const getSelectedItem = createSelector(
  [getSelectedId, getEvidencesById],
  (selectedId, entityById) => entityById[selectedId]
)

export const getSelectionSource = createSelector(
  [getUpdatesFeed],
  (feed) => feed.selectionSource
)

// mix extra field - isSelected
// we should make it part of a list because component react-window
// which we use to render long list of items, re-render items when gets new list
export const getSortedItemsWithSelection = createSelector(
  [getSortedItems, getSelectedId],
  (items, selectedId) => items.map(i => ({ ...i, isSelected: (i.id === selectedId) }))
)
