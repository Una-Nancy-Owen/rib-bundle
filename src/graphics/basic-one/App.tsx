import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RunnerData, RunnerGroup } from 'rib-bundle';
import { BaseWrapper, TopContainer, BaseDisplayContainer, RightContainer, BottomContainer } from '../ui';
import AssistWrapper from './AssistWrapper';
import RunnerInfoContainer from './RunnerInfoContainer';
import Banner from './Banner';

const Wrapper = styled(BaseWrapper)`
  flex-direction: column;
  justify-content: flex-end;
`;

const DisplayContainer = styled(BaseDisplayContainer)`
  aspect-ratio: 16/9;
`;

export function App() {
  return (
    <>
      <Wrapper>
        <TopContainer>
          <DisplayContainer />
          <RightContainer>
            <Banner />
            <AssistWrapper />
          </RightContainer>
        </TopContainer>
        <BottomContainer>
          <RunnerInfoContainer />
        </BottomContainer>
      </Wrapper>
    </>
  );
}
