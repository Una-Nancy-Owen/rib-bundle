import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../ui';
//#region styles

const TimerNumParagraph = styled.p`
  font-size: 2rem;
  font-family: 'Noto Sans Mono', monospace;
`;

//#endregion styles

export const RacingTimer = React.memo(() => {
  const startTimerRef = useRef<number>(0);
  const currentTimerRef = useRef<number>(0);
  const [isRunningTimer, setIsRunningTimer] = useState<boolean>(false);
  const [timeFormat, setTimeFormat] = useState<string>('00:00:00');
  const intervalId = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {}, []);
  function startTimer() {
    if (intervalId.current) return;
    setIsRunningTimer(true);
    startTimerRef.current = performance.now();
    intervalId.current = setInterval(() => {
      currentTimerRef.current = performance.now();
      const timerStr = timeToTimerFormat(startTimerRef.current, currentTimerRef.current);
      setTimeFormat(timerStr);
    }, 50);
  }

  function stopTimer() {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    } else {
      return;
    }
    setIsRunningTimer(false);
    intervalId.current = null;
    currentTimerRef.current = performance.now();
    const timerStr = timeToTimerFormat(startTimerRef.current, currentTimerRef.current);
    setTimeFormat(timerStr);
    startTimerRef.current = 0;
  }

  function resetTimer() {
    startTimerRef.current = 0;
    currentTimerRef.current = 0;
    const timerStr = timeToTimerFormat(startTimerRef.current, currentTimerRef.current);
    setTimeFormat(timerStr);
  }
  return (
    <>
      <Button onClick={startTimer} disabled={isRunningTimer}>
        Start
      </Button>
      <Button onClick={stopTimer} disabled={!isRunningTimer}>
        Stop
      </Button>
      <Button onClick={resetTimer} disabled={isRunningTimer}>
        Reset
      </Button>
      <TimerNumParagraph>{timeFormat}</TimerNumParagraph>
    </>
  );
});
export default RacingTimer;

function timeToTimerFormat(start: number, current: number): string {
  const currentSec = Math.floor((current - start) / 1000);
  const h = Math.floor(currentSec / 3600);
  const m = Math.floor((currentSec % 3600) / 60);
  const s = currentSec % 60;
  const hh = h < 10 ? `0${h}` : String(h);
  const mm = m < 10 ? `0${m}` : String(m);
  const ss = s < 10 ? `0${s}` : String(s);
  return `${hh}:${mm}:${ss}`;
}
