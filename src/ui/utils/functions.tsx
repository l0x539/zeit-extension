/*
 * Useful functions
 */

import * as React from 'react';

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

export const toShortDate = (date) => {
  const _date = new Date(date);
  return `${
    _date.getUTCDate()
  }/${_date.getUTCMonth()+1}/${_date.getUTCFullYear()}`;
};

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
      .toLocaleString(), 2, '0')}:${leftJustify((Math.floor(time/60)%60)
      .toLocaleString(), 2, '0')}`;
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
