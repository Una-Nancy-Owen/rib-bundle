import { StVerticalGroup } from '@ui/style'
import { memo, useEffect, useState } from 'react'
import { RunnerData, RunnerGroup } from 'rib-bundle'
import { styled } from 'styled-components'

export const RunnerGroupArrayConmponent = memo(() => {
  const [runnerGroupArray, setRunnerGroupArray] = useState<RunnerGroup[]>()
  useEffect(() => {
    nodecg.Replicant('runnerGroupArray').on('change', (newValue) => {
      setRunnerGroupArray(newValue)
    })
  }, [])
  if (runnerGroupArray == null) {
    return null
  } else {
    const groups = runnerGroupArray.map((data: RunnerGroup, i) => (
      <RunnerGroupComponent key={`RunnerGroupContainer${i.toString()}`} runnerGroup={data} />
    ))
    return (
      <>
        <StWrapper>
          <h2>走者グループリスト</h2>
          <StRunnerGroupArrayContainer>{groups}</StRunnerGroupArrayContainer>
        </StWrapper>
      </>
    )
  }
})

export const RunnerGroupComponent = memo((props: { runnerGroup: RunnerGroup }) => {
  const runners = props.runnerGroup.runners.map((data: RunnerData, i) => (
    <RunnerDataComponent key={`RunnersContainer(${i.toString()})`} runnerData={data} index={i} isCommentator={false} />
  ))
  const commentators = props.runnerGroup.commentators.map((data: RunnerData, i) => (
    <RunnerDataComponent
      key={`CommentatorsContainer(${i.toString()})`}
      runnerData={data}
      index={i}
      isCommentator={true}
    />
  ))
  return (
    <StRunnerGroupContainer>
      {runners}
      {commentators}
    </StRunnerGroupContainer>
  )
})

export const RunnerDataComponent = memo((props: { runnerData: RunnerData; index: number; isCommentator: boolean }) => {
  const overlappedContent =
    props.index === 0 && !props.isCommentator ? (
      <StTitleParagraph>
        {props.runnerData.group} : {props.runnerData.title.replace('\\n', '')}
      </StTitleParagraph>
    ) : null
  return (
    <StRunnerDataContainer>
      {overlappedContent}
      <p>{props.runnerData.name}</p>
      <p>{props.runnerData.platform}</p>
      <p>{props.runnerData.category}</p>
      <p>{props.runnerData.estimatedTime}</p>
      <p>{props.runnerData.graphicsType}</p>
    </StRunnerDataContainer>
  )
})

// #region styles

const StWrapper = styled.div`
  width: 100%;
  & > h2 {
    font-size: 1.1rem;
    font-weight: 700;
  }
`

const StRunnerGroupArrayContainer = styled(StVerticalGroup)`
  overflow-y: scroll;
  display: block;
  height: 90%;

  margin-top: 10px;
`

const StRunnerGroupContainer = styled(StVerticalGroup)`
  margin: 8px 4px;
`

const StRunnerDataContainer = styled.div`
  margin: 2px 8px;
  border: none;
  border-radius: 4px;
  padding: 12px;
  background-color: rgb(212 220 225);

  & > p {
    padding-left: 6px;
    color: rgb(51 51 51);
    border-top: 1px dashed rgb(51 51 51 / 60%);
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > p:first-child {
    padding-left: 0;
    border-top: none;
  }
`

const StTitleParagraph = styled.p`
  font-size: 1.15rem;
`

// #endregion styles
