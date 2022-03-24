import React, { useCallback, useEffect, useState } from 'react'

const useFullSize = <T extends HTMLElement>(elementRef: React.RefObject<T>) => {
  const [{ width, height }, setSize] = useState({
    width: 0,
    height: 0,
  })

  const updateSize = useCallback(() => {
    const size = getElementSize(elementRef)
    setSize(size)
  }, [elementRef])

  useEffect(() => {
    updateSize()
    window.addEventListener('load', updateSize)
    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
      window.removeEventListener('load', updateSize)
    }
  }, [width, height, updateSize])

  return { width, height }
}

export default useFullSize

function getElementSize<T extends HTMLElement>(elementRef: React.RefObject<T>) {
  if (elementRef && elementRef.current) {
    const { clientHeight: height, clientWidth: width } = elementRef.current
    return { height, width }
  } else return { height: 0, width: 0 }
}
