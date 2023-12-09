import { TimerGroup, RunnerGroup, SignalType, Speaker, TimerSignal, TimerState } from 'rib-bundle'
import { RefObject, createRef, memo, useCallback, useEffect, useRef, useState } from 'react'
import {
  StHorizontalGroup,
  RoundButton,
  SquareButton,
  StVerticalGroup,
  ToggleLabel,
  ToggleInput,
  ToggleSwitch,
} from '@ui/style'
import { colRed, colOrange, colBlue, colTurquoiseBlue, colGreen, colRoseRed, colSlateGrey } from '@ui/color'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import { FaLock, FaUnlock } from 'react-icons/fa'
import { styled } from 'styled-components'

type RunnerTimerInfo = {
  isVisible: boolean
  name: string
}

const RunnerTimerInfoInitValues: RunnerTimerInfo = {
  isVisible: false,
  name: '',
}

/**
 * タイマー、操作するボタンを表示するコンポーネント
 */
export const TimerControlePanel = memo((props: { runnerGroup: RunnerGroup; timerState: TimerState }) => {
  const visibleRef = useRef<RunnerTimerInfo[]>([
    RunnerTimerInfoInitValues,
    RunnerTimerInfoInitValues,
    RunnerTimerInfoInitValues,
    RunnerTimerInfoInitValues,
  ])
  const paragraphRef = useRef<RefObject<HTMLParagraphElement>[]>([
    createRef<HTMLParagraphElement>(),
    createRef<HTMLParagraphElement>(),
    createRef<HTMLParagraphElement>(),
    createRef<HTMLParagraphElement>(),
  ])
  const [speaker, setSpeaker] = useState<Speaker>()
  const [showMS, setShowMS] = useState<boolean>(false)
  const [lockButton, setLockButton] = useState<boolean>(true)

  useEffect(() => {
    nodecg.readReplicant('timerGroup', (value) => {
      setShowMS(value.showMS)
    })
    nodecg.Replicant('timerGroup').on('change', (newValue) => {
      refreshTimerRefine(newValue)
    })
    nodecg.Replicant('speaker').on('change', (newValue) => {
      setSpeaker(newValue)
    })
  }, [])
  useEffect(() => {
    setLockButton(true)
  }, [props.runnerGroup])

  /**
   * タイマー表示を更新する関数
   */
  const refreshTimerRefine = useCallback((timerGroup: TimerGroup) => {
    if (timerGroup != null) {
      timerGroup.timer.forEach((timer, index) => {
        if (paragraphRef.current![index] != null) {
          const currentTimeStr = timerGroup.showMS
            ? `${timer.h}:${timer.m}:${timer.s}.${timer.ms}`
            : `${timer.h}:${timer.m}:${timer.s}`
          const prevTimeStr: string = paragraphRef.current![index].current!.innerText
          if (currentTimeStr != prevTimeStr) {
            paragraphRef.current![index].current!.innerText = currentTimeStr
          }
        }
      })
    }
  }, [])

  /**
   * 全体のタイマーを操作したときにメッセージを送信する関数
   */
  const allSignal = useCallback((signal: SignalType) => {
    const timerSignal: TimerSignal = {
      signalType: signal,
      all: true,
      index: 0,
    }
    nodecg.sendMessage('setTimerSignal', timerSignal)
  }, [])

  const changeSpeaker = useCallback((index: number) => {
    nodecg.sendMessage('setSpeaker', index)
  }, [])

  const changeMSVisibility = useCallback(() => {
    nodecg.sendMessage('toggleMSVisibility', !showMS)
    setShowMS(!showMS)
  }, [showMS])

  const changeLockHandler = useCallback(() => {
    setLockButton(!lockButton)
  }, [lockButton])

  if (paragraphRef.current != null) {
  }
  for (let i = 0; i < visibleRef.current.length; i++) {
    if (i < props.runnerGroup.runners.length) {
      visibleRef.current[i] = {
        isVisible: true,
        name: props.runnerGroup.runners[i].name,
      }
    } else {
      visibleRef.current[i] = RunnerTimerInfoInitValues
    }
  }
  const individualButtons = visibleRef.current.map((data, i) => (
    <StHideableContainer key={`individualButtons${i.toString()}`} $isVisible={data.isVisible}>
      <IndividualButtonGroup index={i} isDisabled={props.timerState.individibleTimer[i]} lock={lockButton} />
      <StBottomGroup>
        <StCircleButton $color={speaker?.enabled[i] ? colTurquoiseBlue : colRed} onClick={changeSpeaker.bind(this, i)}>
          {speaker?.enabled[i] ? <HiSpeakerWave /> : <HiSpeakerXMark />}
        </StCircleButton>
        <StRunnerInfo>
          <p>{data.name}</p>
          <StTimerParagraph ref={paragraphRef.current[i]} />
        </StRunnerInfo>
      </StBottomGroup>
    </StHideableContainer>
  ))
  return (
    <StVerticalGroup>
      <StMainButtonGroup>
        <RoundButton
          $color={colRed}
          onClick={allSignal.bind(this, 'Start')}
          disabled={props.timerState.startedEveryone}>
          StartAll
        </RoundButton>
        <RoundButton
          $color={colOrange}
          onClick={allSignal.bind(this, 'Stop')}
          disabled={!props.timerState.startedSomeone}>
          StopAll
        </RoundButton>
        <RoundButton
          $color={colGreen}
          onClick={allSignal.bind(this, 'Resume')}
          disabled={props.timerState.startedEveryone || lockButton}>
          ResumeAll
        </RoundButton>
        <RoundButton $color={colBlue} onClick={allSignal.bind(this, 'Reset')} disabled={lockButton}>
          ResetAll
        </RoundButton>
        <RoundButton $color={lockButton ? colRoseRed : colSlateGrey} onClick={changeLockHandler}>
          {lockButton ? <FaLock /> : <FaUnlock />}
        </RoundButton>
        <ToggleLabel>
          <span>ミリ秒を表示</span>
          <ToggleInput checked={showMS} type='checkbox' onChange={changeMSVisibility} />
          <ToggleSwitch />
        </ToggleLabel>
      </StMainButtonGroup>
      {individualButtons}
    </StVerticalGroup>
  )
})

