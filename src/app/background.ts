import {request} from '../utils/request';
import {notify, registerCommandAction} from '../utils/utils';

const sendMessagePromise = (tabId, item) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, {item}, (response) => {
      if (response?.complete) {
        resolve('fullfilled');
      }
    });
  });
};

chrome.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      chrome.storage.local.get('apiKey', async function(result) {
        if (message.message == 'integration-start-stop') {
          startStop(sender.tab.id);
          // chrome.tabs.create({
          //   active: true,
          //   url: '../popup.html',
          // }, null);
        } else if (message.message == 'integration-initialize') {
          const pause = await request('/api/v1/usr/time_records/pause',
              'POST',
              {},
              result.apiKey,
          );
          if (pause.status === 200) {
            sendMessagePromise(sender.tab.id, 'PAUSED');
          } else if (pause.status === 201) {
            request('/api/v1/usr/time_records/resume',
                'POST',
                {},
                result.apiKey,
            );
            sendMessagePromise(sender.tab.id, 'STARTED');
          } else if (pause.status === 401 || pause.status === 400) {
            sendMessagePromise(sender.tab.id, 'STOPPED');
          } else if (pause.status === 404) {
            sendMessagePromise(sender.tab.id, 'ERROR');
          }
        }
      });
    });
// chrome.runtime.onConnect.addListener(async function(port) {
//   await chrome.storage.local.set({loading: true});

//   if (port.name === 'Zeit') {
//     port.onDisconnect.addListener(function() {
//       chrome.storage.local.get(['loading'], (result) => {
//         if (result.loading) {
//           // chrome.runtime.reload();
//         }
//       });
//     });
//   }
// });

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
chrome.runtime.onConnect.addListener((port) => {
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

const startStop = async (tabId=undefined) => {
  return await chrome.storage.local.get('apiKey', async function(result) {
    const start = await request('/api/v1/usr/time_records/start', 'POST',
        {},
        result.apiKey,
    );
    if (start.status === 404) {
      if (tabId) sendMessagePromise(tabId, 'ERROR');
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
        if (tabId) sendMessagePromise(tabId, 'STARTED');
        notify('ZEIT.IO', 'Timer Resumed');
        return;
      } else if (pause.status === 201) {
        if (tabId) sendMessagePromise(tabId, 'PAUSED');
        notify('ZEIT.IO', 'Timer Paused');
        return;
      }
    } else if (start.status === 201) {
      if (tabId) sendMessagePromise(tabId, 'STARTED');
      notify('ZEIT.IO', 'Timer Started');
      return;
    }
    if (tabId) sendMessagePromise(tabId, 'STOPPED');
  });
};

// context Right Click
chrome.contextMenus.removeAll(function() {
  chrome.contextMenus.create({
    id: 'start-stop-right',
    title: 'Start/Pause Timer',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener((i, tab) => {
  if (i.menuItemId === 'start-stop-right') {
    startStop();
  }
});

registerCommandAction(startStop, 'start-stop', 'settings');
