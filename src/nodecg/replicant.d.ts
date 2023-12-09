import { AssistContent, RTATimer, RunnerGroup, TimerGroup, TimerState, Speaker, LogoImg } from 'rib-bundle'

export interface ReplicantMap {
  runnerGroupArray: RunnerGroup[]
  currentRunnerGroup: RunnerGroup
  nextRunnerGroup: RunnerGroup
  groupIndex: number
  nextGroupIndex: number
  logoIndex: number
  timerGroup: TimerGroup
  timerState: TimerState
  speaker: Speaker
  timerOpacity: number
  highlight: AssistContent[][]
  illust: AssistContent[]
  assistContent: AssistContent
  autoRefreshSandbox: boolean
  isRunningCountdownBot: boolean
  isRunningSandboxReceiver: boolean
  logoArray: LogoImg[]
  logo: LogoImg
}
