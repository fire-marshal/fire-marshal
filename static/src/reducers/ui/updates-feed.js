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
  {
    // feed list
    data: [],
    // wait to merge feed list
    onDemand: new Set(),
    // should we update feed list in realtime
    realtime: false,
    // feed view mode
    viewMode: viewModes.LIST
  },

  {
    [actionTypes.CLEAR_ON_DEMAND]: (draft) => {
      draft.onDemand = new Set()
    },

    [actionTypes.INSERT_IDS_TO_THE_FEED]: (draft, { payload: { ids, indexes } }) => {
      _.zip(indexes, ids).forEach(
        ([idx, id]) => draft.data.splice(idx, 0, id)
      )
    },

    [entitiesActionTypes.INSERT_ITEM]: (draft, { payload: { index, item } }) => {
      if (draft.realtime) {
        if (index !== undefined) {
          draft.data.splice(index, 0, item.id)
        }
      } else {
        // Immer doesn't support Set https://github.com/mweststrate/immer#pitfalls
        const onDemand = new Set(draft.onDemand)
        onDemand.add(item.id)
        draft.onDemand = onDemand
      }
    },

    [entitiesActionTypes.INSERT_ITEMS]: (draft, { payload: { indexes, items } }) => {
      if (draft.realtime) {
        _.zip(indexes, items)
          .filter(([idx, item]) => idx !== undefined)
          .forEach(
            ([idx, item]) => draft.data.splice(idx, 0, item.id)
          )
      } else {
        // Immer doesn't support Set https://github.com/mweststrate/immer#pitfalls
        const onDemand = new Set(draft.onDemand)
        items.forEach(item => onDemand.add(item.id))
        draft.onDemand = onDemand
      }
    },

    [actionTypes.SET_REAL_TIME]: (draft, { payload: { enable } }) => {
      draft.realtime = enable
    },

    [actionTypes.SET_VIEW_MODE]: (draft, { payload: { viewMode } }) => {
      draft.viewMode = viewMode
    }
  }
)
