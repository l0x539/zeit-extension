import { Endpoint } from "@rest-hooks/endpoint";
import { API_URL } from "./constants"

const request = (route, method, data={}, apiKey=undefined) => {
    return fetch(API_URL + route, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            apiKey
        },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

export const loginHook = new Endpoint(({email, password}: {
    email: string,
    password: string
}) => {
    return request("/api/v1/authenticate", "POST", {email, password})
})

export const getTimeRecorsHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
    return request("/api/v1/usr/time_records", "Get", {}, apiKey)
})

export const StartTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
    return request("/api/v1/usr/time_records/start", "POST", {}, apiKey)
})

export const PauseTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
    return request("/api/v1/usr/time_records/pause", "POST", {}, apiKey)
})

export const ResumeTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
    return request("/api/v1/usr/time_records/resume", "POST", {}, apiKey)
})

export const ResetTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
    return request("/api/v1/usr/time_records/reset", "POST", {}, apiKey)
})

export const StopTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
    return request("/api/v1/usr/time_records/stop", "POST", {}, apiKey)
})
