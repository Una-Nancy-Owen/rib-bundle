import {
  StHorizontalGroup,
  StOneBottomLeft,
  StOneTitleParagraph,
  StSquareFrame,
  StVerticalGroup,
  StWrapperBase,
} from '@ui/style'
import { keyframes, styled } from 'styled-components'
import useRunnerGroup from '@hooks/useRunnerGroup'
import useAssistContent from '@hooks/useAssistContent'
import useTimerSplitParagraph from '@hooks/useTimerSplitParagraph'
import useLogo from '@hooks/useLogo'

export default function App() {
  const runnerGroup = useRunnerGroup()
  const timerSplitParagraph = useTimerSplitParagraph(2)
  const assistContent = useAssistContent()
  const logo = useLogo()
  if (runnerGroup != null) {
    const title = runnerGroup.title.join('')
    const commentator = runnerGroup.commentators.map((data, index) => <p key={`commentator${index}`}>{data.name}</p>)
    const hasCommentator = 0 < runnerGroup.commentators.length
    const est = `予定タイム ${runnerGroup.estimatedTime}`
    const category = `${runnerGroup.category}`
    return (
      <StWrapper>
        <StUpperContainer>
          <StSquareFrame />
          <StUpperVerticalGroup>
            <StLogo>{logo}</StLogo>
            <StRightContainer>
              <StCommentatorContainer $isVisible={0 < runnerGroup.commentators.length}>
                <p>{hasCommentator ? '解説' : ''}</p>
                {commentator}
              </StCommentatorContainer>
              <StAssistContent>{assistContent}</StAssistContent>
            </StRightContainer>
          </StUpperVerticalGroup>
        </StUpperContainer>
        <StLeftContainer>
          <StBottomContainer>
            <StIcon src={runnerGroup.runners[0].icon} />
            <StBottomInfoContainer>
              <StOneBottomLeft>
                <StOneTitleParagraph>
                  {title} / {runnerGroup.platform}
                </StOneTitleParagraph>
                <StNameParagraph>{runnerGroup.runners[0].name}</StNameParagraph>
              </StOneBottomLeft>
              <StBottomRight>
                <StTimer>{timerSplitParagraph![0]}</StTimer>
                <StInfoRightGroup>
                  <AnimParagraphFirst>{est}</AnimParagraphFirst>
                  <AnimParagraphSecond>{category}</AnimParagraphSecond>
                  <AnimParagraphFirst>{est}</AnimParagraphFirst>
                </StInfoRightGroup>
              </StBottomRight>
            </StBottomInfoContainer>
          </StBottomContainer>
        </StLeftContainer>
      </StWrapper>
    )
  } else {
    return null
  }
}

// #region styles

const StWrapper = styled(StWrapperBase)`
  mask-image: url('mask_square_one.png');
  -webkit-mask-image: url('mask_square_one.png');
`

const StUpperVerticalGroup = styled(StVerticalGroup)`
  height: 100%;
  width: 366px;
  margin-left: 4px;
  justify-content: flex-end;
`
const StLeftContainer = styled(StVerticalGroup)`
  width: 100%;
`

const StUpperContainer = styled(StHorizontalGroup)`
  height: 876px;
  & > div:first-child {
    margin: 6px auto;
  }
`

const StRightContainer = styled(StVerticalGroup)`
  margin: 10px 10px 5px 0px;
  border: 4px solid white;
  border-radius: 8px;
  padding: 20px 0;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`

const StBottomContainer = styled(StHorizontalGroup)`
  width: 100%;
  height: 204px;
  align-items: center;
`

const StBottomRight = styled(StVerticalGroup)`
  justify-content: space-around;
  align-items: flex-end;
`

const StLogo = styled.div`
  display: flex;
  justify-content: center;
  height: 160px;
  & > img {
    max-height: 160px;
    object-fit: contain;
    align-self: 'center';
    padding: 10px 10px 0 0;
  }
`

const StIcon = styled.img`
  max-height: 100%;
  padding: 0 6px 6px 6px;
  object-fit: contain;
`

const StBottomInfoContainer = styled(StHorizontalGroup)`
  height: 184px;
  flex-grow: 1;
  padding: 20px;
  margin: 10px 10px 10px 30px;
  position: relative;
  overflow: visible;
  border: 4px solid #fff;
  border-radius: 8px;
  &:before {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -40px;
    border-width: 20px;
    border-style: solid;
    border-color: transparent rgb(255, 255, 255) transparent transparent;
    border-image: initial;
    z-index: 1;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: -34px;
    border-width: 20px;
    border-style: solid;
    border-color: transparent #000 transparent transparent;
    border-image: initial;
    z-index: 2;
  }
`

const StNameParagraph = styled.p`
  padding-left: 40px;
  font-size: 2.2rem;
  font-weight: 900;
  text-align: left;
`

const StCommentatorContainer = styled(StVerticalGroup)<{ $isVisible: boolean }>`
  font-size: 1.8rem;
  font-weight: 900;
  text-align: center;
  padding: 20px 0;
  display: ${(isVisible) => (isVisible.$isVisible ? 'flex' : 'none')};
  & > p:first-child {
    padding: 0 20px;
  }
`

const StAssistContent = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  p:first-child {
    font-size: 1.6rem;
    font-weight: 900;
    margin-bottom: 10px;
    text-align: center;
    white-space: nowrap;
    text-overflow: clip;
    color: rgb(255, 255, 0);
  }
  p:nth-child(2) {
    font-weight: 700;
    font-size: 1.6rem;
    height: 446px;
    padding: 4px 25px;
    overflow-y: hidden;
  }
  p:nth-child(2):empty {
    padding: 0;
    height: 0;
  }
  & > img {
    max-width: 100%;
    height: 446px;
    object-fit: contain;
  }
`

const StTimer = styled(StHorizontalGroup)`
  width: 350px;
  background-color: rgb(65 87 145);
  & > p {
    font-size: 2.4rem;
    font-weight: 900;
    text-align: center;
    font-family: 'Noto Sans Mono', monospace;
  }
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
  animation: 30s infinite ${AnimSecond};
  text-align: center;
`

// #endregion styles
