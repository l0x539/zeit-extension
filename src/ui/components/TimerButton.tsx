import * as React from 'react';
import {Button} from 'react-bootstrap';
import {toTimer} from '../utils/functions';

/*
 * Timer button that shows timer or start/stop
 */
const TimerButton = ({timer, handleStartTimer, handleStopTimer}: {
    timer: number
    handleStartTimer: () => void
    handleStopTimer: () => void
}) => {
  const [isHover, setIsHover] = React.useState(false);

  return (
    <>
      {
        timer && timer > 0 ?
        <Button onClick={handleStopTimer}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          variant="danger"
          className="px-3 w-25">
          {
              isHover?
              'Stop' :
              toTimer(timer)
          }
        </Button> :
        <Button onClick={handleStartTimer}
          variant="danger"
          className="px-3 w-25">
            Start
        </Button>
      }
    </>
  );
};

export default TimerButton;
