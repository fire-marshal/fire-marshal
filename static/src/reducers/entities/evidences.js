import Immutable from 'immutable'

import { createReducer } from '../_helper'

import config from '../../config'

import { fetchActionSimplified } from '../../utils/async-queue/fetch-action'
import asyncReducer from '../../utils/async-queue/reducer-builder'
import { prepareUrl } from '../../utils/api-url-processor'

const namespace = `${require('../../../package').name}/ENTITIES/EVIDENCES`

//
// actions
//

// append new items to already existing list
export const actionTypes = {
  APPEND_EVIDENCES_REQUEST: `${namespace}.APPEND:REQUEST`,
  APPEND_EVIDENCES_RECEIVE: `${namespace}.APPEND:RECEIVE`,
  APPEND_EVIDENCES_ERROR: `${namespace}.APPEND:ERROR`,

  INSERT_ITEM: `${namespace}.INSERT_ITEM`,
  INSERT_ITEMS: `${namespace}.INSERT_ITEMS`
}

//
// action creators
//

export const fetchEvidences = fetchActionSimplified({
  getUrl: ({ lat, long, startDateISO }) => {
    let ops = null
    if (startDateISO) {
      ops = { start_date: startDateISO } // eslint-disable-line camelcase
    }

    return prepareUrl(config.evidences.apiURLWithStartDate, {
      lat, long, ops
    })
  },

  actions: [actionTypes.APPEND_EVIDENCES_REQUEST, actionTypes.APPEND_EVIDENCES_RECEIVE, actionTypes.APPEND_EVIDENCES_ERROR],

  /**
   * Filter out duplications
   *
   * @param res
   *
   * @returns {{items: array, total: number}}
   */
  process: ({ res }) => ({
    items: res.items,
    total: res.total
  })
})

/**
 * Insert new evidence entity
 *
 * @param payload {object}
 * @returns {{type: string, payload: *}}
 */
export const insertItem = (payload) => ({
  type: actionTypes.INSERT_ITEM,
  payload
})

/**
 * Insert new evidence entities
 *
 * @param payload {{ indexes: array, items: array, total: number }}
 * @returns {{type: string, payload: *}}
 */
export const insertItems = (payload) => ({
  type: actionTypes.INSERT_ITEMS,
  payload
})

//
// reducers
//

// TODO: data structure
// it would be better to store information about some bigger events or related (connected)
//
export default createReducer(
  Immutable.fromJS({
    inProgress: false,
    invalid: true,
    error: null,
    updateAt: null,
    data: {
      // items by its id
      byId: Immutable.Map(),
      // total (globally, not only on this client) number of items
      total: 0
    }
  }),
  {
    ...asyncReducer([
      actionTypes.APPEND_EVIDENCES_REQUEST,
      actionTypes.APPEND_EVIDENCES_RECEIVE,
      actionTypes.APPEND_EVIDENCES_ERROR
    ]),

    [actionTypes.INSERT_ITEMS]: (state, { payload: { items, total } }) => {
      // TODO: there we could optimize a little
      // we can element which we had before
      // so if we just replace old with new one
      // all dependent selectors will update it own state
      // but maybe we got the same item (not only by id but by content as well)
      // so we could check whether it really new
      return state.update('data', data => data
        .update('byId', byId =>
          items.reduce((acc, item) => acc.set(item.id, Immutable.fromJS(item)), byId))
        .set('total', total)
      )
    },

    [actionTypes.INSERT_ITEM]: (state, { payload: { item } }) => {
      return state.update('data', data => data
      // TODO: because we can get the same item but with new data we should differ them
      // and update total only in case of new item
        .update('total', total => total + 1)
        .update('byId', byId => byId.set(item.id, Immutable.fromJS(item))))
    }
  }
)
