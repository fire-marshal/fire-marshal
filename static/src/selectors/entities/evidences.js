import { createSelector } from 'reselect'

export const getEvidences = state => state.entities.evidences

const getEvidenceDataRaw = createSelector(
  [getEvidences],
  (evidences) => evidences.data
)

export const getEvidencesByIdRaw = createSelector(
  [getEvidenceDataRaw],
  (data) => data && data.byId
)

export const getTotalItems = createSelector(
  [getEvidenceDataRaw],
  (data) => data && data.total
)

export const hasMore = createSelector(
  [getEvidencesByIdRaw, getTotalItems],
  (byId, total) => (byId && total > 0) ? (Object.keys(byId).length < total) : false
)

export const getEvidenceItemsInProgress = createSelector(
  [getEvidences],
  (evidences) => evidences && evidences.inProgress
)

export const getEvidenceItemsInvalid = createSelector(
  [getEvidences],
  (evidences) => evidences && evidences.invalid
)

export const getEvidenceError = createSelector(
  [getEvidences],
  (evidences) => evidences && evidences.error
)
