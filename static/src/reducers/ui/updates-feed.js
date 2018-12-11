import Immutable from 'immutable'
import _ from 'lodash'

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
    [actionTypes.INSERT_ITEM]: (state, { payload: { index, item } }) => state.update(
      'data', data => data.insert(index, item.id)
    ),

    [actionTypes.INSERT_ITEMS]: (state, { payload: { indexes, items } }) => state.update(
      'data', data => _.zip(indexes, items)
        .reduce(
          (acc, [idx, item]) => acc.insert(idx, item.id),
          data
        )
    )
  }
)