/**
 * 走者個別のタイマーを操作するボタンを表示するコンポーネント
 */
export const IndividualButtonGroup = (props: { index: number; isDisabled: boolean; lock: boolean }) => {
  /**
   * 走者個別のタイマーのボタンを押したときにメッセージを送信する関数
   */
  const individualSignal = useCallback((signal: SignalType) => {
    const timerSignal: TimerSignal = {
      signalType: signal,
      all: false,
      index: props.index,
    }
    nodecg.sendMessage('setTimerSignal', timerSignal)
  }, [])

  return (
    <StIndividualButtonGroup>
      <SquareButton $color={colRed} onClick={individualSignal.bind(this, 'Start')} disabled={props.isDisabled}>
        Start
      </SquareButton>
      <SquareButton $color={colOrange} onClick={individualSignal.bind(this, 'Stop')} disabled={!props.isDisabled}>
        Stop
      </SquareButton>
      <SquareButton
        $color={colGreen}
        onClick={individualSignal.bind(this, 'Resume')}
        disabled={props.isDisabled || props.lock}>
        Resume
      </SquareButton>
      <SquareButton $color={colBlue} onClick={individualSignal.bind(this, 'Reset')} disabled={props.lock}>
        Reset
      </SquareButton>
    </StIndividualButtonGroup>
  )
}

// #region styles

const StMainButtonGroup = styled(StHorizontalGroup)`
  @media only screen and (max-width: 500px) {
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  & > button {
    @media only screen and (max-width: 500px) {
      width: 40%;
    }
  }
  & > label {
    margin-left: 10px;
  }
`

const StBottomGroup = styled(StHorizontalGroup)`
  align-items: center;
`

const StRunnerInfo = styled(StHorizontalGroup)`
  width: 80%;
  height: 36px;
  background-color: rgb(235, 163, 89);
  border-radius: 4px;
  align-items: center;
  justify-content: center;

  & > p {
    width: 100%;
    height: 36px;
    font-size: 1.2rem;
    padding: 4px 10px;
    font-weight: 700;
  }

  & > p:first-of-type {
    text-align: right;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const StTimerParagraph = styled.p`
  font-family: 'Noto Sans Mono';
`

const StHideableContainer = styled(StVerticalGroup)<{ $isVisible: boolean }>`
  margin: 5px;
  display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
  background-color: rgb(247 200 113);
  border-radius: 4px;
  @media only screen and (max-width: 500px) {
    margin: 5px 0;
  }
`

const StCircleButton = styled(RoundButton)`
  min-width: 38px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
`

const StIndividualButtonGroup = styled(StHorizontalGroup)`
  & > button {
    @media only screen and (max-width: 1280px) {
      padding: 5px 6px;
    }
  }
`

// #endregion styles
