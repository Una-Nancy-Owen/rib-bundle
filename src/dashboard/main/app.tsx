import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RunnerGroup, GraphicsType } from 'rib-bundle';
import styled from 'styled-components';
import RacingTimer from './racing_timer';
import NextRunnerSelector from './next_runner_selector';
import RunnerSwitcher from './runner_switcher';

// #region styles

// ダッシュボード全体
const DashboardContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 20px 10px;
`;

// 左カラム
const LeftColumn = styled.div`
  width: 33%;
  height: 100%;
  padding: 0px 10px;
`;

// 中央カラム
const CenterColumn = styled.div`
  width: 34%;
  height: 100%;
  padding: 0px 10px;
`;

// 右カラム
const RightColumn = styled.div`
  width: 33%;
  height: 100%;
  padding: 0px 10px;
`;

// #endregion styles

export function App() {
  const [runnerGroupArray, setRunneGroupArray] = useState<RunnerGroup[]>(); // 走者情報のリストを管理するためのフック
  useEffect(() => {
    // 最初に一度だけ呼ばれる
    nodecg.Replicant('runnerGroups').on('change', (newVal) => {
      // 走者情報のレプリカントに変更が検知された時のイベントリスナーを登録
      if (newVal == undefined) {
        // 新しいデータが未定義だった時は return
        return;
      }
      setRunneGroupArray(newVal); // 新しい走者情報を代入する
    });
  }, []);
  if (runnerGroupArray !== undefined) {
    // 走者情報が定義済みの時コンポーネントを返す
    return (
      <>
        <DashboardContainer>
          <LeftColumn>
            <RunnerSwitcher runnerGroupArray={runnerGroupArray} />
          </LeftColumn>
          <CenterColumn>
            <NextRunnerSelector runnerGroupArray={runnerGroupArray} />
          </CenterColumn>
          <RightColumn>
            <RacingTimer />
          </RightColumn>
        </DashboardContainer>
      </>
    );
  } else {
    return <></>;
  }
}
