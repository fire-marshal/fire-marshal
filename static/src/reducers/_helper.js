import produce from 'immer'

/**
 * Create reducer by mapping event to handler
 * - wrap to immer (inspired by @redux-starter-kit)
 *
 * @param initialState
 * @param handlers
 *
 * @returns {function(*=, *=): Produced<*, void>}
 */
export function createReducer (initialState, handlers) {
  return function reducer (state = initialState, action) {
    return produce(state, draft => {
      if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](draft, action)
      } else {
        return draft
      }
    })
  }
}
