import * as React from 'react';
import {useComment, useTicket} from '../../../../utils/chrome';
import {Status} from '../../../../utils/types';
import FavIconSvg from '../../../components/FavIconSvg';

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

interface GithubTicket {
  ticketBase: string
  ticketType: string
  title?: string
  ticketId?: string
}

const ZeitGithubButton = () => {
  const [timerStatus, setTimerStatus] = React.useState<Status>('STOPPED');
  const [loading, setLoading] = React.useState<boolean>(true);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  const [, setgithubTicket]: [
    GithubTicket,
    (value: GithubTicket) => void,
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
    chrome.runtime.sendMessage({message: 'github-initialize'});
  }, []);

  React.useEffect(() => {
    chrome.runtime.onMessage.addListener(
        async (message, sender, sendResponse) => {
          setTimerStatus(message?.item);
          setLoading(false);
        });
  }, []);

  const title = React.useMemo(() => document.querySelector(
      'h1.gh-header-title .markdown-title',
  ).textContent, []);

  const ticketId = React.useMemo(() => document.querySelector(
      'h1.gh-header-title .f1-light',
  ).textContent, []);


  const handleStartStop = () => {
    try {
      chrome.runtime.sendMessage({message: 'github-start-stop'},
          function(resp) {
            /* callback */
          });
      setgithubTicket({
        ticketBase: document.URL,
        ticketType: 'Github',
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
      className={`UnderlineNav-item 
        hx_underlinenav-item no-wrap 
        js-responsive-underlinenav-item 
        js-selected-navigation-item
        zeit-github`}
      onClick={handleStartStop}
      style={{cursor: status || loading?'pointer':'not-allowed'}}>
      <FavIconSvg />
      {loading?
      <span style={{color: 'gray'}}
        data-content={`Login to zeit extension.`}>
          Loading...
      </span>:
      status ?
      <span data-content={`ZEIT.IO ${status} Timer`}>
        ZEIT.IO {status} Timer
      </span> :
      <span style={{color: 'gray'}}
        data-content={`Login to zeit extension.`}>
      Login to zeit extension.
      </span>}
      <span className="Counter"></span>
    </a>
  );
};

export default ZeitGithubButton;
