import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { RunnerData, RunnerGroup } from 'rib-bundle';
import styled from 'styled-components';

// #region styles

const RunnerDataArrayContainer = styled.div`
  margin: 2% 0;
  overflow: auto;
  height: 96%;
  overflow-x: hidden;
`;

// 走者グループが現在の走者グループ、選択中、それ以外で背景色を切り替える
const RunnerDataContainer = styled.div<{ $stateColor: string }>`
  ${(props) => (props.$stateColor == 'current' ? 'background-color: #c75f6c' : '')};
  ${(props) => (props.$stateColor == 'selected' ? 'background-color: #c97a53' : '')};
  ${(props) => (props.$stateColor == 'normal' ? 'background-color: #5f91a9' : '')};
  margin: 8px;
  padding: 2px 0px;
  border-radius: 12px;
  box-sizing: border-box;
  font-weight: 600;

  &:hover {
    box-shadow: 0 0 0 1px white;
  }

  & > * {
    padding: 2px 16px;
    margin: 0px 10px;
  }
  & > p {
    border-top: 1px dashed #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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

const RunnerNamesContainer = styled.div`
  border-top: 1px dashed #fff;
  display: flex;
  & > p {
    padding-left: 10px;
  }
  p:first-child {
    padding-left: 0px;
  }
`;

const RunnerIconsContainer = styled.div`
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
  overflow: auto;
`;

// #endregion styles

// 次の走者グループを選択するためのコンポーネント
const NextRunnerSelector = React.memo((props: { runnerGroupArray: RunnerGroup[] }) => {
  const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(0); // 現在の走者グループのインデックスの状態管理用のフック
  const [nextGroupIndex, setNextGroupIndex] = useState<number>(1); // 次の走者グループのインデックスの状態管理用のフック
  useEffect(() => {
    // 最初に一度だけ呼ばれる
    nodecg.Replicant('currentRunnerGroupIndex').on('change', (newVal) => {
      // 現在の走者グループのインデックスのレプリカントが変更された時のイベントリスナーを登録
      if (newVal != undefined) {
        // 新しい値が定義済みの時
        setCurrentGroupIndex(newVal); // 現在の走者グループのインデックスに新しい値をセット
      }
    });
    nodecg.Replicant('nextRunnerGroupIndex').on('change', (newVal) => {
      // 次の走者グループのインデックスのレプリカントが変更された時のイベントリスナーを登録
      if (newVal == undefined) {
        // 新しい値が未定義の時
        setNextGroupIndex(1); // 次の走者グループのインデックスに1をセット
        return;
      }
      setNextGroupIndex(newVal); // 次の走者グループのインデックスに新しい値をセット
    });
  }, []);
  // 走者グループをクリックした時のイベントハンドラ
  const runnerGroupItemOnClickHandler = useCallback((currentIndex: number, nextIndex: number) => {
    // currentIndexは現在の走者グループのインデックス、nextIndexはクリックした走者グループのインデックス
    if (currentIndex == nextIndex) return; // 2つのインデックスが同じ時はreturn
    setNextGroupIndex(nextIndex); // 次の走者グループのインデックスにクリックした走者グループのインデックスをセット
    nodecg.sendMessage('setNextRunnerGroupIndex', nextIndex); // NodeCGに次の走者グループのインデックスを変更するメッセージを送信する
  }, []);

  // 現在、選択中の走者グループのインデックスと走者グループの配列のインデックスを比較して状態を返すための関数
  const stateToNum = useCallback((current: number, selected: number, index: number): string => {
    if (current == index) {
      // 配列のインデックスと現在の走者グループのインデックスと同じだった時
      return 'current';
    } else if (selected == index) {
      // 配列のインデックスと選択中の走者グループのインデックスが同じだった時
      return 'selected';
    } // それ以外の時
    return 'normal';
  }, []);

  // 走者グループの配列を回して各走者グループの情報をリスト化
  const runnerGroupItems = props.runnerGroupArray.map((runnerGroup: RunnerGroup, i) => (
    <RunnerDataContainer
      key={'runnerData' + i.toString()}
      $stateColor={stateToNum(currentGroupIndex, nextGroupIndex, runnerGroup.runners[0].group)}
      onClick={runnerGroupItemOnClickHandler.bind(this, currentGroupIndex, runnerGroup.runners[0].group)}>
      <RunnerGroupDetail runnerGroup={runnerGroup} />
    </RunnerDataContainer>
  ));
  return <RunnerDataArrayContainer>{runnerGroupItems}</RunnerDataArrayContainer>;
});
export default NextRunnerSelector;

// 走者グループの情報の表示用コンポーネント
const RunnerGroupDetail = React.memo((props: { runnerGroup: RunnerGroup }) => {
  const runnerGroup = props.runnerGroup;
  const runnerData = runnerGroup.runners[0]; // 走者固有の情報(名前やアイコンなど)以外は一人目の走者の情報を参照する
  return (
    <>
      <RunnerDataParagraph>{runnerData.group + ': ' + runnerData.title}</RunnerDataParagraph>
      <RunnerDataParagraph>{runnerData.platform + ' / ' + runnerData.category + ` / ` + runnerData.estimatedTime}</RunnerDataParagraph>
    </>
  );
});
