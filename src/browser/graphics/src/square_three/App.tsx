import useAssistContent from '@hooks/useAssistContent'
import useLogo from '@hooks/useLogo'
import useRunnerGroup from '@hooks/useRunnerGroup'
import useSpeakerRef from '@hooks/useSpeakerRef'
import useTimerSplitParagraph from '@hooks/useTimerSplitParagraph'
import { StHorizontalGroup, StSquareFrame, StVerticalGroup, StWrapperBaseH } from '@ui/style'
import { memo } from 'react'
import { keyframes, styled } from 'styled-components'

export default function App() {
  const runnerGroup = useRunnerGroup()
  const timerSplitParagraph = useTimerSplitParagraph(3)
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
    const commentatorVisibility = 0 < runnerGroup.commentators.length
    const est = `予定タイム ${runnerGroup.estimatedTime}`
    const category = `${runnerGroup.category} / ${runnerGroup.platform}`
    return (
      <StWrapper>
        <StLeftColumn>
          <StTopFrameContainer>
            <StSquareFrame />
          </StTopFrameContainer>
          <StBottomFrameContainer>
            <StSquareFrame />
            <StSquareFrame />
          </StBottomFrameContainer>
        </StLeftColumn>
        <StCenterContainer>
          <StRunnerEmptyContainer />
          <RunnerContainer index={0} isLeft={true} />
          <StRunnerEmptyContainer />
          <StMainInfoContainer>
            <StLogo>{logo}</StLogo>
            <StGameInfo>
              <StTitle>{title}</StTitle>
              <StInfoGroup>
                <AnimParagraphFirst>{est}</AnimParagraphFirst>
                <AnimParagraphSecond>{category}</AnimParagraphSecond>
                <AnimParagraphFirst>{est}</AnimParagraphFirst>
              </StInfoGroup>
            </StGameInfo>
            <StCommentatorContainer $isVisible={commentatorVisibility}>
              <p>{commentatorVisibility ? '解説' : ''}</p>
              {commentator}
            </StCommentatorContainer>
            <StAssistContent $fullHeight={!commentatorVisibility}>{assistContent}</StAssistContent>
          </StMainInfoContainer>
          <RunnerContainer index={1} isLeft={true} />
          <RunnerContainer index={2} isLeft={false} />
        </StCenterContainer>
      </StWrapper>
    )
  } else {
    return null
  }
}

// #region styles

const StWrapper = styled(StWrapperBaseH)`
  mask-image: url('mask_square_three.png');
  -webkit-mask-image: url('mask_square_three.png');
`

const StLeftColumn = styled(StVerticalGroup)`
  width: 1432px;
  & > div {
    height: 540px;
  }
`

const StTopFrameContainer = styled(StHorizontalGroup)`
  justify-content: center;
  & > div {
    margin: 7px 6px 5px;
  }
`

const StBottomFrameContainer = styled(StHorizontalGroup)`
  height: 540px;

  & > div {
    margin: 5px 6px 7px 6px;
  }
`

const StCenterContainer = styled(StVerticalGroup)`
  width: 474px;
  margin: 10px 10px 10px 4px;
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
  padding-top: 1px;
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

const StCommentatorContainer = styled(StHorizontalGroup) <{ $isVisible: boolean }>`
  align-items: center;
  height: 60px;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-wrap: wrap;
  display: ${(isVisible) => (isVisible.$isVisible ? 'flex' : 'none')};
  & > p {
    font-size: 1.4rem;
    font-weight: 900;
  }

  & > p:first-child {
    padding: 0 20px;
  }

  & > p:nth-child(n + 2) {
    padding: 0 10px;
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

const StRunnerInfoContainer = styled(StVerticalGroup) <{ $isLeft: boolean }>`
  align-items: center;
  justify-content: space-between;
  padding: 2px 0px;
  align-items: ${(isLeft) => (isLeft.$isLeft ? 'flex-start' : 'flex-end')};
  & > div:first-child {
    text-align: ${(isLeft) => (isLeft.$isLeft ? 'left' : 'right')};
    padding: ${(isLeft) => (isLeft.$isLeft ? '0 0 0 0' : '0 0 0 156px')};
  }
`

const StRunnerEmptyContainer = styled.div`
  width: 442px;
  height: 45px;
`

const StNameContainer = styled(StHorizontalGroup) <{ $isVisible: boolean }>`
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

const StAssistContent = styled.div<{ $fullHeight: boolean }>`
  height: ${(props) => (props.$fullHeight ? '372px' : '312px')};
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  p:first-child {
    font-size: 1.4rem;
    font-weight: 900;
    text-align: center;
    white-space: nowrap;
    text-overflow: clip;
    color: rgb(255, 255, 0);
  }
  p:nth-child(2) {
    font-weight: 700;
    font-size: 1.4rem;
    padding: 5px 80px;
    max-height: ${(props) => (props.$fullHeight ? '330px' : '270px')};
    overflow-y: hidden;
  }
  p:nth-child(2):empty {
    padding: 0;
  }
  & > img {
    max-width: 100%;
    max-height: ${(props) => (props.$fullHeight ? '330px' : '270px')};
    padding: 4px;
    margin: auto;
    object-fit: contain;
    flex: auto;
  }
`

const StTimer = styled(StHorizontalGroup) <{ $isVisible: boolean }>`
  width: 310px;
  height: 37px;
  align-items: center;
  opacity: ${(isVisible) => (isVisible.$isVisible ? '1' : '0')};
  background-color: rgb(65 87 145);
  font-size: 1.6rem;
  font-weight: 900;
  text-align: center;
  & > p {
    font-family: 'Noto Sans Mono', monospace;
  }
`

const StInfoGroup = styled.div`
  max-width: 700px;
  height: 32px;
  margin: 5px 0px;
  & > p {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 400;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const AnimFirst = keyframes`
  0% {
    transform: translateY(0px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
  }
  45% {
    transform: translateY(0px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
    animation-timing-function: ease-in-out;
  }
  50% {
    transform: translateY(-32px) rotate3d(1, 0, 0, 120deg);
    opacity: 0;
  }
  95% {
    transform: translateY(-32px) rotate3d(1, 0, 0, -120deg);
    opacity: 0;
    animation-timing-function: ease-in-out;
  }
  100% {
    transform: translateY(-64px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
  }
`

const AnimSecond = keyframes`
  0% {
    transform: translateY(0px) rotate3d(1, 0, 0, -120deg);
    opacity: 0;
  }
  45% {
    transform: translateY(0px) rotate3d(1, 0, 0, -120deg);
    opacity: 0;
    animation-timing-function: ease-in-out;
  }
  50% {
    transform: translateY(-32px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
  }
  95% {
    transform: translateY(-32px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
    animation-timing-function: ease-in-out;
  }
  100% {
    transform: translateY(-64px) rotate3d(1, 0, 0, 120deg);
    opacity: 0;
  }
`

const AnimParagraphFirst = styled.p`
  animation: 30s infinite ${AnimFirst};
`

const AnimParagraphSecond = styled.p`
  animation: 30s infinite ${AnimSecond};
  text-align: center;
`

// #endregion styles
