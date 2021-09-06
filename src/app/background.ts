import {request} from '../ui/utils/api';

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
      }
    }
  });
};

chrome.commands.onCommand.addListener((command) => {
  if (command === 'start-stop') {
    chrome.storage.local.get('settings', (results) => {
      if (results?.settings?.startStop) {
        startStop();
      }
    });
  }
});
