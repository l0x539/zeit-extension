import * as React from 'react';
import ZeitIntegrationButton from '../../components/ZeitButton';

const App = () => {
  const title = React.useMemo(() => document.querySelector(
      'h1[data-test-id="issue.views.issue-base.foundation.summary.heading"]',
  ).textContent.replace('#', ''), []);
  const ticketId = React.useMemo(() =>
    new URLSearchParams(document.location.href).get('selectedIssue') ??
    document.location.href
        .substring(document.location.href.lastIndexOf('/') + 1),
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
