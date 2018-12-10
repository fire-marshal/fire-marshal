import { createSelector } from 'reselect'

export const getEvidences = state => state.getIn(['entities', 'evidences'])

const getEvidenceDataRaw = createSelector(
  [getEvidences],
  (evidences) => evidences && evidences.get('data')
)

export const getEvidencesRaw = createSelector(
  [getEvidenceDataRaw],
  (data) => data && data.get('itemsMap')
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

export const getEvidencesById = createSelector(
  [getEvidencesByIdRaw],
  (data) => data && data.toJS()
)

export const getTotalItems = createSelector(
  [getEvidenceDataRaw],
  (data) => data && data.get('total')
)

export const hasMore = createSelector(
  [getEvidenceItems, getTotalItems],
  (items, total) => (items && total > 0) ? (items.length < total) : false
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

export const getStartDate = createSelector(
  [getEvidenceDataRaw],
  (data) => data && data.get('startDate')
)

export const getStartDateISO = createSelector(
  [getStartDate],
  (date) => date && date.toISOString()
)

export const getIdsRaw = createSelector(
  [getEvidenceDataRaw],
  (data) => data && data.get('ids')
)
