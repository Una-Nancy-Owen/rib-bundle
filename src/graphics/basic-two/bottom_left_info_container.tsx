import React from 'react';
import styled, { keyframes } from 'styled-components';
import { RunnerGroup, RunnerData } from 'rib-bundle';
import { FaGamepad } from 'react-icons/fa';
import { BsMicFill } from 'react-icons/bs';
import Banner from './banner';

// #region styles

const BottomLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TitleParagraph = styled.p`
  font-size: 3rem;
  font-weight: 700;
`;

const BasicRunnerInfoMain = styled.div`
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
  30% {
    transform: translateY(0px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
    animation-timing-function: ease-in-out;
  }
  33% {
    transform: translateY(-58px) rotate3d(1, 0, 0, 120deg);
    opacity: 0;
  }
  63% {
    transform: translateY(-58px) rotate3d(1, 0, 0, -120deg);
    opacity: 0;
    animation-timing-function: ease-in-out;
  }
  66% {
    transform: translateY(-116px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
  }
  96% {
    transform: translateY(-116px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
    animation-timing-function: ease-in-out;
   }
  100% {
    transform: translateY(-174px) rotate3d(1, 0, 0, 120deg);
    opacity: 1;
   }
`;

const AnimSecond = keyframes`
  0% {
    transform: translateY(0px) rotate3d(1, 0, 0, -120deg);
    opacity: 0;
  }
  30% {
    transform: translateY(0px) rotate3d(1, 0, 0, -120deg);
    opacity: 0;
    animation-timing-function: ease-in-out;
  }
  33% {
    transform: translateY(-58px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
  }
  63% {
    transform: translateY(-58px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
    animation-timing-function: ease-in-out;
  }
  66% {
    transform: translateY(-116px) rotate3d(1, 0, 0, 120deg);
    opacity: 0;
  }
  96% {
    transform: translateY(-116px) rotate3d(1, 0, 0, -120deg);
    opacity: 0;
    animation-timing-function: ease-in-out;
   }
  100% {
    transform: translateY(-174px) rotate3d(1, 0, 0, 0deg);
    opacity: 1;
   }
  }

`;

const AnimParagraphFirst = styled.p`
  animation: 45s infinite ${AnimFirst};
  text-align: center;
`;

const AnimParagraphSecond = styled.p`
  animation: 45s infinite ${AnimSecond};
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

export const BottomLeftInfoContainer = React.memo((props: { runnerGroup: RunnerGroup }) => {
  if (props.runnerGroup == undefined) return;
  const runnerData = props.runnerGroup.runners[0];
  const runnerNames = props.runnerGroup.runners.map((runner: RunnerData, i) => <RunnerName key={`RunnerName${i.toString()}`} runner={runner} />);
  const commentatorNames = props.runnerGroup.commentators.map((commentator: RunnerData, i) => <CommentatorName key={`CommentatorName${i.toString()}`} commentator={commentator} />);
  return (
    <BottomLeftContainer>
      <BasicRunnerInfoMain>
        <TitleParagraph>{runnerData.title}</TitleParagraph>
        <RollContainer>
          <AnimParagraphFirst>予定タイム :{runnerData.estimatedTime}</AnimParagraphFirst>
          <AnimParagraphSecond>{runnerData.platform}</AnimParagraphSecond>
          <AnimParagraphFirst>{runnerData.category}</AnimParagraphFirst>
          <AnimParagraphSecond>予定タイム :{runnerData.estimatedTime}</AnimParagraphSecond>
        </RollContainer>
      </BasicRunnerInfoMain>
      <BasicRunnerInfoSub>
        <MainNameGrid>
          {runnerNames}
          {commentatorNames}
        </MainNameGrid>
      </BasicRunnerInfoSub>
      <Banner />
    </BottomLeftContainer>
  );
});

export default BottomLeftInfoContainer;

const RunnerName = React.memo((props: { runner: RunnerData }) => {
  return (
    <InfoParagraph>
      <FaGamepad />
      {props.runner.name}
    </InfoParagraph>
  );
});

const CommentatorName = React.memo((props: { commentator: RunnerData }) => {
  return (
    <InfoParagraph>
      <BsMicFill />
      {props.commentator.name}
    </InfoParagraph>
  );
});
