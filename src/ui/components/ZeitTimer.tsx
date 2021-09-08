import * as React from 'react';
import {toZeitTimer} from '../utils/functions';
import {BsFillPlayFill} from 'react-icons/bs';
import {BsPauseFill} from 'react-icons/bs';
import {BsStopFill} from 'react-icons/bs';

export type TimerStatus = 'PAUSED' | 'STARTED' | 'RESETTED'

/*
 * Timer that shows timer or start/pause/stop
 */
const ZeitTimer = ({
  timer,
  handleStartTimer,
  handleStopTimer,
  handlePauseTimer,
  handleResumeTimer,
  status,
}: {
    timer: number
    handleStartTimer: () => void
    handleStopTimer: () => void
    handlePauseTimer: () => void
    handleResumeTimer: () => void
    status: TimerStatus
}) => {
  return (
    <div
      className="timer_section d-flex align-items-center mx-auto"
    >
      {toZeitTimer(timer)}
      <BsFillPlayFill
        onClick={
          status === 'PAUSED' ?
           handleResumeTimer : status === 'RESETTED'?
           handleStartTimer : () => {}
        }
        className={status === 'PAUSED' || status === 'RESETTED' ?
                  'clickable' : 'disabled'}
        size={45}
      />
      <BsPauseFill
        onClick={
          status === 'STARTED' ?
          handlePauseTimer : () => {}
        }
        className={
          status === 'STARTED' ?
                  'clickable' : 'disabled'
        }
        size={45}
      />
      <BsStopFill
        onClick={status === 'STARTED' ? handleStopTimer : () => {}}
        className={
          status === 'STARTED' ?
                  'clickable' : 'disabled'
        }
        size={45}
      />
    </div>
  );
};

export default ZeitTimer;
