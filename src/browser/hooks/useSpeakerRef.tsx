import { Speaker } from 'rib-bundle'
import { RefObject, createRef, useCallback, useEffect, useRef } from 'react'
import { HiSpeakerWave } from 'react-icons/hi2'
import { styled } from 'styled-components'

export default function useSpeakerRef(num: number) {
  const speakerRef = useRef<RefObject<HTMLDivElement>[]>([])
  useEffect(() => {
    for (let i = 0; i < num; i++) {
      speakerRef.current.push(createRef<HTMLDivElement>())
    }
    nodecg.Replicant('speaker').on('change', (newValue) => {
      if (newValue != null) {
        updateSpeaker({ ...newValue })
      }
    })
  }, [])

  const updateSpeaker = useCallback((speaker: Speaker) => {
    if (speaker != null) {
      speaker.enabled.forEach((enabled, index) => {
        if (index < speakerRef.current.length) {
          if (speakerRef.current![index] != null) {
            if (speakerRef.current[index].current != null) {
              speakerRef.current[index].current!.style.opacity = enabled ? '1' : '0'
            }
          }
        }
      })
    }
  }, [])

  return speakerRef.current.map((_value, index) => (
    <StSpeaker ref={speakerRef.current[index]}>
      <HiSpeakerWave />
    </StSpeaker>
  ))
}

const StSpeaker = styled.div`
  opacity: 0;
  & > svg {
    fill: rgb(255 219 62);
  }
`
