import {createChromeStorageStateHookLocal} from 'use-chrome-storage';

export const reload = () => {
  chrome.runtime.reload();
};

chrome.runtime.connect({name: 'Zeit'});

export const useStore = createChromeStorageStateHookLocal('apiKey');
export const useClock = createChromeStorageStateHookLocal('clock');
