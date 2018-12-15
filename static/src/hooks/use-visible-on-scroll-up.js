import { useEffect } from 'react'

/**
 * Hook makes visible when user scroll up, and hides when scroll down
 *
 * @param initialVisibility {boolean}
 * @param setVisibility {function}
 */
const useVisibleOnScrollUp = ({ initialVisibility = true, setVisibility }) => {
  useEffect(() => {
    let previousScrollTop = window.pageYOffset
    // TODO: it would be better to use event listeners

    function handleScroll (event) {
      // IE doesn't support "scrollingElement" but who cares ;)
      // if we would really need it
      // we can use polyfill
      // https://github.com/yangg/scrolling-element
      const currentScrollPos = event.srcElement.scrollingElement.scrollTop
      if (previousScrollTop > currentScrollPos) {
        setVisibility(true)
      } else {
        setVisibility(false)
      }
      previousScrollTop = currentScrollPos
    }

    // TODO: do we need 'mousewheel' here?
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
}

export default useVisibleOnScrollUp
