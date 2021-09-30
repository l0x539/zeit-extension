/*
 * App global types
 */


export type TimeEntry = {
    id: string,
    type: string,
    date: string,
    'start_plus_pause_time': null | number | string,
    'start_time': null | number | string,
    'stop_time': null | number | string,
    timezone: string,
    pause: number,
    'pause_str': string,
    duration: number,
    'duration_str': string,
    hours: number,
    minutes: number,
    comment: string,
    labels: string[] | number[],
    'contract_id': null | number | string,
    'hourly_wage_category': string,
    'hourly_wage': number,
    amount: number,
    currency: string,
    'project_id': string,
    'project_name': string,
    'project_identifier': string,
    'project_activity': null | number | string,
    'needs_approval': boolean,
    approved: boolean,
    invoiced: boolean
}

type Curreny = 'AFN' | 'EUR' | 'ALL' | 'DZD' | 'USD' | 'EUR' | 'AOA' | 'XCD' |
               'XCD' | 'ARS' | 'AMD' | 'AWG' | 'AUD' | 'EUR' | 'AZN' | 'BSD' |
               'BHD' | 'BDT' | 'BBD' | 'BYN' | 'EUR' | 'BZD' | 'XOF' | 'BMD' |
               'INR' | 'BTN' | 'BOB' | 'BOV' | 'BAM' | 'BWP' | 'NOK' | 'BRL' |
               'USD' | 'BND' | 'BGN' | 'XOF' | 'BIF' | 'CVE' | 'KHR' | 'XAF' |
               'CAD' | 'KYD' | 'XAF' | 'XAF' | 'CLP' | 'CLF' | 'CNY' | 'AUD' |
               'AUD' | 'COP' | 'COU' | 'KMF' | 'CDF' | 'XAF' | 'NZD' | 'CRC' |
               'XOF' | 'HRK' | 'CUP' | 'CUC' | 'ANG' | 'EUR' | 'CZK' | 'DKK' |
               'DJF' | 'XCD' | 'DOP' | 'USD' | 'EGP' | 'SVC' | 'USD' | 'XAF' |
               'ERN' | 'EUR' | 'SZL' | 'ETB' | 'EUR' | 'FKP' | 'DKK' | 'FJD' |
               'EUR' | 'EUR' | 'EUR' | 'XPF' | 'EUR' | 'XAF' | 'GMD' | 'GEL' |
               'EUR' | 'GHS' | 'GIP' | 'EUR' | 'DKK' | 'XCD' | 'EUR' | 'USD' |
               'GTQ' | 'GBP' | 'GNF' | 'XOF' | 'GYD' | 'HTG' | 'USD' | 'AUD' |
               'EUR' | 'HNL' | 'HKD' | 'HUF' | 'ISK' | 'INR' | 'IDR' | 'XDR' |
               'IRR' | 'IQD' | 'EUR' | 'GBP' | 'ILS' | 'EUR' | 'JMD' | 'JPY' |
               'GBP' | 'JOD' | 'KZT' | 'KES' | 'AUD' | 'KPW' | 'KRW' | 'KWD' |
               'KGS' | 'LAK' | 'EUR' | 'LBP' | 'LSL' | 'ZAR' | 'LRD' | 'LYD' |
               'CHF' | 'EUR' | 'EUR' | 'MOP' | 'MKD' | 'MGA' | 'MWK' | 'MYR' |
               'MVR' | 'XOF' | 'EUR' | 'USD' | 'EUR' | 'MRU' | 'MUR' | 'EUR' |
               'XUA' | 'MXN' | 'MXV' | 'USD' | 'MDL' | 'EUR' | 'MNT' | 'EUR' |
               'XCD' | 'MAD' | 'MZN' | 'MMK' | 'NAD' | 'ZAR' | 'AUD' | 'NPR' |
               'EUR' | 'XPF' | 'NZD' | 'NIO' | 'XOF' | 'NGN' | 'NZD' | 'AUD' |
               'USD' | 'NOK' | 'OMR' | 'PKR' | 'USD' | 'PAB' | 'USD' | 'PGK' |
               'PYG' | 'PEN' | 'PHP' | 'NZD' | 'PLN' | 'EUR' | 'USD' | 'QAR' |
               'EUR' | 'RON' | 'RUB' | 'RWF' | 'EUR' | 'XCD' | 'XCD' | 'EUR' |
               'EUR' | 'XCD' | 'WST' | 'EUR' | 'STN' | 'SAR' | 'XOF' | 'RSD' |
               'SCR' | 'SLL' | 'SGD' | 'ANG' | 'XSU' | 'EUR' | 'EUR' | 'SBD' |
               'SOS' | 'ZAR' | 'SSP' | 'EUR' | 'LKR' | 'SDG' | 'SRD' | 'NOK' |
               'SEK' | 'CHF' | 'CHE' | 'CHW' | 'SYP' | 'TWD' | 'TJS' | 'THB' |
               'USD' | 'XOF' | 'NZD' | 'TOP' | 'TTD' | 'TND' | 'TRY' | 'TMT' |
               'USD' | 'AUD' | 'UGX' | 'UAH' | 'AED' | 'GBP' | 'USD' | 'USD' |
               'USN' | 'UYU' | 'UYI' | 'UYW' | 'UZS' | 'VUV' | 'VES' | 'VND' |
               'USD' | 'USD' | 'XPF' | 'MAD' | 'YER' | 'ZMW' | 'ZWL' | 'XBA' |
               'XBB' | 'XBC' | 'XBD' | 'XTS' | 'XXX' | 'XAU' | 'XPD' | 'XPT' |
               'XAG' | 'AFA' | 'FIM' | 'ALK' | 'ADP' | 'ESP' | 'FRF' | 'AOK' |
               'AON' | 'AOR' | 'ARA' | 'ARP' | 'ARY' | 'RUR' | 'ATS' | 'AYM' |
               'AZM' | 'RUR' | 'BYB' | 'BYR' | 'RUR' | 'BEC' | 'BEF' | 'BEL' |
               'BOP' | 'BAD' | 'BRB' | 'BRC' | 'BRE' | 'BRN' | 'BRR' | 'BGJ' |
               'BGK' | 'BGL' | 'BUK' | 'HRD' | 'HRK' | 'CYP' | 'CSJ' | 'CSK' |
               'ECS' | 'ECV' | 'GQE' | 'EEK' | 'XEU' | 'FIM' | 'FRF' | 'FRF' |
               'FRF' | 'GEK' | 'RUR' | 'DDM' | 'DEM' | 'GHC' | 'GHP' | 'GRD' |
               'FRF' | 'GNE' | 'GNS' | 'GWE' | 'GWP' | 'ITL' | 'ISJ' | 'IEP' |
               'ILP' | 'ILR' | 'ITL' | 'RUR' | 'RUR' | 'LAJ' | 'LVL' | 'LVR' |
               'LSM' | 'ZAL' | 'LTL' | 'LTT' | 'LUC' | 'LUF' | 'LUL' | 'MGF' |
               'MWK' | 'MVQ' | 'MLF' | 'MTL' | 'MTP' | 'FRF' | 'MRO' | 'FRF' |
               'MXP' | 'FRF' | 'MZE' | 'MZM' | 'NLG' | 'ANG' | 'NIC' | 'PEH' |
               'PEI' | 'PEN' | 'PES' | 'PLZ' | 'PTE' | 'FRF' | 'ROK' | 'ROL' |
               'RON' | 'RUR' | 'FRF' | 'FRF' | 'FRF' | 'ITL' | 'STD' | 'CSD' |
               'EUR' | 'SKK' | 'SIT' | 'ZAL' | 'SDG' | 'RHD' | 'ESA' | 'ESB' |
               'ESP' | 'SDD' | 'SDP' | 'SRG' | 'SZL' | 'CHC' | 'RUR' | 'TJR' |
               'IDR' | 'TPE' | 'TRL' | 'TRY' | 'RUR' | 'TMM' | 'UGS' | 'UGW' |
               'UAK' | 'SUR' | 'USS' | 'UYN' | 'UYP' | 'RUR' | 'VEB' | 'VEF' |
               'VEF' | 'VEF' | 'VNC' | 'YUD' | 'YUM' | 'YUN' | 'ZRN' | 'ZRZ' |
               'ZMK' | 'ZWC' | 'ZWD' | 'ZWD' | 'ZWN' | 'ZWR' | 'XFO' | 'XRE' |
               'XFU'

