import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGamepad } from 'react-icons/fa';
import { BsMicFill } from 'react-icons/bs';
import { BaseWrapper, BaseDisplayContainer, BorderedDivElement, BaseAssistHeader, BaseAssistExp, BaseAssistImg, BaseAssistContainer } from '../ui';

//#region styles

const Wrapper = styled(BaseWrapper)`
  flex-direction: column;
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BottomContainer = styled.div`
  display: flex;
  flex-grow: 1;
  background-color: #000;
`;

const NameContainer = styled.div`
  background-color: #000;
`;

const RunnerInfoBorder = styled(BorderedDivElement)`
  margin: 6px 10px;
  display: flex;
  flex-direction: row;
  align-content: center;
  flex-wrap: wrap;
`;

const RunnerInfoWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  padding: 5px 10px;

  svg {
    height: 50px;
    font-size: 3.5rem;
    padding-left: 20px;
  }
`;

const RunnerIconImg = styled.img`
  width: 50px;
`;

const NameParagraph = styled.p`
  padding-left: 10px;
  font-size: 2rem;
  font-weight: 700;
`;

const TimerParagraph = styled.p`
  margin-left: auto;
  padding-right: 20px;
  font-size: 2rem;
  font-weight: 700;
`;

const DisplayContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  aspect-ratio: 8/3;
  :nth-child(1) {
    border-right: 2px solid #fff;
  }
  :nth-child(2) {
    border-left: 2px solid #fff;
  }
`;

const BorderedContent = styled(BorderedDivElement)`
  position: relative;
  display: flex;
  width: 100%;
  margin: 20px;
  padding: 20px;
`;

const Display = styled(BaseDisplayContainer)`
  width: 50%;
  aspect-ratio: 4/3;
`;

const BottomLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AssistContainer = styled(BaseAssistContainer)`
  flex-grow: 1;
  font-size: 2rem;
  width: 350px;
`;

const AssistHeader = styled(BaseAssistHeader)<{ isDisplay: boolean }>`
  display: ${(props) => (props.isDisplay ? 'inline' : 'none')};
  font-size: 1.7rem;
  overflow: hidden;
  text-wrap: nowrap;
`;

const AssistExp = styled(BaseAssistExp)<{ isDisplay: boolean }>`
  display: ${(props) => (props.isDisplay ? 'inline' : 'none')};
  overflow-y: hidden;
`;

const AssistImg = styled(BaseAssistImg)<{ isDisplay: boolean }>`
  display: ${(props) => (props.isDisplay ? 'block' : 'none')};
  height: 233px;
  padding: 0px 4px;
`;

const TitleParagraph = styled.p`
  font-size: 3rem;
  font-weight: 700;
`;

const BasicRunnerInfoMain = styled.p`
  display:flex;
  align-items:center;
}
`;

const Logo = styled.img`
  bottom: 10px;
  right: 10px;
  height: 80px;
  width: 250px;
  position: absolute;
  object-fit: contain;
`;

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
    transform: translateY(-58px) rotate3d(1, 0, 0, 120deg);
    opacity: 0;
  }
  95% {
    transform: translateY(-58px) rotate3d(1, 0, 0, -120deg);
    opacity: 0;
    animation-timing-function: ease-in-out;
  }
  100% {
    transform: translateY(-116px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
  }
`;

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
    transform: translateY(-58px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
  }
  95% {
    transform: translateY(-58px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
    animation-timing-function: ease-in-out;
  }
  100% {
    transform: translateY(-116px) rotate3d(1, 0, 0, 120deg);
    opacity: 0;
  }
`;

const AnimParagraphFirst = styled.p`
  animation: 30s infinite ${AnimFirst};
`;

const AnimParagraphSecond = styled.p`
  animation: 30s infinite ${AnimSecond};
  text-align: center;
`;

const InfoParagraph = styled.p`
  font-size: 2.5rem;
  line-height: 2.5rem;

  svg {
    margin-bottom: 6px;
    margin-right: 10px;
    vertical-align: middle;
  }
`;
const RollContainer = styled.div`
  height: 58px;
  margin-left: auto;
  font-size: 2.5rem;
  font-weight: 700;
`;

const BasicRunnerInfoSub = styled.div`
  height: 120px;
  font-size: 2.5rem;
  font-weight: 700;
  padding-left: 40px;
  display: flex;
  flex-grow: 1;
  align-items: left;
`;

const MainNameGrid = styled.div`
  display: flex;
  flex-flow: column wrap;
  max-width: 100%;
  min-width: 60%;
  svg {
    height: 50px;
    font-size: 3.5rem;
    padding-left: 20px;
  }
`;

// #endregion styles

export function App() {
  return (
    <>
      <Wrapper>
        <TopContainer>
          <NameContainer>
            <RunnerInfoBorder>
              <RunnerInfoWrapper>
                <RunnerIconImg src='https://avatars.githubusercontent.com/u/110347377?v=4' />
                <FaGamepad />
                <NameParagraph>テストネーム1</NameParagraph>
                <TimerParagraph>00:00:00</TimerParagraph>
              </RunnerInfoWrapper>
              <RunnerInfoWrapper>
                <RunnerIconImg src='https://avatars.githubusercontent.com/u/110347377?v=4' />
                <FaGamepad />
                <NameParagraph>テストネーム2</NameParagraph>
                <TimerParagraph>00:00:00</TimerParagraph>
              </RunnerInfoWrapper>
            </RunnerInfoBorder>
          </NameContainer>
          <DisplayContainer>
            <Display />
            <Display />
          </DisplayContainer>
        </TopContainer>
        <BottomContainer>
          <BorderedContent>
            <BottomLeftContainer>
              <BasicRunnerInfoMain>
                <TitleParagraph>ゲームタイトル・・・・・・・ / Switch</TitleParagraph>
                <RollContainer>
                  <AnimParagraphFirst>予定タイム :00:30:00</AnimParagraphFirst>
                  <AnimParagraphSecond>Any%</AnimParagraphSecond>
                  <AnimParagraphFirst>予定タイム :00:30:00</AnimParagraphFirst>
                </RollContainer>
              </BasicRunnerInfoMain>
              <BasicRunnerInfoSub>
                <MainNameGrid>
                  <InfoParagraph>
                    <FaGamepad />
                    走者A
                  </InfoParagraph>
                  <InfoParagraph>
                    <FaGamepad />
                    走者B
                  </InfoParagraph>
                  <InfoParagraph>
                    <BsMicFill />
                    解説者A
                  </InfoParagraph>
                </MainNameGrid>
              </BasicRunnerInfoSub>
              <Logo src='https://media.discordapp.net/attachments/1134506925996920923/1144993333941375086/rib_small_logo_350x197_trim.png' />
            </BottomLeftContainer>
          </BorderedContent>
          <AssistContainer>
            <AssistHeader isDisplay={true}>テストヘッダー</AssistHeader>
            <AssistExp isDisplay={false}>テストコンテント</AssistExp>
            <AssistImg isDisplay={true} src='https://media.discordapp.net/attachments/804636603535327313/1139882510222905404/2a451c6162d50409.jpg' />
          </AssistContainer>
        </BottomContainer>
      </Wrapper>
    </>
  );
}
