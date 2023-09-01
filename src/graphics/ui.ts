import styled from 'styled-components';

export const BorderedDivElement = styled.div`
  border: 5px solid #fff;
  border-radius: 16px;
`;

export const BaseWrapper = styled.div`
  background-color: rgba(0,0,0,0);
  display: flex;
  width: 1920px;
  height: 1080px;
  font-family: 'Noto Sans JP', sans-serif;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 1920px;
  height: 810px;
`;

export const BottomContainer = styled.div`
  background-color:#000;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 1920px;
  height: 270px;
`;

export const BaseDisplayContainer = styled.div`
  border: none;
  display: flex;
  border:1px solid #fff;
`;

export const RightContainer = styled.div`
  background-color:#000;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 480px;
  height: 810px;
`;

export const BannerImg = styled.img`
  object-fit: contain;
`;

export const BaseAssistContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BaseAssistHeader = styled.p`
  color: yellow;
  text-align: center;
  overflow-wrap: break-word;
`;

export const BaseAssistImg = styled.img`
  object-fit: contain;
`;

export const BaseAssistExp = styled.p`
  color: #fff;
  text-align: left;
  white-space: pre-wrap;
  overflow: hidden;
`;