type Activity = {
    id: string,
    name: string
}

type Label = {
    name: string
}

export type Project = {
    id: string,
    name: string,
    activities: Activity[],
    identifier: string,
    description: string,
    'project_no': string,
    'order_no': string,
    currency: Curreny,
    budget: number,
    'budget_float': number,
    'budget_left': number,
    'budget_left_float': number,
    'budget_used': number,
    'budget_used_float': number,
    'budget_used_percentage': number,
    'hour_budget': number,
    'hour_budget_wage': number,
    'hour_budget_wage_float': number,
    'hour_budget_left': number,
    'hour_budget_used': number,
    'hour_budget_used_percentage': number,
    'hourly_wage': number,
    'hourly_wage_float': number,
    'start_date': string,
    'end_date': string,
    closed: boolean,
    'labels_enabled': boolean,
    labels: Label[];
    'customer_id': null | string | number
}

type Result = {
    projects: Project[]
}

export const isErrorProjects = (
    projects: ProjectResult,
): projects is { error: string } => {
  return projects.hasOwnProperty('error');
};

export type ProjectResult = {
    result: Result
} | {
    error: string
}

const isHasErrorTimer = (
    timer: Timer,
): timer is {
    error: string,
    start?: string,
    'pause_total'?: number,
    status?: number,
} => {
  return timer.hasOwnProperty('error');
};

export const isErrorTimer = (
    timer: Timer,
): timer is {
    error: string,
    start?: string,
    'pause_total'?: number,
    status?: number
} => {
  if (isHasErrorTimer(timer)) {
    if (timer.error.length > 0) {
      return true;
    }
  }
  return false;
};

export type Timer = {
    message: string,
    start: string,
    'pause_total': number,
    status: number
} | {
    error: string,
    start?: string,
    'pause_total'?: number,
    status?: number
}

export const isErrorAuth = (
    result: Auth,
): result is { error: string } => {
  return result.hasOwnProperty('error');
};

export type Auth = {
    success: boolean,
    apiKey: string,
    firstname: string,
    lastname: string,
    timezone: string,
    language: string,
    'date_format': string,
    organisations: string[]
} | {
    error: string
}

// UserInfos guarde type


export const isErrorUserInfos = (
    result: UserInfosResponse,
): result is { error: string } => {
  return result.hasOwnProperty('error');
};

export type UserInfosResponse = {
    user: UserInfos
} | {
    error: string
}

export type UserInfos = {
    salutation: string,
    firstname: string,
    lastname: string,
    username: string | null,
    email: string,
    timezone: string,
    language: string,
    'date_format': string
}

export type Settings = {
    startStop: boolean,
    startBrowser: boolean,
    StopBrowser: boolean,
    alarmReminder: boolean,
    notifications: boolean
    askPause: boolean,
}

export type Status = 'STARTED' | 'STOPPED' | 'PAUSED' | 'ERROR'
