import { createSelector } from 'reselect'

export const getEvidences = state => state.get('evidences')

const getEvidenceItemsRaw = createSelector(
  [getEvidences],
  (evidences) => evidences.get('data')
)

export const getEvidenceItems = createSelector(
  [getEvidenceItemsRaw],
  (raw) => raw && raw.toJS()
)

export const getEvidenceItemsInProgress = createSelector(
  [getEvidences],
  (evidences) => evidences.get('inProgress')
)

export const getEvidenceError = createSelector(
  [getEvidences],
  (evidences) => evidences.get('error')
)
