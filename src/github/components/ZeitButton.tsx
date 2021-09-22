import * as React from 'react';
import FavIconSvg from '../../ui/components/FavIconSvg';

const ZeitGithubButton = () => {
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    chrome.runtime.sendMessage({message: 'github-status'},
        function(d) {
          console.log('main', d);

          /* callback */
        });
  }, []);

  const handleStartStop = () => {
    if (started) {
      chrome.runtime.sendMessage({message: 'github-start-stop'},
          function(resp) {
            console.log('resp br', resp);

            /* callback */
          });
    } else {
      setStarted(true);
    }
  };

  return (
    <a href="#"
      className={`UnderlineNav-item 
        hx_underlinenav-item no-wrap 
        js-responsive-underlinenav-item 
        js-selected-navigation-item
        zeit-github`}
      onClick={handleStartStop}>
      <FavIconSvg />
      <span data-content={`ZEIT.IO ${started? 'Stop':'Start'} Timer`}>
        ZEIT.IO {started? 'Stop':'Start'} Timer
      </span>
      <span className="Counter"></span>
    </a>
  );
};

export default ZeitGithubButton;
