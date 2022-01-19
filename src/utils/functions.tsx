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

const TIMEZONES = {
  'Rome': 'Europe/Rome',
  'Hawaii': 'Pacific/Honolulu',
  'Alaska': 'America/Anchorage',
  'Pacific Time (US & Canada)': 'America/Los_Angeles',
  'Tijuana': 'America/Tijuana',
  'Arizona': 'America/Phoenix',
  'Chihuahua': 'America/Mazatlan',
  'Mazatlan': 'America/Mazatlan',
  'Mountain Time (US & Canada)': 'America/Denver',
  'Central America': 'America/Chicago',
  'Central Time (US & Canada)': 'America/Chicago',
  'Guadalajara': 'Pacific/Guadalcanal',
  'Mexico City': 'America/Mexico_City',
  'Monterrey': 'America/Monterrey',
  'Saskatchewan': 'America/Chicago',
  'Bogota': 'America/Bogota',
  'Eastern Time (US & Canada)': 'America/New_York',
  'Indiana (East)': 'America/indiana',
  'Lima': 'America/Lima',
  'Quito': 'America/Quito',
  'Atlantic Time (Canada)': 'America/Halifax',
  'Caracas': 'America/Caracas',
  'Georgetown': 'America/Georgetown',
  'La Paz': 'America/La_Paz',
  'Puerto Rico': 'America/Puerto_Rico',
  'Santiago': 'America/Santiago',
  'Newfoundland': 'America/St_Johns',
  'Brasilia': 'America/Brasil/Brasilia',
  'Buenos Aires': 'America/Argentina/Buenos_Aires',
  'Greenland': 'Atlantic/Greenland',
  'Montevideo': 'America/Montevideo',
  'Mid-Atlantic': 'America/Halifax',
  'Azores': 'Atlantic/Azores',
  'Cape Verde Is.': 'Atlantic/Cape_Verde',
  'Edinburgh': 'Europe/Edinburgh',
  'Lisbon': 'Europe/Lisbon',
  'London': 'Europe/London',
  'Monrovia': 'Africa/Monrovia',
  'UTC': 'UTC',
  'Amsterdam': 'Europe/Amsterdam',
  'Algiers': 'Africa/Algiers',
  'Belgrade': 'Europe/Belgrade',
  'Berlin': 'Europe/Berlin',
  'Bern': 'Europe/Bern',
  'Bratislava': 'Europe/Bratislava',
  'Brussels': 'Europe/Brussels',
  'Budapest': 'Europe/Budapest',
  'Casablanca': 'Africa/Casablanca',
  'Copenhagen': 'Europe/Copenhagen',
  'Dublin': 'Europe/Dublin',
  'Ljubljana': 'Europe/Ljubljana',
  'Madrid': 'Europe/Madrid',
  'Paris': 'Europe/Paris',
  'Prague': 'Europe/Prague',
  'Sarajevo': 'Europe/Sarajevo',
  'Skopje': 'Europe/Skopje',
  'Stockholm': 'Europe/Stockholm',
  'Vienna': 'Europe/Vienna',
  'Warsaw': 'Europe/Warsaw',
  'West Central Africa': 'GMT+1',
  'Zagreb': 'Europe/Zagreb',
  'Zurich': 'Europe/Zurich',
  'Athens': 'Europe/Athens',
  'Bucharest': 'Europe/Bucharest',
  'Cairo': 'Africa/Cairo',
  'Harare': 'Africa/Harare',
  'Helsinki': 'Europe/Helsinki',
  'Jerusalem': 'Asia/Jerusalem',
  'Kaliningrad': 'Europe/Kaliningrad',
  'Kyiv': 'Europe/Kyiv',
  'Pretoria': 'Africa/Pretoria',
  'Riga': 'Europe/Riga',
  'Sofia': 'Europe/Sofia',
  'Tallinn': 'Europe/Tallinn',
  'Vilnius': 'Europe/Vilnius',
  'Baghdad': 'Asia/Baghdad',
  'Istanbul': 'Europe/Istanbul',
  'Kuwait': 'Asia/Kuwait',
  'Minsk': 'Europe/Minsk',
  'Moscow': 'Europe/Moscow',
  'Nairobi': 'Africa/Nairobi',
  'Riyadh': 'Asia/Riyadh',
  'St. Petersburg': 'Europe/Saint_Petersburg',
  'Volgograd': 'Europe/Volgograd',
  'Tehran': 'Asia/Tehran',
  'Abu Dhabi': 'Asia/Abu_Dhabi',
  'Baku': 'Asia/Baku',
  'Muscat': 'Asia/Muscat',
  'Samara': 'Europe/Samara',
  'Tbilisi': 'Asia/Tbilisi',
  'Yerevan': 'Asia/Yerevan',
  'Kabul': 'Asia/Kabul',
  'Ekaterinburg': 'Asia/Yekaterinburg',
  'Islamabad': 'Asia/Islamabad',
  'Karachi': 'Asia/Karachi',
  'Tashkent': 'Asia/Tashkent',
  'Chennai': 'Asia/Chennai',
  'Kolkata': 'Asia/Kolkata',
  'Mumbai': 'Asia/Mumbai',
  'New Delhi': 'Asia/New_Delhi',
  'Sri Jayawardenepura': 'Asia/Sri_Jayawardenepura_Kotte',
  'Kathmandu': 'Asia/Kathmandu',
  'Almaty': 'Asia/Almaty',
  'Astana': 'Asia/Astana',
  'Dhaka': 'Asia/Dhaka',
  'Urumqi': 'Asia/Urumqi',
  'Rangoon': 'Asia/Yangon',
  'Bangkok': 'Asia/Bangkok',
  'Hanoi': 'Asia/Saigon',
  'Jakarta': 'Asia/Jakarta',
  'Krasnoyarsk': 'Asia/Krasnoyarsk',
  'Novosibirsk': 'Europe/Novosibirsk',
  'Beijing': 'Asia/Beijing',
  'Chongqing': 'Asia/Chongqing',
  'Hong Kong': 'Asia/Hong_Kong',
  'Irkutsk': 'Asia/Irkutsk',
  'Kuala Lumpur': 'Asia/Kuala_Lumpur',
  'Perth': 'Australia/Perth',
  'Singapore': 'Asia/Singapore',
  'Taipei': 'Asia/Taipei',
  'Ulaanbaatar': 'Asia/Ulaanbaatar',
  'Osaka': 'Asia/Osaka',
  'Sapporo': 'Asia/Sapporo',
  'Seoul': 'Asia/Seoul',
  'Tokyo': 'Asia/Tokyo',
  'Yakutsk': 'Asia/Yakutsk',
  'Adelaide': 'Australia/Adelaide',
  'Darwin': 'Australia/Darwin',
  'Brisbane': 'Australia/Brisbane',
  'Canberra': 'Australia/Canberra',
  'Guam': 'Pacific/Guam',
  'Hobart': 'Australia/Hobart',
  'Melbourne': 'Australia/Melbourne',
  'Port Moresby': 'Pacific/Port_Moresby',
  'Sydney': 'Australia/Sydney',
  'Vladivostok': 'Asia/Vladivostok',
  'Magadan': 'Asia/Magadan',
  'New Caledonia': 'Pacific/New_Caledonia',
  'Solomon Is.': 'Pacific/Solomon_Islands',
  'Srednekolymsk': 'Asia/Srednekolymsk',
  'Auckland': 'Pacific/Auckland',
  'Fiji': 'Pacific/Fiji',
  'Kamchatka': 'Asia/Kamchatka',
  'Marshall Is.': 'Pacific/Auckland',
  'Wellington': 'Pacific/Wellington',
  'Chatham Is.': 'Pacific/Chatham_Islands',
  'Tonga': 'Pacific/Tonga',
  'Samoa': 'Pacific/Samoa',
  'Tokelau Is.': 'Pacific/Tokelau_Islands',
};

export const toTimeZone = (time, timezone) => {
  const date = utcToZonedTime(new Date(time), TIMEZONES[timezone] ?? timezone);

  return format(date, 'HH:mm', {timeZone: TIMEZONES[timezone] ?? timezone});
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
      date = utcToZonedTime(new Date(lastTo), TIMEZONES[timezone] ?? timezone);
    } else {
      date = new Date(lastTo);
    }
  } else {
    if (timezone) {
      date = utcToZonedTime(subHours(new Date(), 2), TIMEZONES[timezone] ?? timezone);
    } else {
      date = subHours(new Date(), 2);
    }
  }
  if (timezone) {
    return format(date, 'HH:mm', {timeZone: TIMEZONES[timezone] ?? timezone});
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
