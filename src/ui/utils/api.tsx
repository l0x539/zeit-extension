/*
 * Api Endpoints to communicate with zeit.io on /api/v1
 */


import {Endpoint} from '@rest-hooks/endpoint';
import {API_URL} from './constants';

export const request = (
    route,
    method,
    data=null,
    apiKey=undefined,
    params='',
) => {
  return fetch(API_URL + route + params, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      apiKey,
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => ({status: res.status, data: res.json()}));
};

// Authentication
export const loginHook = new Endpoint(({email, password}: {
    email: string,
    password: string
}) => {
  return request('/api/v1/authenticate', 'POST', {email, password})
      .then((res) => res.data);
});

// Time Records
export const getTimeRecordsHook = new Endpoint(({apiKey, params}:{
    apiKey: string,
    params: string
}) => {
  return request('/api/v1/usr/time_records', 'GET', null, apiKey, params)
      .then((res) => res.data);
});

export const StartTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
  return request('/api/v1/usr/time_records/start', 'POST', {}, apiKey)
      .then((res) => res.data);
});

export const PauseTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
  return request('/api/v1/usr/time_records/pause', 'POST', {}, apiKey)
      .then((res) => res.data);
});

export const ResumeTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
  return request('/api/v1/usr/time_records/resume', 'POST', {}, apiKey)
      .then((res) => res.data
          .then((response) => ({status: res.status, ...response})));
});

export const ResetTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
  return request('/api/v1/usr/time_records/reset', 'POST', {}, apiKey)
      .then((res) => res.data);
});

export const StopTimerHook = new Endpoint(({apiKey, projectId, comment}:{
    apiKey: string,
    projectId: string,
    comment: string
}) => {
  return request('/api/v1/usr/time_records/stop', 'POST',
      {project_id: projectId, comment}, apiKey).then((res) => res.data);
});


export const StartStopTimerHook = new Endpoint(({
  apiKey,
  projectId,
  comment,
  date,
  startTime,
  stopTime,
  pause,
  dateFormat,
  activityName,
}:{
  apiKey: string,
  projectId: string,
  comment: string,
  date: string,
  startTime: string,
  stopTime: string,
  pause: string,
  dateFormat: string,
  activityName: string
}) => {
  return request('/api/v1/usr/time_records/start_stop', 'POST',
      {
        project_id: projectId,
        comment,
        activity: activityName,
        hourly_wage_category: 'default',
        date: date,
        date_format: dateFormat??'%d/%m/%Y',
        start_time: startTime,
        stop_time: stopTime,
        pause: pause,
      },
      apiKey,
  ).then((res) => res.data);
}); // TODO: Change handleStop to handleStartStop on Editor.tsx


// Projects
export const getProjectsHook = new Endpoint(({apiKey, params}:{
    apiKey: string,
    params: string
}) => {
  return request('/api/v1/usr/projects', 'GET', null, apiKey, params)
      .then((res) => res.data);
});

// Projects Collaborations
export const getProjectsCollaborationsHook = new Endpoint(({apiKey, params}:{
  apiKey: string,
  params: string
}) => {
  return request(
      '/api/v1/usr/projects/collaborations',
      'GET',
      null,
      apiKey,
      params,
  ).then((res) => res.data);
});

// Projects Bookable
export const getProjectsBookableHook = new Endpoint(({apiKey, params}:{
  apiKey: string,
  params: string
}) => {
  return request(
      '/api/v1/usr/projects_bookable',
      'GET',
      null,
      apiKey,
      params,
  ).then((res) => res.data);
});

// Projects Bookable
export const getUserInfos = new Endpoint(({apiKey}:{
  apiKey: string,
}) => {
  return request(
      '/api/v1/usr',
      'GET',
      null,
      apiKey,
  ).then((res) => res.data);
});
