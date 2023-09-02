import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BaseWrapper, TopContainer, BaseDisplayContainer, RightContainer, BottomContainer } from '../ui';
import AssistContainer from './AssistContainer';
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
            <AssistContainer />
          </RightContainer>
        </TopContainer>
        <BottomContainer>
          <RunnerInfoContainer />
        </BottomContainer>
      </Wrapper>
    </>
  );
}
