import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RunnerData, RunnerGroup } from 'rib-bundle';
import { Button } from '../ui';
import styled from 'styled-components';
import { BiRun } from 'react-icons/bi';

// #region styles

const RunnerGroupDivision = styled.div`
  margin-bottom: 16px;
`;

const CaptionDivision = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 38px;
  margin: 0px 20px 10px;
  svg {
    font-size: 1.8rem;
    margin-right: 10px;
  }
`;

const CaptionParagraph = styled.p`
  font-weight: 700;
  font-size: 1.1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
`;

const RunnerChangeButton = styled(Button)`
  background-color: #d14b4b;
  margin-left: auto;
  &:hover {
    background-color: #f77676;
  }

  &:active {
    color: #ccc;
    background-color: #852f2e;
    box-shadow: 0 0 0 1px white;
  }
`;

// isCurrentがtrueの時は現在の走者グループ用、falseの時は次の走者グループ用の背景色に切り替える
const RunnerGroupDataDivision = styled.div<{ $isCurrent: boolean }>`
  background: ${(props) => (props.$isCurrent ? '#c75f6c' : '#c97a53')};
  border-radius: 8px;
  box-sizing: border-box;
  font-weight: 600;
  padding: 5px 0px;
  & > * {
    margin: 0px 10px;
    padding: 4px 16px;
  }
  & > p {
    border-top: 1px dashed #fff;
  }
  & > p:first-child {
    font-size: 1.15rem;
    border-top: none;
  }
`;

const RunnerDataImg = styled.img`
  object-fit: contain;
  width: 50px;
  height: 50px;
`;

const RunnerNamesDivision = styled.div`
  border-top: 1px dashed #fff;
  display: flex;
  & > p {
    padding-left: 10px;
  }
  p:first-child {
    padding-left: 0px;
  }
`;

const RunnerIconsDivision = styled.div`
  border-top: 1px dashed #fff;
  display: flex;
  & > img {
    margin-left: 5px;
  }
  img:first-child {
    margin-left: 0px;
  }
