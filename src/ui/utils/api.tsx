import {Endpoint} from '@rest-hooks/endpoint';
import {API_URL} from './constants';

const request = (route, method, data=null, apiKey=undefined, params='') => {
  return fetch(API_URL + route + params, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      apiKey,
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => res.json());
};

export const loginHook = new Endpoint(({email, password}: {
    email: string,
    password: string
}) => {
  return request('/api/v1/authenticate', 'POST', {email, password});
});

export const getTimeRecordsHook = new Endpoint(({apiKey, params}:{
    apiKey: string,
    params: string
}) => {
  return request('/api/v1/usr/time_records', 'GET', null, apiKey, params);
});

export const StartTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
  return request('/api/v1/usr/time_records/start', 'POST', {}, apiKey);
});

export const PauseTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
  return request('/api/v1/usr/time_records/pause', 'POST', {}, apiKey);
});

export const ResumeTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
  return request('/api/v1/usr/time_records/resume', 'POST', {}, apiKey);
});

export const ResetTimerHook = new Endpoint(({apiKey}:{
    apiKey: string
}) => {
  return request('/api/v1/usr/time_records/reset', 'POST', {}, apiKey);
});

export const StopTimerHook = new Endpoint(({apiKey, projectId, comment}:{
    apiKey: string,
    projectId: string,
    comment: string
}) => {
  return request('/api/v1/usr/time_records/stop', 'POST',
      {project_id: projectId, comment}, apiKey);
});


// Projects
export const getProjectsHook = new Endpoint(({apiKey, params}:{
    apiKey: string,
    params: string
}) => {
  return request('/api/v1/usr/projects', 'GET', null, apiKey, params);
});
