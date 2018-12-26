import { useEffect } from 'react'
import createDetectElementResize from './vendor/detect-element-resize'

/**
 * Get size of DOM element
 *
 * @param el
 * @returns {{height: number, width: number}}
 */
function getElSize (el) {
  const style = window.getComputedStyle(el) || {}
  const paddingLeft = parseInt(style.paddingLeft, 10) || 0
  const paddingRight = parseInt(style.paddingRight, 10) || 0
  const paddingTop = parseInt(style.paddingTop, 10) || 0
  const paddingBottom = parseInt(style.paddingBottom, 10) || 0

  const height = (el.offsetHeight || 0) - paddingTop - paddingBottom
  const width = (el.offsetWidth || 0) - paddingLeft - paddingRight

  return { height, width }
}

/**
 * Listen component resize event
 *
 * @param ref
 * @param onResize
 * @param conditions {array} list
 */
export default (ref, onResize, conditions = []) => {
  useEffect(() => {
    // console.log('useResize.start', ref, ref.current)
    let previousWidth = null
    let previousHeight = null

    const onResizeCard = () => {
      const newSize = getElSize(ref.current)
      const { width, height } = newSize
      if (width !== previousWidth || height !== previousHeight) {
        onResize(newSize)
        previousWidth = width
        previousHeight = height
      }
    }

    const _detectElementResize = createDetectElementResize()
    _detectElementResize.addResizeListener(
      ref.current,
      onResizeCard
    )

    return () => {
      // console.log('useResize.removeResizeListener')
      _detectElementResize.removeResizeListener(
        ref.current,
        onResizeCard
      )
    }
    // we can't use onResize because if we will pass arrow function here
    // we will refresh effect each render call
  }, conditions.concat(ref))
}
