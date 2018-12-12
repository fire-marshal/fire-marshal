import { createSelector } from 'reselect'

export const getEvidences = state => state.getIn(['entities', 'evidences'])

const getEvidenceDataRaw = createSelector(
  [getEvidences],
  (evidences) => evidences && evidences.get('data')
)

export const getEvidenceItemsRaw = createSelector(
  [getEvidenceDataRaw],
  (data) => data && data.get('items')
)

export const getEvidenceItems = createSelector(
  [getEvidenceItemsRaw],
  (raw) => raw && raw.toJS()
)

export const getEvidencesByIdRaw = createSelector(
  [getEvidenceDataRaw],
  (data) => data && data.get('byId')
)

export const getTotalItems = createSelector(
  [getEvidenceDataRaw],
  (data) => data && data.get('total')
)

export const hasMore = createSelector(
  [getEvidencesByIdRaw, getTotalItems],
  (byId, total) => (byId && total > 0) ? (byId.size < total) : false
)

export const getEvidenceItemsInProgress = createSelector(
  [getEvidences],
  (evidences) => evidences && evidences.get('inProgress')
)

export const getEvidenceItemsInvalid = createSelector(
  [getEvidences],
  (evidences) => evidences && evidences.get('invalid')
)

export const getEvidenceError = createSelector(
  [getEvidences],
  (evidences) => evidences && evidences.get('error')
)

export const getIdsRaw = createSelector(
  [getEvidenceDataRaw],
  (data) => data && data.get('ids')
)
