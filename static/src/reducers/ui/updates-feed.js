import Immutable from 'immutable'

import { createReducer } from '../_helper'
import { actionTypes } from '../entities/evidences'

export default createReducer(
  Immutable.Map({
    invalid: true,
    sortByOrder: 'asc',
    sortByField: 'when.estimation',
    data: Immutable.List()
  }),

  {
    [actionTypes.INSERT_ITEM]: (state, { payload }) => state.update(
      'data', data => data.insert(payload.index, payload.item.id)
    )
  }
)
