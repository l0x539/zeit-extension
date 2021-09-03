import * as React from "react"
import * as ReactDOM from "react-dom"

import 'bootstrap/dist/css/bootstrap.min.css'
import "../styles/popup.css"
import AuthProtected from "./components/Layout/AuthProtected"
import Track from "./pages/Track"
import { CacheProvider } from "@rest-hooks/core"


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
    console.log(chrome);
    
    return (
        <CacheProvider>
            <AuthProtected >
                <Track />
            </AuthProtected>
        </CacheProvider>
    )
}

// --------------

ReactDOM.render(
    <App />,
    document.getElementById('root')
)