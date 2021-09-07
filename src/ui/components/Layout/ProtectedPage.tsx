import * as React from 'react';
import AuthContext from '../../contexts/AuthContexts';
import Login from '../../pages/Login';

/*
 * Allow only authenticated pages otherwise render login page.
 */
const ProtectedPage = ({children}: {children: React.ReactNode}) => {
  const {loggedIn} = React.useContext(AuthContext);

  if (loggedIn) {
    return (<>
      {children}
    </>);
  } else {
    return <Login />;
  }
};

export default ProtectedPage;
