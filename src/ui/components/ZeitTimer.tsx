import * as React from 'react';
import {toZeitTimer} from '../utils/functions';
import {FaPlay} from 'react-icons/fa';
import {FaPause} from 'react-icons/fa';
import {FaStop} from 'react-icons/fa';

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
      <FaPlay
        onClick={
          status === 'PAUSED' ?
           handleResumeTimer : status === 'RESETTED'?
           handleStartTimer : () => {}
        }
        className={status === 'PAUSED' || status === 'RESETTED' ?
                  'clickable' : 'disabled'}
        size={26}
      />
      <FaPause
        onClick={
          status === 'STARTED' ?
          handlePauseTimer : () => {}
        }
        className={
          status === 'STARTED' ?
                  'clickable' : 'disabled'
        }
        size={26}
      />
      <FaStop
        onClick={status === 'STARTED' || status === 'PAUSED' ?
          handleStopTimer : () => {}}
        className={
          status === 'STARTED' || status === 'PAUSED' ?
                  'clickable' : 'disabled'
        }
        size={26}
      />
    </div>
  );
};

export default ZeitTimer;
