import {createContext} from 'react';
import {Auth} from '../utils/types';

/*
 * Auth context, hold apiKey and authentication logic
 */
const AuthContext = createContext<{
    token: string;
    loggedIn: boolean;
    login:(res: Auth) => void;
    logout: () => void;
    userInfos: Auth
        }>({
          token: null,
          loggedIn: false,
          login: () => {},
          logout: () => {},
          userInfos: null,
        });

export default AuthContext;
