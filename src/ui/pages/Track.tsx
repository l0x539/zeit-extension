import * as React from "react"

import Header from "../components/Header"
import { TimeEntry } from "../utils/types"
import Entries from "../components/Entries"


const ENTRIES: TimeEntry[] = [
    {
        time: 163,
        desciption: "Test Work.",
        project: "Project name",
        rate: 15/3600
    },
    {
        time: 163,
        desciption: "Test Work2.",
        project: "Project name",
        rate: 15/3600
    },
    {
        time: 163,
        desciption: "Test Work3.",
        project: "Project name",
        rate: 15/3600
    },
    {
        time: 163,
        desciption: "Test Work4.",
        project: "Project name",
        rate: 15/3600
    },
    {
        time: 163,
        desciption: "Test Work5.",
        project: "Project name",
        rate: 15/3600
    },
    {
        time: 163,
        desciption: "Test Work6.",
        project: "Project name",
        rate: 15/3600
    },
    {
        time: 163,
        desciption: "Test Work6.",
        project: "Project name",
        rate: 15/3600
    },
    {
        time: 163,
        desciption: "Test Work6.",
        project: "Project name",
        rate: 15/3600
    },
    {
        time: 163,
        desciption: "Test Work6.",
        project: "Project name",
        rate: 15/3600
    },
    {
        time: 163,
        desciption: "Test Work6.",
        project: "Project name",
        rate: 15/3600
    },
    {
        time: 163,
        desciption: "Test Work6.",
        project: "Project name",
        rate: 15/3600
    },
    {
        time: 163,
        desciption: "Test Work6.",
        project: "Project name",
        rate: 15/3600
    },
    {
        time: 163,
        desciption: "Test Work6.",
        project: "Project name",
        rate: 15/3600
    },
    
]


const Track = () => {
    return (
        <>
            <Header />
            <Entries entries={ENTRIES} />
        </>
    )
}

export default Track