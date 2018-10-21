import { createSelector } from 'reselect'

export const getEvidences = state => state.get('evidences')

export const getEvidenceItems = createSelector(
  [getEvidences],
  (evidences) => evidences.toJS()
)
