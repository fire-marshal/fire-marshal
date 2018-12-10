import Immutable from 'immutable'

import { createReducer } from './_helper'

const namespace = require('../../package').name

const actionTypes = {
  INSERT_ITEM: `${namespace}/UPDATES_FEED.INSERT_ITEM`
}

export const insertItem = (payload) => ({
  type: actionTypes.INSERT_ITEM,
  payload
})

export default createReducer(
  Immutable.Map({
    invalid: true,
    sortByOrder: 'asc',
    sortByField: 'when.estimation',
    data: Immutable.List()
  }),

  {
    [actionTypes.INSERT_ITEM]: (state, { payload }) => state.update(
      'data', data => data.insert(payload.index, payload.id)
    )
  }
)
