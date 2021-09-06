/*
 * Chrome related calls and store hooks.
 */

import {createChromeStorageStateHookLocal} from 'use-chrome-storage';

export const reload = () => {
  chrome.runtime.reload();
};

chrome.runtime.connect({name: 'Zeit'});

export const useStore = createChromeStorageStateHookLocal('apiKey');
export const useClock = createChromeStorageStateHookLocal('clock');
export const useComment = createChromeStorageStateHookLocal('comment');
export const useSettings = createChromeStorageStateHookLocal('settings', {
  startStop: false,
  startBrowser: false,
  StopBrowser: false,
  alarmReminder: false,
});
