import {createChromeStorageStateHookLocal} from 'use-chrome-storage';

export const reload = () => {
    chrome.runtime.reload()
}

export const useStore = createChromeStorageStateHookLocal("apiKey");
