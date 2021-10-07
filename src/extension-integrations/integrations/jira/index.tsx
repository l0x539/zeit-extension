import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {injectTag} from '../../../extension-inject/app';
import App from './app';
import './styles/jira.css';

let isSet = false;

setInterval(() => {
  const findUrl = (new URL(document.location.href))
      .searchParams.get('selectedIssue');
  // eslint-disable-next-line max-len
  const isReady = document.querySelector('div[data-test-id="ref-spotlight-target-status-spotlight"] div:not([class]):not([data-test-id]) div:not([class]):not([data-test-id])');
  if (!isSet && findUrl && isReady) {
    console.log('here');
    const injectElement = injectTag({
      // eslint-disable-next-line max-len
      query: 'div[data-test-id="ref-spotlight-target-status-spotlight"] div:not([class]):not([data-test-id]) div:not([class]):not([data-test-id])',
      tag: 'button',
      className: `jira-zeit`,
    });
    isSet = true;
    ReactDOM.render(<App />, injectElement);
  }
}, 1000);
