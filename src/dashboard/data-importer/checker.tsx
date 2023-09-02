import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AssistContent, RunnerGroup } from 'rib-bundle';
import { Button } from '../ui';

const Checker = React.memo(() => {
  const [runnerIsInitialized, setRunnerIsInitialized] = useState(false);
  const [highlightIsInitialized, setHighlightIsInitialized] = useState(false);
  const [illustIsInitialized, setIllustIsInitialized] = useState(false);
  const runnersLength = useRef<number>(-1);
  const highlightsLength = useRef<number>(-1);
  const illustsLength = useRef<number>(-1);
  useEffect(() => {
    // 最初に一度だけ呼ばれる
    nodecg.Replicant('runnerGroups').on('change', (newVal) => {
      // 走者情報のレプリカントに変更が検知された時
      if (newVal != undefined) {
        // 新しいデータが未定義だった時
        if (0 < newVal.length) {
          runnersLength.current = newVal.length;
          setRunnerIsInitialized(true);
        } else {
          runnersLength.current = -1;
          setRunnerIsInitialized(false);
        }
      } else {
        runnersLength.current = -1;
        setRunnerIsInitialized(false);
      }
    });
    nodecg.Replicant('highlight').on('change', (newVal) => {
      // 走者情報のレプリカントに変更が検知された時
      if (newVal != undefined) {
        // 新しいデータが未定義だった時
        if (0 < newVal.length) {
          highlightsLength.current = newVal.length;
          setHighlightIsInitialized(true);
        } else {
          highlightsLength.current = -1;
          setHighlightIsInitialized(false);
        }
      } else {
        highlightsLength.current = -1;
        setHighlightIsInitialized(false);
      }
    });
    nodecg.Replicant('illust').on('change', (newVal) => {
      // 走者情報のレプリカントに変更が検知された時
      if (newVal != undefined) {
        // 新しいデータが未定義だった時
        if (0 < newVal.length) {
          illustsLength.current = newVal.length;
          setIllustIsInitialized(true);
        } else {
          illustsLength.current = -1;
          setIllustIsInitialized(false);
        }
      } else {
        illustsLength.current = -1;
        setIllustIsInitialized(false);
      }
    });
    return () => {};
  }, []);
  const startAssistContentController: React.MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    nodecg.sendMessage('startAssistContentController');
  }, []);
  const isDisabled = !(runnerIsInitialized && highlightIsInitialized && illustIsInitialized);
  return (
    <>
      <ul>
        <li>走者: {runnerIsInitialized ? `入力済み (${runnersLength.current})` : '未入力'}</li>
        <li>見どころ: {highlightIsInitialized ? `入力済み (${highlightsLength.current})` : '未入力'}</li>
        <li>イラスト: {illustIsInitialized ? `入力済み (${illustsLength.current})` : '未入力'}</li>
        <li></li>
      </ul>
      <Button onClick={startAssistContentController} disabled={isDisabled}>
        Start
      </Button>
    </>
  );
});
export default Checker;
