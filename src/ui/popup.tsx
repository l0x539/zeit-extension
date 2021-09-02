import * as React from "react"
import * as ReactDOM from "react-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/popup.css"
import { Alert, Button, Form, FormControl, InputGroup } from "react-bootstrap";

class App extends React.Component {
    render() {
        return (
            <div className="popup-padded container">
                <div className="row">
                    <div className="col-lg-6 d-flex signupbox_hint">
                        <div>
                        <h1>Sign in</h1>
                        <section className="short-explain">
                            Sign in to use all features of ZEIT.IO
                        </section>
                        </div>    
                    </div>
                    <div className="col-lg-6 shadow-sm signupbox">
                        <Alert variant={"danger"} dismissible>
                            Error goes here
                        </Alert>
                        <Form className="form-horizontal" action="/en/signin" method="post">
                            <Form.Label className="form-label" htmlFor="session_email">Email</Form.Label>
                            <div className="mb-3">
                                <FormControl
                                aria-label="Username"
                                id="session_email"
                                aria-describedby="basic-addon1"
                                type="email"
                                />
                            </div>
                            <Form.Label className="form-label" htmlFor="session_password">Password</Form.Label>
                            <div className="mb-3">
                                <FormControl
                                aria-label="Username"
                                id="session_password"
                                aria-describedby="basic-addon1"
                                type="password"
                                />
                                <span className="pwdreset"><a href="/en/iforgotmypassword">Password reset</a></span>
                            </div>
                            <div className="actions">
                                <Button name="commit" >Sign in</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

// --------------

ReactDOM.render(
    <App />,
    document.getElementById('root')
)