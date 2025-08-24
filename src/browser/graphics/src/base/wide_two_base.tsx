import useAssistContent from '@hooks/useAssistContent'
import useLogo from '@hooks/useLogo'
import useRunnerGroup from '@hooks/useRunnerGroup'
import useSpeakerRef from '@hooks/useSpeakerRef'
import useTimerSplitParagraph from '@hooks/useTimerSplitParagraph'
import { StHorizontalGroup, StVerticalGroup, StWideFrame, StWrapperBase } from '@ui/style'
import { memo } from 'react'
import { keyframes, styled } from 'styled-components'

export const WideTwoBase = ((props: { mask_image_filename: string, show_timer: boolean, camera: boolean }) => {
  const runnerGroup = useRunnerGroup()
  const timerSplitParagraph = useTimerSplitParagraph(2)
  const speakerRef = useSpeakerRef(2)
  const assistContent = useAssistContent()
  const logo = useLogo()

  const RunnerContainer = memo((props: { index: number }) => {
    const runners = runnerGroup!.runners
    const length = runners.length
    const name = props.index < length ? runners[props.index].name : ''
    const icon = props.index < length ? runners[props.index].icon : ''
    const isVisible = props.index < length
    return (
      <>
        <StRunnerInfoContainer>
          <StNameContainer>
            <StIcon src={icon} />
            <StSpeaker>{speakerRef![props.index]}</StSpeaker>
            <p>{name}</p>
          </StNameContainer>
          <StTimer $isVisible={isVisible}>{timerSplitParagraph![props.index]}</StTimer>
        </StRunnerInfoContainer>
      </>
    )
  })

  if (runnerGroup != null) {
    const title = runnerGroup.title.map((value, index) => <p key={`title${index.toString()}`}>{value}</p>)
    const commentator = runnerGroup.commentators.map((data, index) => <p key={`commentator${index}`}>{data.name}</p>)
    const hasCommentator = 0 < runnerGroup.commentators.length
    const est = `予定タイム ${runnerGroup.estimatedTime}`
    const category = `${runnerGroup.category} / ${runnerGroup.platform}`
    if (props.camera) {
      return (
        <StWrapper $image_url={props.mask_image_filename}>
          <StUpperHorizontalGroup>
            <RunnerContainer index={0} />
            <RunnerContainer index={1} />
          </StUpperHorizontalGroup>
          <StFrameContainer>
            <StWideFrame />
            <StWideFrame />
          </StFrameContainer>
          <StBottomContainer>
            <StBottomRightGroup $fullHeight={hasCommentator}>
              <StLogo>{logo}</StLogo>
              <StInfoMainCamera>
                {title}
                <StHorizontalGroup>
                  <StCommentatorContainer $isVisible={hasCommentator}>
                    <p>{hasCommentator ? '解説' : ''}</p>
                    {commentator}
                  </StCommentatorContainer>
                  <StInfoRightGroup>
                    <AnimParagraphFirst>{est}</AnimParagraphFirst>
                    <AnimParagraphSecond>{category}</AnimParagraphSecond>
                    <AnimParagraphFirst>{est}</AnimParagraphFirst>
                  </StInfoRightGroup>
                </StHorizontalGroup>
              </StInfoMainCamera>
            </StBottomRightGroup>
            <StCameraContainer />
            <StCameraAssistContent>{assistContent}</StCameraAssistContent>
          </StBottomContainer>
        </StWrapper>
      )
    } else {
      return (
        <StWrapper $image_url={props.mask_image_filename}>
          <StUpperHorizontalGroup>
            <RunnerContainer index={0} />
            <RunnerContainer index={1} />
          </StUpperHorizontalGroup>
          <StFrameContainer>
            <StWideFrame />
            <StWideFrame />
          </StFrameContainer>
          <StBottomContainer>
            <StBottomRightGroup $fullHeight={hasCommentator}>
              <StLogo>{logo}</StLogo>
              <StInfoMain>
                {title}
                <StHorizontalGroup>
                  <StCommentatorContainer $isVisible={hasCommentator}>
                    <p>{hasCommentator ? '解説' : ''}</p>
                    {commentator}
                  </StCommentatorContainer>
                  <StInfoRightGroup>
                    <AnimParagraphFirst>{est}</AnimParagraphFirst>
                    <AnimParagraphSecond>{category}</AnimParagraphSecond>
                    <AnimParagraphFirst>{est}</AnimParagraphFirst>
                  </StInfoRightGroup>
                </StHorizontalGroup>
              </StInfoMain>
            </StBottomRightGroup>
            <StAssistContent>{assistContent}</StAssistContent>
          </StBottomContainer>
        </StWrapper>
      )
    }
  } else {
    return null
  }
})

// #region styles

const StWrapper = styled(StWrapperBase) <{ $image_url: string }>`
  mask-image: url(${(props) => (props.$image_url)});
  -webkit-mask-image: url(${(props) => (props.$image_url)});
  justify-content: flex-end;
`

const StUpperHorizontalGroup = styled(StHorizontalGroup)`
  padding: 4px 0px;
  & > div {
    display: flex;
    flex-direction: row;
    width: 960px;
  }
`

const StFrameContainer = styled(StHorizontalGroup)`
  width: 100%;
  // height: 708px;
  height: 531px;
  margin-bottom: 60px;
  & > div:first-child {
    margin: 0 4px 0 8px;
  }
  & > div:last-child {
    margin: 0 8px 0 4px;
  }
`

