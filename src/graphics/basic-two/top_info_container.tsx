import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaGamepad } from 'react-icons/fa';
import { RunnerGroup, RunnerData } from 'rib-bundle';

// #region styles

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

// #endregion styles

export const TopInfoContainer = React.memo((props: { runnerGroup: RunnerGroup }) => {
  if (props.runnerGroup == undefined) return;
  const runnerInfo = props.runnerGroup.runners.map((runner: RunnerData, i) => <TopInfo key={`TopRunnerInfo${i.toString()}`} runner={runner} />);
  return <>{runnerInfo}</>;
});

export default TopInfoContainer;

const TopInfo = React.memo((props: { runner: RunnerData }) => {
  return (
    <RunnerInfoWrapper>
      <RunnerIconImg src={props.runner.icon} />
      <FaGamepad />
      <NameParagraph>{props.runner.name}</NameParagraph>
      <TimerParagraph>00:00:00</TimerParagraph>
    </RunnerInfoWrapper>
  );
});
