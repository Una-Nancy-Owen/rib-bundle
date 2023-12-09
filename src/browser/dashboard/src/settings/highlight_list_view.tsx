import { AssistContent, RunnerGroup } from 'rib-bundle'
import { memo, useEffect, useState } from 'react'
import { styled } from 'styled-components'

export const HighlightListView = memo(() => {
  const [highlightGroupArray, setHighlightGroupArray] = useState<AssistContent[][]>([])
  const [runnerGroupArray, setRunnerGroupArray] = useState<RunnerGroup[]>([])

  useEffect(() => {
    nodecg.Replicant('highlight').on('change', (newValue) => {
      if (newValue != null) {
        setHighlightGroupArray(newValue)
      }
    })
    nodecg.Replicant('runnerGroupArray').on('change', (newValue) => {
      if (newValue != null) {
        setRunnerGroupArray(newValue)
      }
    })
  }, [])
  if (highlightGroupArray != null && runnerGroupArray != null) {
    if (0 < highlightGroupArray.length && 0 < runnerGroupArray.length) {
      if (highlightGroupArray.length == runnerGroupArray.length) {
        const highlightOrderedLists = highlightGroupArray.map((value, index) => (
          <GroupDiv>
            <p>{runnerGroupArray[index].title.join('')}</p>
            <HighlightGroup key={`highlightOrderedLists${index}`} content={value} />
          </GroupDiv>
        ))
        return (
          <StHighlight>
            <h2>見どころ</h2>
            <StGroupOl>{highlightOrderedLists}</StGroupOl>
          </StHighlight>
        )
      }
    }
  }
  return null
})

const HighlightGroup = memo((props: { content: AssistContent[] }) => {
  const highlightGroup = props.content.map((value, index) => (
    <Highlight key={`HighlightGroup${value.group}:${index}`} content={value} />
  ))
  return highlightGroup
})

const Highlight = memo((props: { content: AssistContent }) => {
  const assistContent = props.content
  const multilineContent = assistContent.content
    .split(/\n/)
    .map((value, index) => <li key={`highlight${index}`}>{value}</li>)
  return (
    <StHighlightUl>
      <li>{props.content.header}</li>
      {multilineContent}
    </StHighlightUl>
  )
})

const StHighlight = styled.div`
  & > h2 {
    font-size: 1.1rem;
    font-weight: 700;
  }
`

const GroupDiv = styled.div`
  background-color: rgb(101 191 193);
  margin: 8px 12px;
  padding: 8px;
  border-radius: 4px;
  & > p {
    font-size: 1.1rem;
    font-weight: 900;
  }

  & > ul {
    border-top: 1px dashed rgb(255, 255, 255, 0.6);
  }

  & > ul:first-of-type {
    border-top: none;
  }
`

const StGroupOl = styled.ol`
  margin: 12px 4px;
  overflow-y: scroll;
  display: block;
  height: 90%;
`

const StHighlightUl = styled.ul`
  padding: 2px 6px;

  & > li:nth-child(n + 2) {
    padding-left: 10px;
  }
`
