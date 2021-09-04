import {createContext} from 'react'

const AuthContext = createContext<{
    token: string;
    loggedIn: boolean;
    login: (apiKey: string) => void;
    logout: () => void;
      }>({
        token: null,
        loggedIn: false,
        login: () => {},
        logout: () => {},
      })

export default AuthContext
