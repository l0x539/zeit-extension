import * as React from 'react';
import ZeitIntegrationButton from '../../components/ZeitButton';

const App = () => {
  const title = React.useMemo(() => document.querySelector<HTMLInputElement>(
      'div[data-garden-id="forms.field"] input[data-garden-id="forms.input"]',
  ).value, []);
  const ticketId = React.useMemo(() =>
    document.location.href.match(/([^\/]*)\/*$/)[1],
  [document.location.href]);
  return (
    <ZeitIntegrationButton
      className="zeit-button"
      title={title}
      ticketId={ticketId}
    />
  );
};

export default App;
