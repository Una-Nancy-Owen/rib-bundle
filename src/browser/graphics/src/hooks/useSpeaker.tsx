import { Speaker } from 'rib-bundle'
import { useEffect, useState } from 'react'

export default function useSpeaker() {
  const [speaker, setSpeaker] = useState<Speaker>()
  useEffect(() => {
    nodecg.Replicant('speaker').on('change', (newValue) => {
      if (newValue != null) {
        setSpeaker({ ...newValue })
      }
    })
  }, [])
  return speaker
}
