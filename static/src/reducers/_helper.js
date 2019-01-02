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
  // wrap each handler to Immer
  handlers = Object.entries(handlers)
    .reduce((acc, [key, handler]) => {
      acc[key] = produce(
        (draft, action) => handler(draft, action)
      )
      return acc
    }, {})

  return function reducer (state = initialState, action) {
    if (action && handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
