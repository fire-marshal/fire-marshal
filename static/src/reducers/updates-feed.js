/* eslint-disable */

import Immutable from 'immutable'
import _ from 'lodash'

const wssActions = require('../../../wss/lib/agents/evidences/actions')

import { getSortByFieldAsArray, getSortedFieldValue } from '../selectors/updates-feed'

import { createReducer } from './_helper'
import { actionTypes } from './evidences'

export default createReducer(
  Immutable.Map({
    invalid: true,
    sortByOrder: 'asc',
    sortByField: 'when.estimation',
    data: Immutable.List()
  }),

  {
    // one more item
    [wssActions.actionTypes.ADD]: (state, action) => state,

    // bunch of new items
    [actionTypes.APPEND_EVIDENCES_RECEIVE]: (state, { payload }) => {
      const { newItems } = payload

      // FIXME: state refer to current reducer state
      // so we don't have access here to evidences
      // and selectors doesn't work

      // possible solution:

      // 1. (TRY)

      // we have global state on creating actions,
      // so we should do all that work there

      // in case of websockets we also create action so we should pre-process data

      // 2. (NO)

      // this reducer should be part of evidences reducer
      // won't work in case of many different entities in a single feed

      // 3. (NO)

      // create custom combineReducer which would based on
      // https://github.com/gajus/redux-immutable/
      // but would send global app state, so would be able to use selectors here

      // we can use https://github.com/redux-utilities/reduce-reducers

      // cons:

      // @gaearon https://github.com/reduxjs/redux/issues/601#issuecomment-196279530

      // when we pass and use global scope to a reducer it becomes depends coupled
      // to other or even each other. What makes harder to refactor code

      // 4. (NO)

      // move sorting to the selector
      // recommendation from @gaearon
      // https://github.com/reduxjs/redux/issues/601#issuecomment-196272085

      // it could make sense
      // because actually we care about soring on visualization side

      // But cons:
      // - each time we get new element we should sort items on selector again
      // N(n*log(n))

      // but when we sort on adding items we just need to insert
      // N(log(n))

      // turn off all the rest

      return state

      // TODO: should remove once would choose right way

      console.log(state.toJS())

      // const field = getSortByFieldAsArray(state)
      // console.log('field', field)
      const field = 'when.estimation'

      const sortedValues = getSortedFieldValue(state) || []
      console.log('newItems', newItems)

      // insert in a feed according to sort field
      return state.update('data', data => newItems.reduce(({ data, sortedValues }, item) => {
          // find position
          const itemValue = _.get(item, field)

          // insert in this position
          const idx = binarySearch(sortedValues, itemValue)

          // insert
          sortedValues.splice(idx, 0, itemValue);
          return {
            data: data.insert(idx, item.id),
            sortedValues
          }
        }, { data, sortedValues }).data
      )
    }
  }
)

/**
 * Find position in sorted array
 *
 * @param {array} values
 * @param newValue
 * @returns {number}
 */
function binarySearch (values, newValue) {
  let minIdx = 0
  let maxIdx = values.length - 1
  while (minIdx !== maxIdx) {
    let idx = (maxIdx - minIdx) >> 1
    if (values[idx] > newValue) {
      maxIdx = idx
    } else if (values[idx] < newValue) {
      minIdx = idx
    } else {
      return idx
    }
  }

  return maxIdx
}
