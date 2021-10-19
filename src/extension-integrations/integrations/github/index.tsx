import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {injectTag} from '../../../extension-inject/app';
import App from './app';
import './styles/github.css';

const injectElement = injectTag({
  query: '#repository-container-header > nav > ul',
  tag: 'li',
  className: 'd-inline-flex github-zeit',
  attributes: [{
    key: 'data-view-component',
    value: 'true',
  }],
});


ReactDOM.render(<App />, injectElement);
