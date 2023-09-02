import React from 'react';
import { RunnerData, RunnerGroup } from 'rib-bundle';
import styled from 'styled-components';

// #region styles

const RunnerDataListContainerUl = styled.ul`
  list-style: none;
  padding: 0;
  overflow: auto;
  max-height: 1000px;
  overflow-x: hidden;
`;

const RunnerDataUl = styled.ul`
  list-style: none;
  background: rgba(50, 180, 200, 0.3);
  border: 1px solid #fff;
  border-radius: 0.3rem;
  margin: 0.5rem;
  padding: 0;
`;

const RunnerDataLi = styled.li`
  border: 1px dashed rgba(255, 255, 255, 0.2);
  margin: 0 0 -1px;
  padding: 2px 4px;
  overflow-wrap: break-word;
`;

// #endregion styles

const RunnerGroupArrayUl = React.memo((props: { runnerGroupArray: RunnerGroup[] }) => {
  const runnerItems = props.runnerGroupArray.map((runnerGroup: RunnerGroup, i) => <RunnerGroupUl runnerGroup={runnerGroup} key={'importerRunnerGroup' + i.toString()} />);
  return <RunnerDataListContainerUl>{runnerItems}</RunnerDataListContainerUl>;
});
export default RunnerGroupArrayUl;

const RunnerGroupUl = React.memo((props: { runnerGroup: RunnerGroup }) => {
  const runners = props.runnerGroup.runners.map((data: RunnerData, i) => <RunnerProps runner={data} key={'importerRunners' + i.toString()} />);
  const commentators = props.runnerGroup.commentators.map((data: RunnerData, i) => <RunnerProps runner={data} key={'importerCommentators' + i.toString()} />);
  return (
    <>
      <RunnerDataUl>
        {runners}
        {commentators}
      </RunnerDataUl>
    </>
  );
});

const RunnerProps = React.memo((props: { runner: RunnerData }) => {
  return (
    <>
      <RunnerDataLi>{props.runner.group}</RunnerDataLi>
      <RunnerDataLi>{props.runner.title}</RunnerDataLi>
      <RunnerDataLi>{props.runner.platform}</RunnerDataLi>
      <RunnerDataLi>{props.runner.name}</RunnerDataLi>
      <RunnerDataLi>{props.runner.icon}</RunnerDataLi>
      <RunnerDataLi>{props.runner.estimatedTime}</RunnerDataLi>
    </>
  );
});
