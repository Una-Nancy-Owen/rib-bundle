import {
  StHorizontalGroup,
  StWideFrame,
  StVerticalGroup,
  StOneBottomLeft,
  StOneTitleParagraph,
  StWrapperBase,
} from '@ui/style'
import { styled } from 'styled-components'
import useRunnerGroup from '@hooks/useRunnerGroup'
import useAssistContent from '@hooks/useAssistContent'
import useTimerSplitParagraph from '@hooks/useTimerSplitParagraph'
import useLogo from '@hooks/useLogo'
import { RollParagraph } from '@components/RollParagraph'

export const WideOneBase = ((props: { mask_image_filename: string, show_timer: boolean, camera: boolean }) => {
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
    const platform = runnerGroup.platform

    if (props.camera) {
      return (
        <StWrapper $image_url={props.mask_image_filename}>
          <StUpperContainer>
            <StWideFrame />
            <StUpperVerticalGroup>
              <StLogo>{logo}</StLogo>
              <StRightCameraContainer>
                <StCameraAssistContent>{assistContent}</StCameraAssistContent>
              </StRightCameraContainer>
              <StCameraContainer />
            </StUpperVerticalGroup>
          </StUpperContainer>
          <StLeftContainer>
            <StBottomContainer>
              <StIcon src={runnerGroup.runners[0].icon} />
              <StBottomInfoContainer>
                <StOneBottomLeft>
                  <StOneTitleParagraph>
                    {title}
                  </StOneTitleParagraph>
                  <StBottomInfo>
                    <StNameParagraph>{runnerGroup.runners[0].name}</StNameParagraph>
                    <StCameraCommentatorContainer $isVisible={0 < runnerGroup.commentators.length}>
                      <p>{hasCommentator ? '解説 ' : ''}</p>
                      {commentator}
                    </StCameraCommentatorContainer>
                    <StInfoDark>
                      <RollParagraph p1={est} p2={category} p3={platform} />
                    </StInfoDark>
                  </StBottomInfo>

                </StOneBottomLeft>
                <StBottomRight>
                  <StTimerLarge $showTimer={props.show_timer}>{(props.show_timer ? timerSplitParagraph![0] : null)}</StTimerLarge>
                </StBottomRight>
              </StBottomInfoContainer>
            </StBottomContainer>
          </StLeftContainer>
        </StWrapper>
      )
    } else {
      return (
        <StWrapper $image_url={props.mask_image_filename}>
          <StUpperContainer>
            <StWideFrame />
            <StUpperVerticalGroup>
              <StLogo>{logo}</StLogo>
              <StRightContainer>
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
                    {title}
                  </StOneTitleParagraph>
                  <StBottomInfo>
                    <StNameParagraph>{runnerGroup.runners[0].name}</StNameParagraph>
                    <StCommentatorContainer $isVisible={0 < runnerGroup.commentators.length}>
                      <p>{hasCommentator ? '解説 ' : ''}</p>
                      {commentator}
                    </StCommentatorContainer>
                  </StBottomInfo>
                </StOneBottomLeft>
                <StBottomRight>
                  <StTimer $showTimer={props.show_timer}>{(props.show_timer ? timerSplitParagraph![0] : null)}</StTimer>
                  <StInfoRightGroup>
                    <RollParagraph p1={est} p2={category} p3={platform} />
                  </StInfoRightGroup>
                </StBottomRight>
              </StBottomInfoContainer>
            </StBottomContainer>
          </StLeftContainer>
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
  margin: 10px 10px 5px 0;
  border: 4px solid white;
  border-radius: 8px;
  padding: 20px 0;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`

const StRightCameraContainer = styled(StRightContainer)`
  padding: 10px 0;
`

const StCameraContainer = styled(StVerticalGroup)`
  margin: 10px 10px 5px 0px;
  border: 4px solid white;
  border-radius: 8px;
  padding: 0;
  height:235px;
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
  min-width: 204px;
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
  margin-right:auto;
  padding-left: 40px;
  font-size: 2.2rem;
  font-weight: 900;
  text-align: left;
`

const StCommentatorContainer = styled(StHorizontalGroup) <{ $isVisible: boolean }>`
  font-size: 2.2rem;
  font-weight: 900;
  text-align: center;
  display: ${(isVisible) => (isVisible.$isVisible ? 'flex' : 'none')};
  & > p:first-child {
    padding: 0 20px;
  }
  padding-right: 40px;
`

const StCameraCommentatorContainer = styled(StCommentatorContainer) <{ $isVisible: boolean }>`
  display: ${(isVisible) => (isVisible.$isVisible ? 'flex' : 'none')};
  & > p:first-child {
    padding: 0 20px;
  }
  padding-right: 0;
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
    max-height: 446px;
    padding: 4px 25px;
    overflow-y: hidden;
  }
  p:nth-child(2):empty {
    padding: 0;
    height: 0;
  }
  & > img {
    max-width: 100%;
    max-height: 446px;
    object-fit: contain;
    flex: auto;
  }
`

const StCameraAssistContent = styled(StAssistContent)`
  max-height: 403px;

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
    max-height: 446px;
    padding: 4px 25px;
    overflow-y: hidden;
  }
  p:nth-child(2):empty {
    padding: 0;
    height: 0;
  }
  & > img {
    max-width: 100%;
    max-height: 348px;
    object-fit: contain;
    flex: auto;
  }
`

const StTimer = styled(StHorizontalGroup) <{ $showTimer: boolean }>`
  margin: 10px 25px 0;
  width: 300px;
  height: 52px;
  background-color: ${(props) => (props.$showTimer ? 'rgb(65 87 145)' : 'transparent')};
  & > p {
    font-size: 2.4rem;
    font-weight: 900;
    text-align: center;
    font-family: 'Noto Sans Mono', monospace;
  }
`

const StBottomInfo = styled(StHorizontalGroup)`
  justify-content: flex-end;
`

const StTimerLarge = styled(StHorizontalGroup) <{ $showTimer: boolean }>`
  width: 350px;
  height: 104px;
  background-color: ${(props) => (props.$showTimer ? 'rgb(65 87 145)' : 'transparent')};
  & > p {
    font-size: 4.5rem;
    font-weight: 900;
    text-align: center;
    font-family: 'Noto Sans Mono', monospace;
  }
`

const StInfoDark = styled.div`
  padding-top: 2px;
  max-width: 700px;
  height: 50px;
  & > p {
    margin-left: auto;
    width:350px;
    max-width:350px;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    color: #e9e9e9;
    white-space: nowrap;
    text-overflow: unset;
  }

  & > p:nth-child(2){
    width: auto;
    max-width:700px;
    
  }
`

const StInfoRightGroup = styled.div`
  padding-top: 4px;
  max-width: 700px;
  height: 50px;
  & > p {
    margin-left: auto;
    width:350px;
    max-width:350px;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    white-space: nowrap;
    text-overflow: unset;
  }

  & > p:nth-child(2){
    width: auto;
    max-width:700px;
    
  }
`

// #endregion styles
