import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {injectTag} from '../../../extension-inject/app';
import App from './app';
import './styles/zendesk.css';


setInterval(() => {
  // eslint-disable-next-line max-len
  const isReady = document
  // eslint-disable-next-line max-len
      .querySelector<HTMLElement>('div.ember-view.workspace:not(div[style="display: none;"]) header.ember-view nav.ember-view');
  const isSet = document
  // eslint-disable-next-line max-len
      .querySelector<HTMLElement>('div.ember-view.workspace:not(div[style="display: none;"]) header.ember-view nav.ember-view .zendesk-zeit');

  if (!isSet && isReady) {
    const injectElement = injectTag({
      // eslint-disable-next-line max-len
      query: 'div.ember-view.workspace:not(div[style="display: none;"]) header.ember-view nav.ember-view',
      tag: 'span',
      className: `ember-view btn active zendesk-zeit`,
    });
    ReactDOM.render(<App />, injectElement);
  }
}, 1000);
