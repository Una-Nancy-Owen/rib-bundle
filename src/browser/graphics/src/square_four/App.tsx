import useAssistContent from '@hooks/useAssistContent'
import useLogo from '@hooks/useLogo'
import useRunnerGroup from '@hooks/useRunnerGroup'
import useSpeakerRef from '@hooks/useSpeakerRef'
import useTimerSplitParagraph from '@hooks/useTimerSplitParagraph'
import { StHorizontalGroup, StSquareFrame, StVerticalGroup } from '@ui/style'
import { memo } from 'react'
import { styled } from 'styled-components'

export default function App() {
  const runnerGroup = useRunnerGroup()
  const timerSplitParagraph = useTimerSplitParagraph(4)
  const speakerRef = useSpeakerRef(4)
  const assistContent = useAssistContent()
  const logo = useLogo()

  const RunnerContainer = memo((props: { index: number; isLeft: boolean }) => {
    const runners = runnerGroup!.runners
    const length = runners.length
    const name = props.index < length ? runners[props.index].name : ''
    const icon = props.index < length ? runners[props.index].icon : ''
    const isVisible = props.index < length
    return (
      <StRunnerInfoContainer $isLeft={props.isLeft}>
        <StNameContainer $isVisible={isVisible}>
          <StIcon src={icon} />
          <StSpeaker>{speakerRef![props.index]}</StSpeaker>
          <p>{name}</p>
        </StNameContainer>

        <StTimer $isVisible={isVisible}>{timerSplitParagraph![props.index]}</StTimer>
      </StRunnerInfoContainer>
    )
  })
  if (runnerGroup != null) {
    const title = runnerGroup.title.map((value, index) => <p key={`title${index.toString()}`}>{value}</p>)
    const commentator = runnerGroup.commentators.map((data, index) => <p key={`commentator${index}`}>{data.name}</p>)
    return (
      <StWrapper>
        <StFrameContainer>
          <StSquareFrame />
          <StSquareFrame />
        </StFrameContainer>
        <StCenterContainer>
          <RunnerContainer index={0} isLeft={true} />
          <RunnerContainer index={1} isLeft={false} />
          <StMainInfoContainer>
            <StLogo>{logo}</StLogo>
            <StGameInfo>
              <StTitle>{title}</StTitle>
              <StTitleInfoHorizontalGroup>
                <StVerticalGroup>
                  <StTitleInfoGroup>
                    <p>{runnerGroup.category}</p>
                    <p>{runnerGroup.platform}</p>
                  </StTitleInfoGroup>
                </StVerticalGroup>
                <StRightAlignVerticalGroup>
                  <p>予定タイム</p>
                  <p>{runnerGroup.estimatedTime}</p>
                </StRightAlignVerticalGroup>
              </StTitleInfoHorizontalGroup>
            </StGameInfo>
            <StCommentatorContainer $isVisible={0 < runnerGroup.commentators.length}>
              <p>{0 < runnerGroup.commentators.length ? '解説' : ''}</p>
              <StVerticalGroup>{commentator}</StVerticalGroup>
            </StCommentatorContainer>
            <StAssistContent>{assistContent}</StAssistContent>
          </StMainInfoContainer>
          <RunnerContainer index={2} isLeft={true} />
          <RunnerContainer index={3} isLeft={false} />
        </StCenterContainer>
        <StFrameContainer>
          <StSquareFrame />
          <StSquareFrame />
        </StFrameContainer>
      </StWrapper>
    )
  } else {
    return null
  }
}

// #region styles

const StWrapper = styled(StHorizontalGroup)`
  width: 1920px;
  height: 1080px;
  background-color: #000;
  mask-image: url('mask_square_four.png');
  -webkit-mask-image: url('mask_square_four.png');
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: 0% 0%;
  -webkit-mask-position: 0% 0%;
`

const StFrameContainer = styled(StVerticalGroup)`
  height: 1080px;
  flex-grow: 1;
  justify-content: center;

  & > div:first-child {
    margin: 7px 7px 5px;
  }

  & > div:last-child {
    margin: 5px 7px 7px;
  }
`

