import * as React from "react"

import Header from "../components/Header"
import { TimeEntry } from "../utils/types"
import Entries from "../components/Entries"
import { useResource } from "@rest-hooks/core"
import { getTimeRecordsHook } from "../utils/api"
import AuthContext from "../contexts/AuthContexts"
import { BiLoader } from "react-icons/bi"
import moment = require("moment")


const Track = () => {
    const {logout, token} = React.useContext(AuthContext)
    const timeRecords = useResource(getTimeRecordsHook, {apiKey: token, params: `?from=${moment().subtract("day", 1).format("YYYY-MM-DD")}&to=${moment().add("day", 1).format("YYYY-MM-DD")}`}) // a day ago.
    setTimeout(
        () => {
            console.log(timeRecords);
        }
    , 4000)
    
    if (timeRecords.error) {
        logout()
    } 

    return (
        <>
            <Header />
            {
                timeRecords?.result?.time_records?
                <Entries entries={timeRecords.result.time_records} total={timeRecords.result.total_duration} />
                : <BiLoader />
            }
        </>
    )
}

export default Track