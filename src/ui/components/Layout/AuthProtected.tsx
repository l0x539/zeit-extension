import * as React from "react"
import Login from "../../pages/Login"

const LOGGED_IN = false

const AuthProtected = ({children}) => {
    return (
        <>
            {LOGGED_IN ? 
                children
            :
                <Login />
            }
        </>
    )
}

export default AuthProtected