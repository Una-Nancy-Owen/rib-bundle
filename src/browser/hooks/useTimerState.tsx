import { TimerState } from 'rib-bundle'
import { useEffect, useState } from 'react'

export default function useTimerState() {
  const [timerState, setTimerState] = useState<TimerState>()
  useEffect(() => {
    nodecg.Replicant('timerState').on('change', (newValue) => {
      if (newValue != null) {
        setTimerState({ ...newValue })
      }
    })
  }, [])
  return timerState
}
