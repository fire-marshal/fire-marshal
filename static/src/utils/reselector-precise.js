import { createSelectorCreator } from 'reselect'

/**
 * Create selector with custom validator
 *
 * @param funcs
 */
export default function createSelectorPrecise (...funcs) {
  return (areArgumentsEqual) => {
    function defaultMemoize (func) {
      let lastArgs = null
      let lastResult = null

      // we reference arguments instead of spreading them for performance reasons
      return function (...args) {
        if (lastArgs === null || args === null || !areArgumentsEqual(Array.from(lastArgs), Array.from(args))) {
          // apply arguments instead of spreading for performance
          lastResult = func.apply(null, args)
        }

        lastArgs = arguments
        return lastResult
      }
    }

    return createSelectorCreator(defaultMemoize)(...funcs)
  }
}
