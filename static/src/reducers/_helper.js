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
  // wrap each handler to immer
  handlers = Object.keys(handlers)
    .map(key => produce((draft, action) => handlers[key](draft, action)))

  return function reducer (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
