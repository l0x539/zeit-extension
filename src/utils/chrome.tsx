/*
 * Chrome related calls and store hooks.
 */

import {createChromeStorageStateHookLocal} from 'use-chrome-storage';

export const useStore = createChromeStorageStateHookLocal('apiKey');
export const useUserInfos = createChromeStorageStateHookLocal('user');
export const useClock = createChromeStorageStateHookLocal('clock');
export const useComment = createChromeStorageStateHookLocal('comment');
export const useTicket = createChromeStorageStateHookLocal('ticket', {
  ticketBase: null,
  ticketType: null,
  title: null,
  ticketId: null,
});
export const useSettings = createChromeStorageStateHookLocal('settings', {
  startStop: false,
  startBrowser: false,
  StopBrowser: false,
  alarmReminder: false,
  notifications: true,
  askPause: false,
});
