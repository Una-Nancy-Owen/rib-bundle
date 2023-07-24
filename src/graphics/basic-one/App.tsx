import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 1920px;
  height: 1080px;
  font-family: 'Noto Sans JP', sans-serif;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 1920px;
  height: 800px;
`;

const BottomContainer = styled.div`
  border: 5px solid #fff;
  box-sizing: border-box;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1910px;
  height: 270px;
`;

const DisplayContainer = styled.div`
  border: none;
  display: flex;
  width: 1440px;
  height: 800px;
`;

const RightContainer = styled.div`
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 480px;
  height: 800px;
`;

const BannerContainer = styled.div`
  border: 5px solid #fff;
  box-sizing: border-box;
  margin: 5px;
  width: 470px;
  height: 190px;
`;

const AssistContainer = styled.div`
  border: 5px solid #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 5px;
  width: 470px;
  height: 590px;
`;

const AssistHeader = styled.p`
  padding: 10px 5px;
  height: 80px;
  color: yellow;
  font-size: 36px;
  text-align: center;
`;

const AssistImg = styled.img`
  object-fit: contain;
  height: 100%;
`;

const AssistExp = styled.p`
  padding: 10px 10px;
  height: 100%;
  color: #fff;
  font-size: 36px;
  text-align: left;
`;

export function App() {
  return (
    <>
      <Wrapper>
        <TopContainer>
          <DisplayContainer></DisplayContainer>
          <RightContainer>
            <BannerContainer></BannerContainer>
            <AssistContainer>
              <AssistHeader id='assist-p'></AssistHeader>
              <AssistImg id='assist-img' src='' />
              <AssistExp id='assist-exp'></AssistExp>
            </AssistContainer>
          </RightContainer>
        </TopContainer>
        <BottomContainer></BottomContainer>
      </Wrapper>
    </>
  );
}
