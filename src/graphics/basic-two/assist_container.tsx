import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BaseAssistContainer, BaseAssistHeader, BaseAssistImg, BaseAssistExp } from '../ui';

import { AssistContent } from 'rib-bundle';

const AssistDivision = styled(BaseAssistContainer)`
  flex-grow: 1;
  font-size: 2rem;
  width: 350px;
`;

const AssistHeader = styled(BaseAssistHeader)<{ $isDisplay: boolean }>`
  display: ${(props) => (props.$isDisplay ? 'inline' : 'none')};
  font-size: 1.7rem;
  overflow: hidden;
  text-wrap: nowrap;
`;

const AssistExp = styled(BaseAssistExp)<{ $isDisplay: boolean }>`
  display: ${(props) => (props.$isDisplay ? 'inline' : 'none')};
  overflow-y: hidden;
`;

const AssistImg = styled(BaseAssistImg)<{ $isDisplay: boolean }>`
  display: ${(props) => (props.$isDisplay ? 'block' : 'none')};
  height: 233px;
  padding: 0px 4px;
`;

export const AssistContainer = () => {
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
      <AssistHeader $isDisplay={showHeader}>{sandboxContent.header}</AssistHeader>
      <AssistExp $isDisplay={showContent}>{sandboxContent.content}</AssistExp>
      <AssistImg $isDisplay={showImage} src={sandboxContent.url} />
    </AssistDivision>
  );
};

export default AssistDivision;
