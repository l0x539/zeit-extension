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

// chrome.windows.onRemoved.addListener(function() {
//   chrome.storage.local.get('apiKey', async function(result) {
//     chrome.storage.local.get('settings', async (results) => {
//       if (results?.settings?.StopBrowser) {
//         await request('/api/v1/usr/time_records/pause', 'POST',
//             {},
//             result.apiKey,
//         );
//       }
//     });
//   });
// });

chrome.windows.onCreated.addListener(function() {
  chrome.storage.local.get('apiKey', async function(result) {
    chrome.storage.local.get('settings', async (results) => {
      if (results?.settings?.startBrowser) {
        const start = await request('/api/v1/usr/time_records/start', 'POST',
            {},
            result.apiKey,
        );
        if (start.status === 200) {
          const resume = await request('/api/v1/usr/time_records/resume',
              'POST',
              {},
              result.apiKey,
          );
          if (resume.status === 201) {
            notify('ZEIT.IO', 'Timer Resumed');
          }
        } else if (start.status === 201) {
          notify('ZEIT.IO', 'Timer Started');
        }
      }
    });
  });
});

chrome.windows.onRemoved.addListener(function() {
  chrome.storage.local.get('apiKey', async function(result) {
    chrome.storage.local.get('settings', async (results) => {
      if (results?.settings?.StopBrowser) {
        const pause = await request('/api/v1/usr/time_records/pause', 'POST',
            {},
            result.apiKey,
        );
        if (pause.status !== 200) {
          notify('ZEIT.IO', 'Timer Paused');
        }
      }
    });
  });
});

const startStop = () => {
  chrome.storage.local.get('apiKey', async function(result) {
    const start = await request('/api/v1/usr/time_records/start', 'POST',
        {},
        result.apiKey,
    );
    if (start.status === 404) {
      notify('ZEIT.IO', 'You\'re not logged in.');
      return;
    } else if (start.status === 200) {
      const pause = await request('/api/v1/usr/time_records/pause', 'POST',
          {},
          result.apiKey,
      );
      if (pause.status === 200) {
        await request('/api/v1/usr/time_records/resume', 'POST',
            {},
            result.apiKey,
        );
        notify('ZEIT.IO', 'Timer Resumed');
      } else if (pause.status === 201) {
        notify('ZEIT.IO', 'Timer Paused');
      }
    } else if (start.status === 201) {
      notify('ZEIT.IO', 'Timer Started');
    }
  });
};

// context Right Click
chrome.contextMenus.create({
  id: 'start-stop-right',
  title: 'Start/Pause Timer',
  contexts: ['all'],
});

chrome.contextMenus.onClicked.addListener((i, tab) => {
  if (i.menuItemId === 'start-stop-right') {
    startStop();
  }
});

registerCommandAction(startStop, 'start-stop', 'settings');
