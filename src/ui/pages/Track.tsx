import * as React from 'react';

import Header from '../components/Header';
import Entries from '../components/Entries';
import {useResource} from '@rest-hooks/core';
import {getTimeRecordsHook} from '../utils/api';
import AuthContext from '../contexts/AuthContexts';
import {BiLoader} from 'react-icons/bi';
import moment = require('moment')

import {Scrollbars} from 'react-custom-scrollbars';

/*
 * Hold time records entries (currently main app page)
 */
const Track = () => {
  const {logout, token} = React.useContext(AuthContext);
  document.body.style.minHeight = '600px';

  const timeRecords = useResource(getTimeRecordsHook,
      {
        apiKey: token,
        params: `?from=${moment().
            format('YYYY-MM-DD')}&to=${moment().add(1, 'day')
            .format('YYYY-MM-DD')}`,
      }); // Today working time.

  if (timeRecords.error) {
    logout();
  }

  return (
    <div className="my-auto">
      <Header />
      {
        timeRecords?.result?.time_records?
        <Scrollbars
          autoHide
          style={{height: '100vh'}}
        >
          <Entries
            entries={[...timeRecords.result.time_records].reverse()}
            total={timeRecords.result.total_duration} />
        </Scrollbars> :
        <BiLoader />
      }
    </div>
  );
};

export default Track;
