/*
 * Main app function (similar to index.tsx)
 */


import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/popup.css';
import Track from './pages/Track';
import {CacheProvider} from '@rest-hooks/core';
import AuthContext from './contexts/AuthContexts';
import {useStore} from './utils/chrome';
import ErrorBoundary from './components/ErrorBoundaries';
import ProtectedPage from './components/Layout/ProtectedPage';
import Loading from './components/Loading';

const App = () => {
  return (
    <ErrorBoundary>
      <React.Suspense fallback={<Loading />}>
        <CacheProvider>
          <AuthProvider >
            <ProtectedPage>
              <Track />
            </ProtectedPage>
          </AuthProvider>
        </CacheProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
};

const AuthProvider = ({children}: {
    children: React.ReactNode
}) => {
  const [apiKey, setApiKey, isPersistent]: [
        string,
        (value: string) => void,
        boolean,
        string
    ] = useStore();
  const value = {
    token: isPersistent && apiKey ? apiKey : '',
    loggedIn: isPersistent && apiKey && (apiKey.length > 0),
    login: (apiKey: string) => {
      setApiKey(apiKey);
    },
    logout: () => {
      setApiKey(null);
      // reload()
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// --------------

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
