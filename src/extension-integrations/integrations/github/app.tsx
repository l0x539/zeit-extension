import * as React from 'react';
import ZeitIntegrationButton from '../../components/ZeitButton';

const App = () => {
  const title = React.useMemo(() => document.querySelector(
      'h1.gh-header-title .markdown-title',
  ).textContent, []);

  const ticketId = React.useMemo(() => document.querySelector(
      'h1.gh-header-title .f1-light',
  ).textContent, []);
  return (
    <ZeitIntegrationButton className={`UnderlineNav-item 
    hx_underlinenav-item no-wrap 
    js-responsive-underlinenav-item 
    js-selected-navigation-item
    zeit-github`}
    title={title}
    ticketId={ticketId}
    />
  );
};

export default App;
