import * as React from 'react';
import {Button} from 'react-bootstrap';
import {toTimer} from '../utils/functions';

const TimerButton = ({timer, handleStartTimer, handleStopTimer}: {
    timer: number
    handleStartTimer: () => void
    handleStopTimer: () => void
}) => {
  return (
    <>
      {
        timer && timer > 0 ?
        <Button onClick={handleStopTimer}
          variant="danger"
          className="px-3">
          {toTimer(timer)}
        </Button> :
        <Button onClick={handleStartTimer}
          variant="danger"
          className="px-3">
            Start
        </Button>
      }
    </>
  );
};

export default TimerButton;
