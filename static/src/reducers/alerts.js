import Immutable from 'immutable'

import { createReducer } from './_helper'

export const APPEND_ALERT = 'ALERT:APPEND'
export const REMOVE_ALERT = 'ALERT:REMOVE'

export default createReducer(
  Immutable.Map(),
  {
    [APPEND_ALERT]: (state, action) => state,
    [REMOVE_ALERT]: (state, action) => state
  }
)
