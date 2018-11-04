import { createSelector } from 'reselect'

export const getEvidences = state => state.get('evidences')

export const getEvidenceItems = createSelector(
  [getEvidences],
  (evidences) => evidences.get('data').toJS()
)

export const getEvidenceItemsInProgress = createSelector(
  [getEvidences],
  (evidences) => evidences.get('inProgress')
)

export const getEvidenceError = createSelector(
  [getEvidences],
  (evidences) => evidences.get('error')
)
