import * as React from 'react';
import {toZeitTimer} from '../utils/functions';
import {BsFillPlayFill} from 'react-icons/bs';
import {BsPauseFill} from 'react-icons/bs';
import {BsStopFill} from 'react-icons/bs';

/*
 * Timer that shows timer or start/pause/stop
 */
const ZeitTimer = ({
  timer,
  handleStartTimer,
  handleStopTimer,
  handlePauseTimer,
  handleResumeTimer,
}: {
    timer: number
    handleStartTimer: () => void
    handleStopTimer: () => void
    handlePauseTimer: () => void
    handleResumeTimer: () => void
}) => {
  return (
    <div className="timer_section">
      {toZeitTimer(timer)}
      <BsFillPlayFill
        onClick={handleStartTimer}
        className="clickable"
        size={35}
      />
      <BsPauseFill
        onClick={handlePauseTimer}
        className="disabled"
        size={35}
      />
      <BsStopFill
        onClick={handleStopTimer}
        className="fas fa-stop clickable"
        size={35}
      />
    </div>
  );
};

export default ZeitTimer;
