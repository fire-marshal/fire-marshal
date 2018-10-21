/**
 * Create reducer by mapping event to handler
 *
 * @param initialState
 * @param handlers
 *
 * @returns {reducer}
 */
export function createReducer (initialState, handlers) {
  return function reducer (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
