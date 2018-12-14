import Immutable from 'immutable'
import _ from 'lodash'

import { createReducer } from '../_helper'
import { actionTypes as entitiesActionTypes } from '../entities/evidences'

const namespace = `${require('../../../package').name}/UI/UPDATES_FEED`

//
// actions
//

export const actionTypes = {
  CLEAR_ON_DEMAND: `${namespace}/CLEAR_ON_DEMAND`,
  INSERT_IDS_TO_THE_FEED: `${namespace}/INSERT_IDS_TO_THE_FEED`,
  MOVE_ON_DEMAND_IDS_TO_THE_FEED: `${namespace}/MOVE_ON_DEMAND_IDS_TO_THE_FEED`
}

//
// action creators
//

export const clearOnDemand = () => ({
  type: actionTypes.CLEAR_ON_DEMAND
})

export const insertIdsToTheFeed = (payload) => ({
  type: actionTypes.INSERT_IDS_TO_THE_FEED,
  payload
})

export const moveOnDemandIdsToTheFeed = () => ({
  type: actionTypes.MOVE_ON_DEMAND_IDS_TO_THE_FEED
})

//
// reducers
//

export default createReducer(
  Immutable.Map({
    data: Immutable.List(),
    onDemand: Immutable.Set()
  }),

  {
    [actionTypes.CLEAR_ON_DEMAND]: (state) => state.set('onDemand', Immutable.Set()),

    [entitiesActionTypes.INSERT_ITEM]: (state, { payload: { index, item, realTime } }) => {
      if (realTime) {
        if (index !== undefined) {
          return state.update(
            'data', data => data.insert(index, item.id)
          )
        } else {
          return state
        }
      } else {
        return state.update(
          'onDemand', onDemand => onDemand.add(item.id)
        )
      }
    },

    [entitiesActionTypes.INSERT_ITEMS]: (state, { payload: { indexes, items, realTime } }) => {
      if (realTime) {
        return state.update(
          'data', data => _.zip(indexes, items)
            .filter(([idx, item]) => idx !== undefined)
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
