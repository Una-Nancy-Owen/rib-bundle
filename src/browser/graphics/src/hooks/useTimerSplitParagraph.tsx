import { Timer, TimerGroup } from 'rib-bundle'
import { RefObject, createRef, useCallback, useEffect, useRef } from 'react'

export default function useTimerSplitParagraph(num: number) {
  const timerMainRef = useRef<RefObject<HTMLParagraphElement>[]>([])
  const timerSubRef = useRef<RefObject<HTMLParagraphElement>[]>([])
  const normalCol: string = 'rgb(255, 255, 255)'
  const finishedCol: string = 'rgb(255, 228, 85)'
  const translucent: string = '0.05'
  const opaque: string = '1'
  useEffect(() => {
    for (let i = 0; i < num; i++) {
      timerMainRef.current.push(createRef<HTMLParagraphElement>())
      timerSubRef.current.push(createRef<HTMLParagraphElement>())
    }
    setTimeout(() => {
      nodecg.Replicant('timerGroup').on('change', (newValue) => {
        refreshTimer(newValue)
      })
    }, 0)
    nodecg.Replicant('currentRunnerGroup').on('change', (newValue) => {
      if (newValue != null) {
        setTimeout(() => {
          nodecg.readReplicant('timerGroup', (value) => {
            refreshTimer(value)
          })
        }, 50)
      }
    })
  }, [])
  const refreshTimer = useCallback((timerGroup: TimerGroup) => {
    if (timerGroup != null) {
      timerGroup.timer.forEach((timer, index) => {
        if (timerMainRef.current![index] != null && timerSubRef.current![index] != null) {
          if (timerMainRef.current![index].current != null && timerSubRef.current![index].current != null) {
            const currentTimeMainStr = getTimerMainStr(timer)
            const currentTimeSubStr = timerGroup.showMS ? getTimerSubStr(timer) : ''
            const prevTimeMainStr: string = timerMainRef.current[index].current!.innerText
            const prevTimeSubStr: string = timerSubRef.current[index].current!.innerText
            if (currentTimeMainStr != prevTimeMainStr) {
              timerMainRef.current[index].current!.innerText = currentTimeMainStr
            }
            if (currentTimeSubStr != prevTimeSubStr) {
              timerSubRef.current[index].current!.innerText = currentTimeSubStr
            }
            timerMainRef.current[index].current!.style.color =
              timer.isRunning || timer.currentTime == 0 ? normalCol : finishedCol
            timerSubRef.current[index].current!.style.color =
              timer.isRunning || timer.currentTime == 0 ? normalCol : finishedCol
            timerSubRef.current[index].current!.style.opacity = timer.isRunning ? translucent : opaque
          }
        }
      })
    }
  }, [])
  return timerMainRef.current.map((_value, index) => (
    <>
      <p ref={timerMainRef.current[index]} />
      <p ref={timerSubRef.current[index]} />
    </>
  ))
}

const getTimerMainStr = (timer: Timer) => {
  return `${timer.h}:${timer.m}:${timer.s}`
}

const getTimerSubStr = (timer: Timer) => {
  return `.${timer.ms}`
}
