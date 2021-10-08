import * as React from 'react';
import {useComment, useTicket} from '../../utils/chrome';
import {Status} from '../../utils/types';
import FavIconSvg from './FavIconSvg';
import '../../styles/zeit-button.css';

const resolveTimer = (status: Status) => {
  switch (status) {
    case 'STARTED':
      return 'Pause';
    case 'PAUSED':
      return 'Resume';
    case 'STOPPED':
      return 'Start';
    case 'ERROR':
    default:
      return false;
  }
};

interface Ticket {
  ticketBase: string
  ticketType: string
  title?: string
  ticketId?: string
}

const ZeitIntegrationButton = (
    {
      className,
      title,
      ticketId,
    }:
  {
    className: string,
    title?: string,
    ticketId?: string
  }) => {
  const [timerStatus, setTimerStatus] = React.useState<Status>('STOPPED');
  const [loading, setLoading] = React.useState<boolean>(true);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const [, setTicket]: [
    Ticket,
    (value: Ticket) => void,
    boolean,
    string
] = useTicket();

  const [, setComment]: [
    string,
    (value: string) => void,
    boolean,
    string
  ] = useComment();

  React.useEffect(() => {
    chrome.runtime.sendMessage({message: 'integration-initialize'});
  }, []);

  React.useEffect(() => {
    chrome.runtime.onMessage.addListener(
        async (message, sender, sendResponse) => {
          setTimerStatus(message?.item);
          setLoading(false);
        });
  }, []);

  const handleStartStop = () => {
    try {
      chrome.runtime.sendMessage({message: 'integration-start-stop'},
          function(resp) {
            /* callback */
          });
      const segments = document.URL.split('/');
      segments.pop();
      segments.push('');
      setTicket({
        ticketBase: segments.join('/'),
        ticketType: 'github',
        title,
        ticketId,
      });
      setComment(`${ticketId} ${title}:`);
    } catch {
      forceUpdate();
    }
  };

  const status = resolveTimer(timerStatus);

  return (
    <a href="#"
      className={`${className} zeit-btn`}
      onClick={handleStartStop}
      style={{cursor: status || loading?'pointer':'not-allowed'}}>
      <FavIconSvg />
      {loading?
      <span style={{color: 'gray'}}
        data-content={`Signin to the ZEIT.IO extension.`}>
          Loading...
      </span>:
      status ?
      <span data-content={`ZEIT.IO ${status} Timer`}>
        ZEIT.IO {status} Timer
      </span> :
      <span style={{color: 'gray'}}
        data-content={`Signin to the ZEIT.IO extension.`}>
      Login to zeit extension.
      </span>}
      <span className="Counter"></span>
    </a>
  );
};

export default ZeitIntegrationButton;
