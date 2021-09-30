import * as React from 'react';
import {Status} from '../../../../utils/types';
import FavIconSvg from '../../../components/FavIconSvg';


const resolveTimer = (status: Status) => {
  switch (status) {
    case 'STARTED':
      return 'Pause';
    case 'PAUSED':
      return 'Resume';
    case 'STOPPED':
      return 'START';
    case 'ERROR':
    default:
      return false;
  }
};

const ZeitGithubButton = () => {
  const [timerStatus, setTimerStatus] = React.useState<Status>('STOPPED');
  const [loading, setLoading] = React.useState<boolean>(true);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    chrome.runtime.sendMessage({message: 'github-initialize'});
  }, []);

  React.useEffect(() => {
    chrome.runtime.onMessage.addListener(
        async (message, sender, sendResponse) => {
          console.log('receiving message backaend:', message);
          setTimerStatus(message?.item);
          setLoading(false);
        });
  }, []);


  const handleStartStop = () => {
    try {
      chrome.runtime.sendMessage({message: 'github-start-stop'},
          function(resp) {
            console.log('resp br', resp);

            /* callback */
          });
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
