import {useFetcher} from '@rest-hooks/core';
import {useLoading} from '@rest-hooks/hooks';
import * as React from 'react';
import {Alert, Button, Form, FormControl} from 'react-bootstrap';
import AuthContext from '../contexts/AuthContexts';
import {loginHook} from '../utils/api';
import {Auth, isErrorAuth} from '../utils/types';

/*
 * Login Page
 */
const Login = () => {
  document.body.style.minHeight = '400px';
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const {login: loginUser} = React.useContext(AuthContext);

  const [login] = useLoading(useFetcher(loginHook));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      const res: Auth = await login({
        email,
        password,
      });
      if (isErrorAuth(res)) {
        setError(res.error);
      } else if (res.success) {
        loginUser(res);
      }
    } else {
      setError('Missing fields!');
    }
  };

  return (
    <div className="popup-padded container">
      <div className="row">
        <div className="col-lg-6 d-flex signupbox_hint">
          <div>
            <h1>Sign in</h1>
            <section className="short-explain">
                        Sign in to use ZEIT.IO.
            </section>
          </div>
        </div>
        <div className="col-lg-6 shadow-sm signupbox">
          {error.length > 0 ?
            <Alert variant={'danger'} onClose={() => setError('')} dismissible>
              {error}
            </Alert> :
            null
          }
          <Form
            className="form-horizontal"
            onSubmit={handleSubmit}>
            <Form.Label className="form-label" htmlFor="session_email">
                Email
            </Form.Label>
            <div className="mb-3">
              <FormControl
                aria-label="Email"
                id="session_email"
                aria-describedby="basic-addon1"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value), setError('');
                }}
              />
            </div>
            <Form.Label className="form-label" htmlFor="session_password">
                Password
            </Form.Label>
            <div className="mb-3">
              <FormControl
                aria-label="Password"
                id="session_password"
                aria-describedby="basic-addon1"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value), setError('');
                }}
              />
              <div>
                <span className="pwdreset"><a href="#" onClick={() => {
                  chrome.tabs.create({url: 'https://zeit.io/en/iforgotmypassword'});
                }}>I forgot my password</a></span>
              </div>
              <div>
                <span className="pwdreset"><a href="#" onClick={() => {
                  chrome.tabs.create({url: 'https://zeit.io/en/signups/new'});
                }}>Create a new account</a></span>
              </div>
            </div>
            <div className="actions">
              <Button type="submit" name="commit" >Sign in</Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
