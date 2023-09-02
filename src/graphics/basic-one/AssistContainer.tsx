import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseAssistContainer, BaseAssistHeader, BaseAssistImg, BaseAssistExp } from '../ui';

import { AssistContent } from 'rib-bundle';

const AssistDivision = styled(BaseAssistContainer)`
  border: 5px solid #fff;
  border-radius: 16px;
  margin: 0 15px;
  width: 450px;
  height: 650px;
`;

const AssistHeader = styled(BaseAssistHeader)<{ isDisplay: boolean }>`
  display: ${(props) => (props.isDisplay ? 'inline' : 'none')};
  padding: 10px 5px;
  max-height: 160px;
  min-height: 70px;
  font-size: 36px;
  font-weight: 700;
`;

const AssistImg = styled(BaseAssistImg)<{ isDisplay: boolean }>`
  display: ${(props) => (props.isDisplay ? 'block' : 'none')};
  object-fit: contain;
  height: 100%;
`;

const AssistExp = styled(BaseAssistExp)<{ isDisplay: boolean }>`
  display: ${(props) => (props.isDisplay ? 'inline' : 'none')};
  padding: 10px 10px;
  height: 100%;
  font-size: 36px;
  line-height: 46px;
`;

const AssistContainer = () => {
  const [sandboxContent, setSandboxContent] = useState<AssistContent>();

  useEffect(() => {
    const defaultAssistMessage: AssistContent = {
      header: '',
      content: '',
      url: '',
      group: -10,
    };
    setSandboxContent(defaultAssistMessage);
    nodecg.Replicant('assistContent').on('change', (newVal) => {
      if (newVal === undefined) return;
      setSandboxContent(newVal);
    });
  }, []);
  if (sandboxContent === undefined) return;

  const showHeader = !(sandboxContent.header == '' || sandboxContent.header == undefined);
  const showContent = !(sandboxContent.content == '' || sandboxContent.content == undefined);
  const showImage = !(sandboxContent.url == '' || sandboxContent.url == undefined) && !showContent;

  return (
    <AssistDivision>
      <AssistHeader isDisplay={showHeader}>{sandboxContent.header}</AssistHeader>
      <AssistExp isDisplay={showContent}>{sandboxContent.content}</AssistExp>
      <AssistImg isDisplay={showImage} src={sandboxContent.url} />
    </AssistDivision>
  );
};

export default AssistContainer;
