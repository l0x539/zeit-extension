import * as React from "react"
import * as ReactDOM from "react-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/popup.css"

class Hello extends React.Component {
    render() {
        return (
            <div className="popup-padded">
                <form className="form-horizontal" action="/en/signin" accept-charset="UTF-8" method="post">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="session_email">Email</label>
                        <input className="form-control" type="text" name="session[email]"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="session_password">Password</label>
                        <input className="form-control" type="password" name="session[password]" />
                        <span className="pwdreset"><a href="/en/iforgotmypassword">Password reset</a></span>
                    </div>
                    <div className="actions">
                        <input type="submit" name="commit" value="Sign in" className="btn btn-primary" data-disable-with="Sign in" />
                    </div>
                </form>
            </div>
        )
    }
}

// --------------

ReactDOM.render(
    <Hello />,
    document.getElementById('root')
)