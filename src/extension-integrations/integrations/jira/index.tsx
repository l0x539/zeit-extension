import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {injectTag} from '../../../extension-inject/app';
import App from './app';
import './styles/jira.css';

setInterval(() => {
  const findUrl = (new URL(document.location.href))
      .searchParams.get('selectedIssue');
  // eslint-disable-next-line max-len
  const isSet = document.querySelector('div[data-test-id="issue.views.issue-base.context.status-and-approvals-wrapper.status-and-approval"] > div .jira-zeit');
  // eslint-disable-next-line max-len
  const isReady = document.querySelector('div[data-test-id="issue.views.issue-base.context.status-and-approvals-wrapper.status-and-approval"] > div');
  if (!isSet && findUrl && isReady) {
    const injectElement = injectTag({
      // eslint-disable-next-line max-len
      query: 'div[data-test-id="issue.views.issue-base.context.status-and-approvals-wrapper.status-and-approval"] > div',
      tag: 'button',
      className: `jira-zeit`,
    });
    ReactDOM.render(<App />, injectElement);
  }
}, 1000);
