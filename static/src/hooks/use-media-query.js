import { useEffect, useState } from 'react'

export function useMediaQuery (mediaQueryString) {
  const [matches, setMatches] = useState()

  useEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQueryString)

    setMatches(mediaQueryList.matches)

    const handleChange = e => setMatches(e.matches)
    mediaQueryList.addEventListener('change', handleChange)
    return () => mediaQueryList.removeEventListener('change', handleChange)
  }, [mediaQueryString])

  return matches
}
