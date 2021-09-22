import * as React from 'react';
import AuthContext from '../contexts/AuthContexts';
import {useStore, useUserInfos} from '../utils/chrome';
import {Auth, isErrorAuth, UserInfos} from '../utils/types';

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
      UserInfos,
      (value: UserInfos) => void,
      boolean,
      string
  ] = useUserInfos();
  const value = {
    token: isPersistent && apiKey ? apiKey : '',
    loggedIn: isPersistent && apiKey && (apiKey.length > 0),
    login: (res: Auth) => {
      if (!isErrorAuth(res)) {
        setApiKey(res.apiKey);
      }
    },
    setUserInfo: (userResponse: UserInfos) => {
      setUserInfos(userResponse);
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

export default AuthProvider;
