import {request} from '../ui/utils/api';
import {notify, registerCommandAction} from '../ui/utils/chrome';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Background got a message!');
  sendResponse({});
});

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === 'Zeit') {
    port.onDisconnect.addListener(function() {
      chrome.runtime.reload();
    });
  }
});

const startStop = () => {
  chrome.storage.local.get('apiKey', async function(result) {
    const start = await request('/api/v1/usr/time_records/start', 'POST',
        {},
        result.apiKey,
    );
    if (start.error || start.message === 'Timer was started already') {
      const pause = await request('/api/v1/usr/time_records/pause', 'POST',
          {},
          result.apiKey,
      );
      if (pause.error || pause.message === 'Timer was paused already') {
        await request('/api/v1/usr/time_records/resume', 'POST',
            {},
            result.apiKey,
        );
        notify('Zeit.io', 'Timer Resumed');
      } else {
        notify('Zeit.io', 'Timer Paused');
      }
    } else {
      notify('Zeit.io', 'Timer Started');
    }
  });
};

registerCommandAction(startStop, 'start-stop', 'settings');
