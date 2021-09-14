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
import {useStore, useUserInfos} from './utils/chrome';
import ProtectedPage from './components/Layout/ProtectedPage';
import Loading from './components/Loading';
import {Auth, isErrorAuth} from './utils/types';

const App = () => {
  return (
    <CacheProvider>
      <AuthProvider >
        <React.Suspense fallback={<Loading />}>
          <ProtectedPage>
            <Track />
          </ProtectedPage>
        </React.Suspense>
      </AuthProvider>
    </CacheProvider>
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
  const [userInfos, setUserInfos]: [
      Auth,
      (value: Auth) => void,
      boolean,
      string
  ] = useUserInfos();
  const value = {
    token: isPersistent && apiKey ? apiKey : '',
    loggedIn: isPersistent && apiKey && (apiKey.length > 0),
    login: (res: Auth) => {
      if (!isErrorAuth(res)) {
        setApiKey(res.apiKey);
        setUserInfos(res);
      }
    },
    logout: () => {
      setApiKey(null);
      // reload()
    },
    userInfos,
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
