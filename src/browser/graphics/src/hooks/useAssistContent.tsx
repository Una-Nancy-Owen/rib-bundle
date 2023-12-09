import { useCallback, useEffect, useRef } from 'react'
import { AssistContent } from 'rib-bundle'
// 見どころの改行対応
export default function useAssistContent() {
  const headerRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    nodecg.Replicant('assistContent').on('change', (newValue) => {
      if (newValue != null) {
        setContent(newValue)
      }
    })
    setTimeout(() => {
      nodecg.readReplicant('assistContent', (value) => {
        if (value != null) {
          setContent(value)
        }
      })
    }, 100)
  }, [])

  const setContent = useCallback((value: AssistContent) => {
    const header = value.header
    const content = value.content
    const image = value.url
    if (headerRef.current != null) {
      headerRef.current.innerText = header
    }
    if (contentRef.current != null) {
      contentRef.current.innerText = content
    }
    if (imageRef.current != null) {
      imageRef.current.src = image
      if (image == '') {
        imageRef.current.style.width = '0'
        imageRef.current.style.height = '0'
        imageRef.current.style.padding = '0'
      } else {
        imageRef.current.style.width = 'auto'
        imageRef.current.style.height = 'auto'
        imageRef.current.style.padding = '4px'
      }
    }
  }, [])

  if (headerRef != null && contentRef != null && imageRef != null) {
    return (
      <>
        <p ref={headerRef} />
        <p ref={contentRef} />
        <img ref={imageRef} />
      </>
    )
  } else {
    return null
  }
}
