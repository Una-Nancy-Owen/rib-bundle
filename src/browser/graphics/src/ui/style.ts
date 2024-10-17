import styled from 'styled-components'

export const StVerticalGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

export const StHorizontalGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const StSquareFrame = styled.div`
  aspect-ratio: 4/3;
  background-color: rgba(255 255 255 / 0%);
`

export const StWideFrame = styled.div`
  aspect-ratio: 16/9;
  background-color: rgba(255 255 255 / 0%);
`

export const StWrapperBase = styled(StVerticalGroup)`
  width: 1920px;
  height: 1080px;
  background-color: black;
  justify-content: center;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: 0% 0%;
  -webkit-mask-position: 0% 0%;
`

export const StWrapperBaseH = styled(StHorizontalGroup)`
  width: 1920px;
  height: 1080px;
  background-color: black;
  justify-content: center;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-position: 0% 0%;
  -webkit-mask-position: 0% 0%;
`

export const StOneBottomLeft = styled(StVerticalGroup)`
  max-width: 1272px;
  flex-grow: 1;
  justify-content: space-around;
`

export const StOneTitleParagraph = styled.p`
  font-size: 3rem;
  font-weight: 900;
  white-space: nowrap;
  text-overflow: ellipsis;
`
