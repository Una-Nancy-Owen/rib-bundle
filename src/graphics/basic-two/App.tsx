import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { BaseWrapper, BaseDisplayContainer, BorderedDivElement, BaseAssistHeader, BaseAssistExp, BaseAssistImg, BaseAssistContainer } from '../ui';
import TopInfoContainer from './TopInfoContainer';
import { RunnerGroup } from 'rib-bundle';
import BottomLeftInfoContainer from './BottomLeftInfoContainer';
import { AssistContainer } from './AssistContainer';

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

// #endregion styles

export function App() {
  const runnerGroupRef = useRef<RunnerGroup>();
  const [runnerGroup, setRunnerGroup] = useState<RunnerGroup>();
  useEffect(() => {
    nodecg.Replicant('currentRunnerGroup').on('change', (newVal) => {
      if (newVal == undefined) return;
      setRunnerGroup(newVal);
      runnerGroupRef.current = newVal;
    });
  }, []);
  return (
    <>
      <Wrapper>
        <TopContainer>
          <NameContainer>
            <RunnerInfoBorder>
              <TopInfoContainer runnerGroup={runnerGroup!} />
            </RunnerInfoBorder>
          </NameContainer>
          <DisplayContainer>
            <Display />
            <Display />
          </DisplayContainer>
        </TopContainer>
        <BottomContainer>
          <BorderedContent>
            <BottomLeftInfoContainer runnerGroup={runnerGroup!} />
          </BorderedContent>
          <AssistContainer />
        </BottomContainer>
      </Wrapper>
    </>
  );
}
