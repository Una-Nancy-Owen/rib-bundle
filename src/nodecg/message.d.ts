import { AssistContent, SheetsKey, TimerSignal } from 'rib-bundle'

export interface MessageMap {
  setTimerSignal: { data: TimerSignal }
  setNextRunnerGroupIndex: { data: number }
  setCurrentRunnerGroupIndex: { data: number }
  setCurrentLogoIndex: { data: number }
  loadCSVData: {}
  setSpeaker: { data: number }
  toggleMSVisibility: { data: boolean }
  importRunnerGroupArray: { data: SheetsKey }
  importHighlight: { data: SheetsKey }
  importHighlightByTitle: { data: SheetsKey }
  importIllust: { data: SheetsKey }
  importIllustByTitle: { data: SheetsKey }
  importLogo: { data: SheetsKey }
  importLogoByTitle: { data: SheetsKey }
  overrideSandbox: { data: AssistContent }
  toggleAutoRefreshSandBox: { data: boolean }
  toggleCountdownBot: { data: boolean }
  toggleSandboxReceiver: { data: boolean }
}
