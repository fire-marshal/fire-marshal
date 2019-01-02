import { createSelector } from 'reselect'

export const getEvidences = state => state.entities.evidences

const getEvidenceData = createSelector(
  [getEvidences],
  (evidences) => evidences.data
)

export const getEvidencesById = createSelector(
  [getEvidenceData],
  (data) => data && data.byId
)

export const getTotalItems = createSelector(
  [getEvidenceData],
  (data) => data && data.total
)

export const hasMore = createSelector(
  [getEvidencesById, getTotalItems],
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
