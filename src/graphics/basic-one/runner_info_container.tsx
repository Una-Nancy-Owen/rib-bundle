import React, { useEffect, useRef, useState } from 'react';
import { RunnerData, RunnerGroup } from 'rib-bundle';
import styled, { keyframes } from 'styled-components';
import { BorderedDivElement } from '../ui';
import { FaGamepad } from 'react-icons/fa';
import { BsMicFill } from 'react-icons/bs';

//#region Style

const BasicRunnerIconContainer = styled.img`
  overflow: visible;
  object-fit: contain;
`;

const BasicRunnerInfoContainer = styled(BorderedDivElement)`
  margin: 20px 20px 20px 30px;
  width: 1640px;
  display: flex;
  position: relative;
  overflow: visible;
  flex-direction: column;
  padding: 40px;
  &:before {
    content: '';
    position: absolute;
    top: 165px;
    left: -45px;
    border-width: 20px;
    border-style: solid;
    border-color: transparent rgb(255, 255, 255) transparent transparent;
    border-image: initial;
    z-index: 1;
  }
  &:after {
    content: '';
    position: absolute;
    top: 165px;
    left: -38px;
    border-width: 20px;
    border-style: solid;
    border-color: transparent #000 transparent transparent;
    border-image: initial;
    z-index: 2;
  }
`;

const BasicRunnerInfoMain = styled.p`
  font-size: 3.2rem;
  font-weight: 900;
  white-space: pre-wrap;
`;

const BasicRunnerInfoSub = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  padding-left: 40px;
  display: flex;
  align-items: center;
`;

const InfoParagraph = styled.p`
  margin-right: 40px;

  svg {
    margin-bottom: 6px;
    margin-right: 10px;
    vertical-align: middle;
  }
`;

const RollContainer = styled.div`
  height: 58px;
  margin-left: auto;
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

//#endregion

export const RunnerInfoContainer = React.memo(() => {
  const [runner, setRunner] = useState<RunnerData>();
  const [commentators, setCommentators] = useState<RunnerData[]>();
  useEffect(() => {
    nodecg.Replicant('currentRunnerGroup').on('change', (newVal) => {
      if (newVal == undefined) return;
      if (0 < newVal.runners.length) {
        setRunner(newVal.runners[0]);
      }
      if (0 < newVal.commentators.length) {
        setCommentators(newVal.commentators);
      } else {
        setCommentators(undefined);
      }
    });
  }, []);
  if (runner == null) return;
  return (
    <>
      <BasicRunnerIconContainer src={runner.icon} />
      <BasicRunnerInfoContainer>
        <BasicRunnerInfoMain>
          {runner.title} / {runner.platform}
        </BasicRunnerInfoMain>
        <BasicRunnerInfoSub>
          <InfoParagraph>
            <FaGamepad /> {runner.name}
          </InfoParagraph>
          <InfoParagraph>
            <Commentator commentators={commentators!} />
          </InfoParagraph>

          <RollContainer>
            <AnimParagraphFirst>予定タイム :{runner.estimatedTime}</AnimParagraphFirst>
            <AnimParagraphSecond>{runner.category}</AnimParagraphSecond>
            <AnimParagraphFirst>予定タイム :{runner.estimatedTime}</AnimParagraphFirst>
          </RollContainer>
        </BasicRunnerInfoSub>
      </BasicRunnerInfoContainer>
    </>
  );
});
export default RunnerInfoContainer;

const Commentator = React.memo((props: { commentators: RunnerData[] }) => {
  if (props.commentators == undefined) return <></>;
  const items = props.commentators.map((data, i) => (
    <span key={'commentator' + i.toString()}>
      <BsMicFill /> {data.name}
    </span>
  ));
  return <>{items}</>;
});
