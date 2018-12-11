import Immutable from 'immutable'
import _ from 'lodash'

import { createReducer } from '../_helper'
import { actionTypes } from '../entities/evidences'

export default createReducer(
  Immutable.Map({
    invalid: true,
    sortByOrder: 'asc',
    sortByField: 'when.estimation',
    data: Immutable.List(),
    onDemand: Immutable.Set()
  }),

  {
    [actionTypes.INSERT_ITEM]: (state, { payload: { index, item, realTime } }) => {
      if (realTime) {
        return state.update(
          'data', data => data.insert(index, item.id)
        )
      } else {
        return state.update(
          'onDemand', onDemand => onDemand.add(item.id)
        )
      }
    },

    [actionTypes.INSERT_ITEMS]: (state, { payload: { indexes, items, realTime } }) => {
      if (realTime) {
        return state.update(
          'data', data => _.zip(indexes, items)
            .reduce(
              (acc, [idx, item]) => acc.insert(idx, item.id),
              data
            )
        )
      } else {
        return state.update(
          'onDemand', onDemand => items.reduce(
            (acc, item) => acc.add(item.id),
            onDemand
          )
        )
      }
    }
  }
)