const StCenterContainer = styled(StVerticalGroup)`
  width: 480px;
  margin: 10px 2px;
  padding: 20px 0;
  justify-content: center;
  position: relative;
  border: 4px solid #fff;
  border-radius: 8px;
`

const StLogo = styled.div`
  display: flex;
  justify-content: center;
  height: 130px;
  & > img {
    max-height: 130px;
    max-width: 100%;
    margin: auto;
    padding: 5px 10px;
    object-fit: contain;
  }
`

const StGameInfo = styled.div`
  background-color: rgb(32 45 79);
  margin: 6px;
  border-radius: 4px;
  padding: 5px 0;
`

const StMainInfoContainer = styled(StVerticalGroup)`
  justify-content: center;
  flex-grow: 1;
  border-radius: 8px;
`

const StSpeaker = styled(StHorizontalGroup)`
  align-items: center;
  width: 36px;
  svg {
    width: 40px;
    margin-bottom: -2px;
  }
`

const StTitleInfoHorizontalGroup = styled(StHorizontalGroup)`
  padding: 0;
  justify-content: space-evenly;
`

const StCommentatorContainer = styled(StHorizontalGroup)<{ $isVisible: boolean }>`
  align-items: center;
  height: 60px;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-wrap: wrap;
  display: ${(isVisible) => (isVisible.$isVisible ? 'flex' : 'none')};
  &:empty {
    display: none;
  }

  p {
    font-size: 1.4rem;
    font-weight: 900;
  }

  & > p:first-child {
    padding-right: 30px;
  }
`

const StTitle = styled(StVerticalGroup)`
  height: 82px;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 900;
  text-align: center;
`

const StTitleInfoGroup = styled(StVerticalGroup)`
  & > p {
    font-size: 1.4rem;
    font-weight: 400;
    text-align: center;
  }
`

const StRunnerInfoContainer = styled(StVerticalGroup)<{ $isLeft: boolean }>`
  align-items: center;
  justify-content: space-between;
  padding: 2px 0px;
  align-items: ${(isLeft) => (isLeft.$isLeft ? 'flex-start' : 'flex-end')};
  & > div:first-child {
    text-align: ${(isLeft) => (isLeft.$isLeft ? 'left' : 'right')};
    padding: ${(isLeft) => (isLeft.$isLeft ? '0 0 0 0' : '0 0 0 163px')};
  }
`

const StNameContainer = styled(StHorizontalGroup)<{ $isVisible: boolean }>`
  width: 100%;
  height: 50px;
  font-size: 1.4rem;
  font-weight: 900;
  text-align: left;
  align-items: flex-end;
  justify-content: flex-start;
  opacity: ${(isVisible) => (isVisible.$isVisible ? '1' : '0')};
  & > p {
    padding-right: 6px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const StIcon = styled.img`
  width: 50px;
  max-height: 50px;
`

const StAssistContent = styled.div`
  height: 290px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  p:first-child {
    font-size: 1.4rem;
    font-weight: 900;
    text-align: center;
    color: rgb(255, 255, 0);
  }
  p:nth-child(2) {
    font-weight: 700;
    font-size: 1.4rem;
    padding: 5px 70px;
  }
  p:nth-child(2):empty {
    padding: 0;
  }
  & > img {
    max-width: 472px;
    max-height: 248px;
    padding: 4px;
    margin: auto;
    object-fit: contain;
  }
`

const StTimer = styled(StHorizontalGroup)<{ $isVisible: boolean }>`
  width: 310px;
  height: 37px;
  align-items: center;
  opacity: ${(props) => (props.$isVisible ? '1' : '0')};
  background-color: rgb(65 87 145);
  font-size: 1.5rem;
  font-weight: 900;
  text-align: center;
  font-family: 'Noto Sans Mono', monospace;
`

const StRightAlignVerticalGroup = styled(StVerticalGroup)`
  & > p {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 400;
  }
`

// #endregion styles
