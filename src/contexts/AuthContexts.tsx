import {createContext} from 'react';
import {Auth, UserInfos} from '../utils/types';

/*
 * Auth context, hold apiKey and authentication logic
 */
const AuthContext = createContext<{
    token: string;
    loggedIn: boolean;
    login:(res: Auth) => void;
    setUserInfo: (value: UserInfos) => void;
    logout: () => void;
    userInfos: UserInfos
        }>({
          token: null,
          loggedIn: false,
          login: () => {},
          logout: () => {},
          setUserInfo: () => {},
          userInfos: null,
        });

export default AuthContext;
