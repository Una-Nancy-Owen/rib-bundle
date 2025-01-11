import { useCallback, useEffect, useRef } from 'react'


/**
 * ロゴ画像を表示するためのコンポーネント
 */

export default function useLogo() {
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    nodecg.Replicant('logo').on('change', (newValue) => {
      if (newValue != null) {
        setImage(newValue.url)
      }
    })
  }, [])
  setTimeout(() => {
    nodecg.readReplicant('logo', (value) => {
      if (value != null) {
        setImage(value.url)
      }
    })
  }, 100)
  const setImage = useCallback((imageUrl: string) => {
    if (imageRef.current != null) {
      imageRef.current.src = imageUrl
      if (imageUrl == '') {
        imageRef.current.style.width = '0'
        imageRef.current.style.height = '0'
      } else {
        imageRef.current.style.width = 'auto'
        imageRef.current.style.height = 'auto'
      }
    }
  }, [])

  if (imageRef != null) {
    return <img ref={imageRef} />
  } else {
    return null
  }
}
