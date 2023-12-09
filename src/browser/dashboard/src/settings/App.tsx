import { useCallback, useEffect, useState } from 'react'
import { StHorizontalGroup, StVerticalGroup, ToggleLabel, ToggleSwitch, ToggleInput } from '@ui/style'
import styled from 'styled-components'
import { SheetsImportForm } from './sheets_import_form'
import { IllustListView } from './illust_list_view'
import { HighlightListView } from './highlight_list_view'
import { RunnerGroupArrayConmponent } from './runner_group_view'

export default function App() {
  const [isRunningCountdownBot, setIsRunningCountdownBot] = useState<boolean>()
  const [isRunningSandboxReceiver, setIsRunningSandboxReceiver] = useState<boolean>()
  const [autoRefreshSandbox, setAutoRefreshSandbox] = useState<boolean>()
  useEffect(() => {
    nodecg.Replicant('isRunningCountdownBot').on('change', (newValue) => {
      if (newValue != null) {
        setIsRunningCountdownBot(newValue)
      }
    })
    nodecg.Replicant('isRunningSandboxReceiver').on('change', (newValue) => {
      if (newValue != null) {
        setIsRunningSandboxReceiver(newValue)
      }
    })

    nodecg.Replicant('autoRefreshSandbox').on('change', (newValue) => {
      if (newValue != null) {
        setAutoRefreshSandbox(newValue)
      }
    })
  }, [])

  const toggleCountdownBotHandler = useCallback(() => {
    nodecg.sendMessage('toggleCountdownBot', !isRunningCountdownBot)
  }, [isRunningCountdownBot])

  const toggleSandboxReceiverHandler = useCallback(() => {
    nodecg.sendMessage('toggleSandboxReceiver', !isRunningSandboxReceiver)
  }, [isRunningSandboxReceiver])

  const toggleAutoRefreshSandboxHandler = useCallback(() => {
    nodecg.sendMessage('toggleAutoRefreshSandBox', !autoRefreshSandbox)
  }, [autoRefreshSandbox])
  return (
    <>
      <StWrapper>
        <StLeftColumn>
          <RunnerGroupArrayConmponent />
        </StLeftColumn>
        <StCenterColumn>
          <HighlightListView />
        </StCenterColumn>
        <StRightColumn>
          <SheetsImportForm />
          <ToggleLabel>
            <span>カウントダウンBot</span>
            <ToggleInput checked={isRunningCountdownBot} type='checkbox' onChange={toggleCountdownBotHandler} />
            <ToggleSwitch />
          </ToggleLabel>
          <ToggleLabel>
            <span>遊び場</span>
            <ToggleInput checked={isRunningSandboxReceiver} type='checkbox' onChange={toggleSandboxReceiverHandler} />
            <ToggleSwitch />
          </ToggleLabel>
          <ToggleLabel>
            <span>右枠の自動更新</span>
            <ToggleInput checked={autoRefreshSandbox} type='checkbox' onChange={toggleAutoRefreshSandboxHandler} />
            <ToggleSwitch />
          </ToggleLabel>
          <IllustListView />
        </StRightColumn>
      </StWrapper>
    </>
  )
}

// #region styles

const StWrapper = styled(StHorizontalGroup)`
  width: 100%;
  max-height: 100vh;
`

const StLeftColumn = styled(StVerticalGroup)`
  width: 30%;
  max-width: 600px;
  align-items: center;
  padding: 20px 10px;
`

const StCenterColumn = styled(StVerticalGroup)`
  width: 25%;
  max-width: 600px;
  padding: 20px 10px;
`

const StRightColumn = styled(StVerticalGroup)`
  width: 30%;
  max-width: 400px;
  padding: 20px 10px;
`

// #endregion styles
