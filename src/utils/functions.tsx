/* eslint-disable max-len */
/*
 * Useful functions
 */

import * as React from 'react';
import {CURRENCIES, WAGE_CATEGORIES} from './constants';
import {addHours, subHours, isWithinInterval, startOfDay, isBefore} from 'date-fns';
import {utcToZonedTime, format} from 'date-fns-tz';


const leftJustify = (str, length, char ) => {
  const fill = [];
  while ( fill.length + str.length < length ) {
    fill[fill.length] = char;
  }
  return fill.join('') + str;
};

// const rightJustify = (str, length, char ) => {
//   const fill = [];
//   while ( fill.length + str.length < length ) {
//     fill[fill.length] = char;
//   }
//   return str + str.join('');
// };

export const toUTC = (time) => {
  const date = new Date(time);
  return `${leftJustify(date.getUTCHours(),
      2,
      '0')}:${leftJustify(date.getUTCMinutes(),
      2,
      '0')}`;
};

export const toTimeZone = (time, timezone) => {
  console.log({timezone});

  const date = utcToZonedTime(time, timezone);
  return format(date, 'HH:mm', {timeZone: timezone});
};

export const toShortDate = (date: Date, format: string) => {
  const _date = new Date(date);
  return (format.replace('dd', `${_date.getUTCDate()}`)
      .replace('MM', `${_date.getUTCMonth()+1}`)
      .replace('yyyy', `${_date.getUTCFullYear()}`));
};

export const resolveDateFormat = (zeitFormat: string) => zeitFormat
    .replace('%d', 'dd')
    .replace('%m', 'MM').replace('%Y', 'yyyy');

export const toLocal = (time) => {
  const date = new Date(time);
  return `${leftJustify(
      date.getHours(),
      2,
      '0',
  )}:${leftJustify(
      date.getMinutes(),
      2,
      '0',
  )}`;
};

export const toTimer = (time) => {
  return `${leftJustify(Math.floor(time/3600)
      .toString(), 2, '0')}:${leftJustify((Math.floor(time/60)%60)
      .toString(), 2, '0')}`;
};

export const toTimerHM = (time: number) => {
  if (time >= 24) {
    return `${leftJustify(Math.floor(time/60)
        .toString(), 2, '0')}:${leftJustify((time%60)
        .toString(), 2, '0')}`;
  } else {
    return `${leftJustify(time
        .toString(), 2, '0')}:00`;
  }
};

export const fromTimeString = (time: string) => {
  const _time = time.split(':');
  return (parseInt(_time[0], 10)*3600)+
          parseInt(_time[1], 10)*60;
};

export const toZeitTimer = (time) => {
  return (
    <>
      <label className="timer_hms">
        {leftJustify(Math.floor(time/3600).toLocaleString(), 2, '0')}
      </label>
      :
      <label className="timer_hms">
        {leftJustify((Math.floor(time/60)%60).toLocaleString(), 2, '0')}
      </label>
      :
      <label className="timer_hms">
        {leftJustify((time%60).toLocaleString(), 2, '0')}</label>
    </>
  );
};

export const toTime = (timer: string) => {
  const timerList = timer.split(':');
  return (+timerList[0]) * 60 * 60 + (+timerList[1]) * 60 + (+timerList[2]);
};

export const toTimeHM = (timer: string) => {
  const timerList = timer.split(':');
  return (+timerList[0]) * 60 * 60 + (+timerList[1]) * 60;
};

export const isInt = (str) => {
  return !isNaN(str) && Number.isInteger(parseFloat(str));
};

export const intMinMax = (parsed: number, min: number, max: number) => {
  return Math.min(Math.max(parsed, min), max).toString();
};

export const setHMTimer = (hours: number, minutes: number) => {
  return `${leftJustify(intMinMax(hours, 0, 23), 2, '0')
  }:${leftJustify(intMinMax(minutes, 0, 59), 2, '0')}`;
};

export const getFromValue = (lastTo: string, timezone: string | null = null) => {
  let date;
  if (lastTo.length && isWithinInterval(new Date(), {
    start: startOfDay(new Date()),
    end: addHours(new Date(), 1),
  })) {
    if (timezone) {
      date = utcToZonedTime(lastTo, timezone);
    } else {
      date = new Date(lastTo);
    }
  } else {
    if (timezone) {
      date = utcToZonedTime(subHours(new Date(), 2), timezone);
    } else {
      date = subHours(new Date(), 2);
    }
  }
  if (timezone) {
    return format(date, 'HH:mm', {timeZone: timezone});
  } else {
    return format(date, 'HH:mm');
  }
};

export const getLastTimeRecords = (t) => {
  return t?.reduce((p, n) => isBefore(
      new Date(p.stop_time),
      new Date(n.stop_time),
  ) ? n : p, t[0]);
};

export const sortLatestTimeRecords = (t) => {
  return t?.sort((p, n) => new Date(p.stop_time).getTime() - new Date(n.stop_time).getTime());
};

export const resolveCurrency = (cur: string) => {
  if (Object.keys(CURRENCIES).includes(cur)) return CURRENCIES[cur];
  else return '$';
};

export const resolveWageCategory = (categ: string) => {
  if (Object.keys(WAGE_CATEGORIES).includes(categ)) return WAGE_CATEGORIES[categ];
  else return '$';
};

export const getImageUrl = (pathname: string) => {
  return chrome.runtime.getURL(pathname);
};

export const openTab = (url: string) => {
  return chrome.tabs.create({url});
};
