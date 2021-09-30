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
