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

export const toTimer = (time) => {
  return `${leftJustify(Math.floor(time/3600)
      .toLocaleString(), 2, '0')}:${leftJustify((Math.floor(time/60)%60)
      .toLocaleString(), 2, '0')}:${leftJustify((time%60)
      .toLocaleString(), 2, '0')}`;
};

export const toZeitTimer = (time) => {
  return (
    <>
      <label id="hours" className="timer_hms">
        {leftJustify(Math.floor(time/3600).toLocaleString(), 2, '0')}
      </label>
      :
      <label id="hours" className="timer_hms">
        {leftJustify((Math.floor(time/60)%60).toLocaleString(), 2, '0')}
      </label>
      :
      <label id="hours" className="timer_hms">
        {leftJustify((time%60).toLocaleString(), 2, '0')}</label>
    </>
  );
};

export const toTime = (timer: string) => {
  const timerList = timer.split(':');
  return (+timerList[0]) * 60 * 60 + (+timerList[1]) * 60 + (+timerList[2]);
};
