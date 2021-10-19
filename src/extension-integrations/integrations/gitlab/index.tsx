import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {injectTag} from '../../../extension-inject/app';
import App from './app';
import './styles/gitlab.css';

const injectElement = injectTag({
  query: '.detail-page-header > .detail-page-header-actions',
  tag: 'button',
  className: `btn 
  gl-display-none 
  gl-sm-display-inline-flex! 
  btn-default 
  btn-md 
  gl-button
  gl-mr-3
  gitlab-zeit`,
  attributes: [
    {
      key: 'type',
      value: 'button',
    },
    {
      key: 'data-qa-selector',
      value: 'start_timer_button',
    },
  ],
  queryOptions: {
    location: 'first',
  },
});


ReactDOM.render(<App />, injectElement);
