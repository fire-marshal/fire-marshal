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
  MOVE_ON_DEMAND_IDS_TO_THE_FEED: `${namespace}/MOVE_ON_DEMAND_IDS_TO_THE_FEED`,
  SET_REAL_TIME: `${namespace}/SET_REAL_TIME`,
  SET_VIEW_MODE: `${namespace}/SET_VIEW_MODE`
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

export const enableRealtime = (enable) => ({
  type: actionTypes.SET_REAL_TIME,
  payload: {
    enable
  }
})


export const setViewMode = (viewMode) => ({
  type: actionTypes.SET_VIEW_MODE,
  payload: { viewMode }
})

//
// reducers
//

export const viewModes = {
  LIST: 'LIST',
  MAP: 'MAP',
  LIST_N_MAP: 'LIST_N_MAP'
}

export const isList = (viewMode) => viewMode === viewModes.LIST || viewMode === viewModes.LIST_N_MAP
export const isMap = (viewMode) => viewMode === viewModes.MAP || viewMode === viewModes.LIST_N_MAP

export default createReducer(
  Immutable.Map({
    // feed list
    data: Immutable.List(),
    // wait to merge feed list
    onDemand: Immutable.Set(),
    // should we update feed list in realtime
    realtime: false,
    // feed view mode
    viewMode: viewModes.LIST
  }),

  {
    [actionTypes.CLEAR_ON_DEMAND]: (state) => state.set('onDemand', Immutable.Set()),

    [actionTypes.INSERT_IDS_TO_THE_FEED]: (state, { payload: { ids, indexes } }) =>
      state.update(
        'data', data => _.zip(indexes, ids)
          .reduce(
            (acc, [idx, id]) => acc.insert(idx, id),
            data
          )
      ),

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
    },

    [actionTypes.SET_REAL_TIME]: (state, { payload: { enable } }) =>
      state.set('realtime', enable),

    [actionTypes.SET_VIEW_MODE]: (state, { payload: { viewMode } }) =>
      state.set('viewMode', viewMode)
  }
)
