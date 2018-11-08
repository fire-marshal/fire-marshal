import Immutable from 'immutable'

import { createReducer } from './_helper'

import config from '../config'

import { fetchActionSimplified } from '../async-queue/fetch-action'
import asyncReducer from '../async-queue/reducer-builder'

import { prepareUrl } from '../requests/api-url-processor'

export const APPEND_ALERT = 'ALERT:APPEND'
export const REMOVE_ALERT = 'ALERT:REMOVE'

export const EVIDENCES_REQUEST = 'EVIDENCES:REQUEST'
export const EVIDENCES_RECEIVE = 'EVIDENCES:RECEIVE'
export const EVIDENCES_ERROR = 'EVIDENCES:ERROR'

export const fetchEvidences = fetchActionSimplified({
  getUrl: ({ lat, long }) => prepareUrl(config.evidences.api_url, {
    lat, long
  }),

  actions: [EVIDENCES_REQUEST, EVIDENCES_RECEIVE, EVIDENCES_ERROR]
})

// TODO: data structure
// it would be better to store information about some bigger events or related (connected)
//
export default createReducer(
  Immutable.fromJS({
    invalid: true,
    error: null,
    data: null,
    updateAt: null
  }),
  {
    [APPEND_ALERT]: (state, action) => state,
    [REMOVE_ALERT]: (state, action) => state,

    ...asyncReducer(
      [EVIDENCES_REQUEST, EVIDENCES_RECEIVE, EVIDENCES_ERROR],
      // TODO: we should get total and store it as well
      // so later we be able to check whether we need to show more or not
      (res) => res.items
    )
  }
)
