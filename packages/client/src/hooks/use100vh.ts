import { useEffect, useRef } from 'react'

const use100vh = (): number | null => {
  // Not using or updating state since that triggers rerender for whole dom tree
  const heightRef = useRef(measureDocumentHeight())

  const setMeasuredHeight = () => {
    heightRef.current = measureDocumentHeight()
    const rootEl = document.documentElement
    const currentHeight = rootEl.style.getPropertyValue('--100vh')
    const newHeight = `${heightRef.current}px`
    if (currentHeight !== newHeight) {
      rootEl.style.setProperty('--100vh', newHeight)
    }
  }

  useEffect(() => {
    setMeasuredHeight()
    window.addEventListener('resize', setMeasuredHeight)
    return () => window.removeEventListener('resize', setMeasuredHeight)
  }, [])

  return heightRef.current
}

export const measureDocumentHeight = (): number | null => {
  return document.documentElement?.clientHeight || window.innerHeight
}

export default use100vh
