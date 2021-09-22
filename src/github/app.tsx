import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AuthProvider from '../shared/AuthProvider';
import '../styles/github.css';
import ZeitGithubButton from './components/ZeitButton';

console.info('Zeit extention.');
const _parent = document.getElementById('repository-container-header');
const _nav = _parent?.getElementsByTagName('nav')[0];
const _ul = _nav?.getElementsByTagName('ul')[0];
const _newLi = document.createElement('li');
_newLi.className = 'd-inline-flex';
_newLi.setAttribute('data-view-component', 'true');
_ul.appendChild(_newLi);


const GithubApp = () => {
  return (
    <AuthProvider>
      <ZeitGithubButton />
    </AuthProvider>
  );
};

ReactDOM.render(<GithubApp />, _newLi);
