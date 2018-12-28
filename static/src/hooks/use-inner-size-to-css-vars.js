import { useEffect } from 'react'

/**
 * Update css variable vh inner height
 *
 * useful for mobile devices.
 * more about https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
 *
 * @param target {ref|null} element (window by default)
 * @param heightName {string} height variable name (--vh by default)
 * @param widthName {string} width variable name (--vw by default)
 */
export function useInnerSizeToCSSVars ({
  target = null,
  heightName = '--vh',
  widthName = '--vw'
} = {}) {
  useEffect(() => {
    let vwPrevious = null
    let vhPrevious = null

    const handler = () => {
      let el = target ? target.current : window
      let vw = el.innerWidth * 0.01
      let vh = el.innerHeight * 0.01
      if (vwPrevious !== vw) {
        vwPrevious = vw
        document.documentElement.style.setProperty(widthName, `${vw}px`)
      }
      if (vhPrevious !== vh) {
        vhPrevious = vh
        document.documentElement.style.setProperty(heightName, `${vh}px`)
      }
    }

    // FIXME: there is strange issue with getting innerHeight on rotation devices
    // in resize handle

    // without timeout
    //
    // [vertical]
    //
    // el.innerWidth 412
    // el.innerHeight 604
    //
    // [horizontal]
    //
    // el.innerWidth 732
    // el.innerHeight 284
    //
    // [vertical]
    //
    // el.innerWidth 732     <------ preserve old width
    // el.innerHeight 1073   <------ scale height

    // with timeout
    //
    // [vertical]
    //
    // el.innerWidth 412
    // el.innerHeight 604
    //
    // [horizontal]
    //
    // el.innerWidth 732
    // el.innerHeight 284
    //
    // el.innerWidth 412
    // el.innerHeight 604

    const lazyHandler = () => setTimeout(handler)

    window.addEventListener('resize', lazyHandler)

    handler()

    return () => {
      window.removeEventListener('resize', lazyHandler)
    }
  }, [target, heightName, widthName])
}