`;

const RunnerDataParagraph = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
// #endregion styles

// 現在、次の走者グループを切り替えるためのコンポーネント
export const RunnerSwitcher = React.memo((props: { runnerGroupArray: RunnerGroup[] }) => {
  const nextGroupIndexRef = useRef<number>(1); // 次の走者グループのインデックスの参照

  const onClickHandler = useCallback(() => {
    // 次の走者に変更するボタンを押した時のハンドラ
    if (nextGroupIndexRef.current < 0) return; // 次の走者グループのインデックスが0未満の時はreturn
    if (nextGroupIndexRef.current < props.runnerGroupArray.length) {
      // 次の走者グループのインデックスが走者グループの配列より小さい時
      nodecg.sendMessage('setCurrentRunnerGroupIndex', nextGroupIndexRef.current); // NodeCGに次の走者グループの新しいインデックスをセットするメッセージを送る
    }
  }, []);

  return (
    <>
      <RunnerGroupDivision>
        <CaptionDivision>
          <BiRun />
          <CaptionParagraph>現在の走者</CaptionParagraph>
          <RunnerChangeButton onClick={onClickHandler}>次の走者に変更する</RunnerChangeButton>
        </CaptionDivision>
        <CurrentRunnerGroupDivision runnerGroupArray={props.runnerGroupArray} />
      </RunnerGroupDivision>
      <RunnerGroupDivision>
        <CaptionDivision>
          <BiRun />
          <CaptionParagraph>次の走者</CaptionParagraph>
        </CaptionDivision>
        <NextRunnerGroupDivision runnerGroupArray={props.runnerGroupArray} index={nextGroupIndexRef} />
      </RunnerGroupDivision>
    </>
  );
});
export default RunnerSwitcher;

// 現在の走者表示用のコンポーネント
const CurrentRunnerGroupDivision = React.memo((props: { runnerGroupArray: RunnerGroup[] }) => {
  const [curerntGroupIndex, setCurrentGroupIndex] = useState<number>(0); // 現在の走者グループのインデックスの状態管理
  useEffect(() => {
    // 最初に一度だけ呼ばれる
    nodecg.Replicant('currentRunnerGroupIndex').on('change', (newVal) => {
      // 現在の走者グループのインデックスのレプリカントが変更された時のイベントリスナーを登録
      if (newVal != undefined) {
        // 新しい値が定義済みの時
        setCurrentGroupIndex(newVal); // 現在の走者グループのインデックスの状態を新しい値で更新
      }
    });
  }, []);
  return <RunnerGroupDetail runnerGroup={props.runnerGroupArray[curerntGroupIndex]} isCurrent={true}></RunnerGroupDetail>;
});

// 次の走者表示用のコンポーネント
const NextRunnerGroupDivision = React.memo((props: { runnerGroupArray: RunnerGroup[]; index: React.MutableRefObject<number> }) => {
  const [nextGroupIndex, setNextGroupIndex] = useState<number>(1); // 次の走者グループのインデックスの状態管理
  useEffect(() => {
    nodecg.Replicant('nextRunnerGroupIndex').on('change', (newVal) => {
      // 次の走者グループのインデックスのレプリカントが更新された時のイベントリスナーを登録
      if (newVal != undefined) {
        // 新しい値が定義済みの時
        props.index.current = newVal; // 次の走者グループのインデックスの参照を新しい値で更新
        setNextGroupIndex(newVal); // 次の走者グループのインデックスの状態を新しい値で更新
      }
    });
  }, []);
  if (nextGroupIndex < 0) {
    return (
      <RunnerGroupDataDivision $isCurrent={false}>
        <RunnerDataParagraph>-----</RunnerDataParagraph>
        <RunnerDataParagraph>----- / -----</RunnerDataParagraph>
        <RunnerNamesDivision>
          <RunnerDataParagraph>-----</RunnerDataParagraph>
        </RunnerNamesDivision>
        <RunnerIconsDivision>
          <RunnerDataImg />
        </RunnerIconsDivision>
        <RunnerDataParagraph>-----</RunnerDataParagraph>
      </RunnerGroupDataDivision>
    );
  } else {
    return <RunnerGroupDetail runnerGroup={props.runnerGroupArray[nextGroupIndex]} isCurrent={false}></RunnerGroupDetail>;
  }
});

// 走者グループの表示用コンポーネント
const RunnerGroupDetail = React.memo((props: { runnerGroup: RunnerGroup; isCurrent: boolean }) => {
  // isCurrentは現在の走者の時はtrue、次の走者の時はfalseを代入する
  const runnerGroup = props.runnerGroup;
  const runnerData = props.runnerGroup.runners[0]; // 走者固有の情報(名前やアイコンなど)以外は一人目の走者の情報を参照する
  return (
    <RunnerGroupDataDivision $isCurrent={props.isCurrent}>
      <RunnerDataParagraph>{runnerData.group + ': ' + runnerData.title}</RunnerDataParagraph>
      <RunnerDataParagraph>{runnerData.platform + ' / ' + runnerData.category}</RunnerDataParagraph>
      <RunnerNamesAndIcons runners={runnerGroup.runners} />
      <RunnerNamesAndIcons runners={runnerGroup.commentators} />
      <RunnerDataParagraph>{runnerData.estimatedTime}</RunnerDataParagraph>
    </RunnerGroupDataDivision>
  );
});

// 走者名とアイコン表示用のコンポーネント
const RunnerNamesAndIcons = React.memo((props: { runners: RunnerData[] }) => {
  const runners = props.runners;
  if (runners == undefined) return <></>;
  if (runners.length == 0) return <></>;
  const names = runners.map((data: RunnerData, k) => <RunnerDataParagraph key={'runnerName' + k.toString()}>{data.name}</RunnerDataParagraph>);
  const icons = runners.map((data: RunnerData, k) => <RunnerDataImg key={'runnerIcon' + k.toString()} src={data.icon} />);
  return (
    <>
      <RunnerNamesDivision>{names}</RunnerNamesDivision>
      <RunnerIconsDivision>{icons}</RunnerIconsDivision>
    </>
  );
});