const StRunnerInfoContainer = styled(StHorizontalGroup)`
  align-items: center;
  justify-content: space-between;
  padding: 0 30px 0 50px;
`

const StInfoMain = styled(StVerticalGroup)`
  flex-grow: 1;
  height: 100%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  & > p:nth-child(1){
    color:#fff;
    font-size: 2.6rem;
  font-weight: 900;
  text-align: center;
  line-height: 3.2rem;
  }
  & > p:nth-child(2) {
    padding-left: 60px;
  }
  p{
    color: #e9e9e9;
  }
`

const StInfoMainCamera = styled(StVerticalGroup)`
  flex-grow: 1;
  height: 100%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  & > p:nth-child(1){
    color:#fff;
    font-size: 2.6rem;
  font-weight: 900;
  text-align: center;
  line-height: 3.2rem;
  }
  & > p:nth-child(2) {
    padding-left: 60px;
  }
  p{
    color: #e9e9e9;
  }
`

const StCommentatorContainer = styled(StHorizontalGroup) <{ $isVisible: boolean }>`
  display: ${(props) => (props.$isVisible ? 'flex' : 'none')};
  justify-content: flex-end;
  align-items: center;
  font-size: 2rem;
  & > p {
    font-weight: 900;
  }

  & > p:first-child {
    padding: 0 20px;
  }

  & > p:nth-child(n + 2) {
    padding: 0 10px;
  }
`

const StBottomContainer = styled(StHorizontalGroup)`
  width: 100%;
  height: 314px;
  justify-content: space-between;
  align-items: center;
`

const StLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 320px;
  padding: 5px;
  & > img {
    max-width: 310px;
    max-height: 190px;
    object-fit: contain;
    align-self: 'center';
    padding: '0';
  }
`

const StBottomRightGroup = styled(StHorizontalGroup) <{ $fullHeight: boolean }>`
  height: ${(props) => (props.$fullHeight ? '229px' : '229px')};
  flex-grow: 1;
  margin: 10px;
  border: 4px solid #fff;
  border-radius: 8px;
`

const StInfoRightGroup = styled.div`
  margin-left: auto;
  max-width: 700px;
  height: 50px;
  & > p {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`

const StSpeaker = styled(StHorizontalGroup)`
  margin-bottom: -9px;
  align-items: center;
  width: 50px;
  & > svg {
    width: 40px;
  }
`

const StNameContainer = styled(StHorizontalGroup)`
  font-size: 2.1rem;
  font-weight: 900;
  margin-left: 40px;
  align-items: center;
  text-align: left;
`

const StIcon = styled.img`
  width: 50px;
  max-height: 60px;
`

const StCameraContainer = styled(StVerticalGroup)`
  margin: 10px 10px 10px 0;
  border: 4px solid white;
  border-radius: 8px;
  padding: 0;
  height:229px;
  width:403px;
  align-items: center;
  justify-content: center;
`

const StAssistContent = styled.div`
  width: 320px;
  height: 304px;
  display: flex;
  flex-direction: column;
  margin: 5px 10px 10px 0;
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
    padding: 5px 15px;
    max-height: 258px;
    overflow-y: hidden;
  }
  p:nth-child(2):empty {
    padding: 0;
  }
  & > img {
    max-width: 100%;
    max-height: 258px;
    margin: auto;
    object-fit: contain;
    flex: auto;
  }
`

const StCameraAssistContent = styled.div`
  width: 304px;
  height: 304px;
  display: flex;
  flex-direction: column;
  margin: 5px 10px 10px 0;
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
    padding: 5px 15px;
    max-height: 258px;
    overflow-y: hidden;
  }
  p:nth-child(2):empty {
    padding: 0;
  }
  & > img {
    max-width: 100%;
    max-height: 258px;
    margin: auto;
    object-fit: contain;
    flex: auto;
  }
`

const StTimer = styled(StHorizontalGroup) <{ $isVisible: boolean }>`
  width: 240px;
  height: 46px;
  margin-right: 70px;
  background-color: rgb(65 87 145);
  opacity: ${(props) => (props.$isVisible ? '1' : '0')};
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  align-items: center;
  & > p {
    font-family: 'Noto Sans Mono', monospace;
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
    transform: translateY(-46px) rotate3d(1, 0, 0, 120deg);
    opacity: 0;
  }
  95% {
    transform: translateY(-46px) rotate3d(1, 0, 0, -120deg);
    opacity: 0;
    animation-timing-function: ease-in-out;
  }
  100% {
    transform: translateY(-92px) rotate3d(1, 0, 0, 0deg);
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
    transform: translateY(-46px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
  }
  95% {
    transform: translateY(-46px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
    animation-timing-function: ease-in-out;
  }
  100% {
    transform: translateY(-92px) rotate3d(1, 0, 0, 120deg);
    opacity: 0;
  }
`

const AnimParagraphFirst = styled.p`
  margin-left: auto;
  width: 350px;
  animation: 30s infinite ${AnimFirst};
`

const AnimParagraphSecond = styled.p`
  max-width: 700px;
  padding: 0 5px;
  animation: 30s infinite ${AnimSecond};
  text-align: center;
`

// #endregion styles
