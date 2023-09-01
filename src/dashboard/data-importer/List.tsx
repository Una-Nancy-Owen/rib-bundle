import React from 'react';
import { RunnerData, RunnerGroup as RunnerGroupUl } from 'rib-bundle';
import { RunnerDataUl, RunnerDataLi, RunnerDataListContainerUl } from './ui';

const RunnerGroupArrayUl = React.memo((props: { runnerGroupArray: RunnerGroupUl[] }) => {
  const runnerItems = props.runnerGroupArray.map((runnerGroup: RunnerGroupUl, i) => <RunnerGroupUl runnerGroup={runnerGroup} key={'importerRunnerGroup' + i.toString()} />);
  return <RunnerDataListContainerUl>{runnerItems}</RunnerDataListContainerUl>;
});
export default RunnerGroupArrayUl;

const RunnerGroupUl = React.memo((props: { runnerGroup: RunnerGroupUl }) => {
  const runners = props.runnerGroup.runners.map((data: RunnerData, i) => <RunnerProps runner={data} key={'importerRunners' + i.toString()} />);
  const commentators = props.runnerGroup.commentators.map((data: RunnerData, i) => <RunnerProps runner={data} key={'importerCommentators' + i.toString()} />);
  return (
    <>
      {runners}
      {commentators}
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
