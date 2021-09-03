import * as React from "react"
import { toTimer } from "../utils/functions";
import { TimeEntry } from "../utils/types";

import { BsPlay } from "react-icons/bs"

const Entries = ({entries}: {entries: TimeEntry[]}) => {
    return (
        <div className="content">
            <HeaderEntry total={entries.reduce((p, v) => v.time+p, 0)} />
            <div className="shadow-sm time-entries mx-4 my-2 p-2">
                <div>
                    {entries.map((entry: TimeEntry, index: number) => (
                        <div className="row time-entry">
                            <div className="time-entries-info col m-auto">
                                <div className="time-entries-desc">
                                    {entry.desciption}
                                </div>
                                <a className="time-entries-project">
                                    {entry.project}
                                </a>
                            </div>
                            <div className="time-entries-total-and-time  m-auto d-flex justify-content-around col-5">
                                <div className="time-entries-total">
                                    ${entry.rate*entry.time*0.01}
                                </div>
                                <div className="ml-1 time-entries-total-time">
                                    {toTimer(entry.time)}
                                </div>
                                <div className="time-entries-play">
                                    <BsPlay size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const HeaderEntry = ({total}: {total: number}) => {
    return (
        <div className="shadow-sm time-entries-head mx-4 p-2">
            <div>
                <div className="row">
                    <div className="time-entries-day col">Today</div>
                    <div className="time-entries-total-and-time d-flex justify-content-end col">
                        <div className="time-entries-total">
                            Total:
                        </div>
                        <div className="ml-1 time-entries-total-time">
                            {toTimer(total)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Entries