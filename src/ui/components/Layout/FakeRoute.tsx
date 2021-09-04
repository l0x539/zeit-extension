import * as React from "react"
import AuthContext from "../../contexts/AuthContexts"
import Login from "../../pages/Login"

const FakeRoute = ({children}) => {
    const {loggedIn} = React.useContext(AuthContext)
    console.log("loggedIn", loggedIn)
    if (loggedIn) {
        return (<>
                {children}
            </>)
    } else {
        return <Login />
    }
}

export default FakeRoute