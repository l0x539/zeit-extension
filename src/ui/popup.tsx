import * as React from "react"
import * as ReactDOM from "react-dom"

import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/popup.css"
import Track from "./pages/Track"
import { CacheProvider } from "@rest-hooks/core"
import AuthContext from "./contexts/AuthContexts"
import { reload, useStore } from "./utils/chrome"
import { loginHook } from "./utils/api"
import ErrorBoundary from './components/ErrorBoundaries'
import FakeRoute from "./components/Layout/FakeRoute"
import { BiLoader } from "react-icons/bi"
import Loading from "./components/Loading"

/* Start recording POST https://zeit.io/api/v1/usr/time_records/start
 * Headers: apikey: 34JrUdPjZFdb8SXdvHrX5CHbntm0pPPO76jPzBjx
 * Response: {"start":"2021-09-03T18:56:14+00:00","timezone":"UTC","message":"Timer started"} 
 */

/* Pause recording POST https://zeit.io/api/v1/usr/time_records/pause 
 * Headers: apikey: 34JrUdPjZFdb8SXdvHrX5CHbntm0pPPO76jPzBjx
 * Response: {"start":"2021-09-03T18:56:14+00:00","pause":"2021-09-03T18:56:23+00:00","pause_total":0,"pause_total_str":"00:00:00","timezone":"UTC","message":"Timer paused"}
 */

/* Resume recording POST https://zeit.io/api/v1/usr/time_records/resume {"start":"2021-09-03T18:56:14+00:00","timezone":"UTC","message":"Timer started"} 
 * Headers: apikey: 34JrUdPjZFdb8SXdvHrX5CHbntm0pPPO76jPzBjx
 * Response: {"start":"2021-09-03T18:56:14+00:00","start_offset":"2021-09-03T19:01:48+00:00","pause":"0","pause_total":334,"pause_total_str":"00:05:34","timezone":"UTC","message":"Timer was resumed"}
 */


const App = () => {
    
    return (
        <React.Suspense fallback={<Loading />}>
            <CacheProvider>
                <ErrorBoundary>
                    <AuthProvider >
                        <FakeRoute>
                            <Track />
                        </FakeRoute>
                    </AuthProvider>
                </ErrorBoundary>
            </CacheProvider>
        </React.Suspense>

    )
}

const AuthProvider = ({children}) => {
    const [apiKey, setApiKey, isPersistent, error] = useStore()
    const value = {
        token: isPersistent && apiKey ? apiKey : '',
        loggedIn: isPersistent && apiKey && (apiKey.length > 0),
        login: (apiKey: string) => {
            setApiKey(apiKey)
        },
        logout: () => {
            setApiKey(null)
            // reload()
        }
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

// --------------


ReactDOM.render(
    <App />,
    document.getElementById('root')
)
