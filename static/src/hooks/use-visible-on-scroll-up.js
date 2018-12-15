import { useEffect, useRef, useState } from 'react'

/**
 * Hook makes visible when user scroll up, and hides when scroll down
 *
 * @param initialVisibility {boolean}
 * @returns {*[]}
 */
const useVisibleOnScrollUp = (initialVisibility = true) => {
  const elRef = useRef()
  const [visible, setVisibility] = useState(initialVisibility)

  useEffect(() => {
    let previousScrollTop = window.pageYOffset
    // TODO: it would be better to use event listeners

    console.log('elRef.current', elRef.current)

    function handleScroll (event) {
      // IE doesn't support "scrollingElement" but who care ;)
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
  }, [elRef])

  return [visible, elRef]
}

export default useVisibleOnScrollUp
