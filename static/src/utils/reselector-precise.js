import { createSelectorCreator, defaultMemoize } from 'reselect'

/**
 * Create selector with custom validator
 *
 * @param funcs
 */
export default function createSelectorPrecise (...funcs) {
  return (areArgumentsEqual) => {
    function scepticalMemoize (func, globalState = true) {
      // memoize is called twice in createSelectorCreator
      // 1) when compare global state (won't be passed custom options - globalState)
      // 2) when compare local parameters (will be passed custom options - globalState)

      // because Precise selector creator target to compare local parameters
      // we redirect global compare to default memorize
      if (globalState) {
        return defaultMemoize(func)
      }

      let lastArgs = null
      let lastResult = null

      // we reference arguments instead of spreading them for performance reasons
      return function (...args) {
        if (lastArgs === null || args === null || lastArgs.length !== args.length || !areArgumentsEqual(lastArgs, args)) {
          // apply arguments instead of spreading for performance
          lastResult = func.apply(null, args)
        }

        lastArgs = args
        return lastResult
      }
    }

    return createSelectorCreator(scepticalMemoize, false)(...funcs)
  }
}
