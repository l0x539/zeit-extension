/*
 * Chrome related calls and store hooks.
 */

import {createChromeStorageStateHookLocal} from 'use-chrome-storage';

export const reload = () => {
  chrome.runtime.reload();
};

chrome.runtime.connect({name: 'Zeit'});

export const notify = (title: string, description: string) => {
  chrome.storage.local.get('settings', async (results) => {
    if (results.settings.notifications) {
      chrome.notifications.create('start-stop', {
        type: 'basic',
        iconUrl: 'https://d2ldomkd7flzzm.cloudfront.net/assets/logo-1b1939c78f5369f959943e65b78943cd505527bcfe9f1d44c4c33d5e0e47eeeb.png',
        title: title,
        message: description,
        priority: 2,
      },
      function(id) {
        setTimeout(function() {
          chrome.notifications.clear(id);
        }, 3000);
      });
    }
  });
};

export const registerCommandAction = (
    func: () => void,
    command: string,
    key: string,
) => {
  chrome.commands.onCommand.addListener((cmd) => {
    if (cmd === command) {
      chrome.storage.local.get(key, (results) => {
        if (results?.settings?.startStop) {
          func();
        }
      });
    }
  });
};

export const useStore = createChromeStorageStateHookLocal('apiKey');
export const useClock = createChromeStorageStateHookLocal('clock');
export const useComment = createChromeStorageStateHookLocal('comment');
export const useSettings = createChromeStorageStateHookLocal('settings', {
  startStop: false,
  startBrowser: false,
  StopBrowser: false,
  alarmReminder: false,
  notifications: true,
  askPause: true,
});
