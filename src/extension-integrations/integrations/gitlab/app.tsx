import * as React from 'react';
import ZeitIntegrationButton from '../../components/ZeitButton';

const App = () => {
  const title = React.useMemo(() => document.querySelector(
      '.title-container > .title.qa-title',
  ).textContent.replace('#', ''), []);
  const ticketId = React.useMemo(() => document.querySelector(
      '.breadcrumbs-sub-title a',
  ).textContent.replace('#', ''), []);
  return (
    <ZeitIntegrationButton
      className=""
      title={title}
      ticketId={ticketId}
    />
  );
};

export default App;
