import * as React from 'react';

import Header from '../components/Header';
import Entries from '../components/Entries';
import {useResource} from '@rest-hooks/core';
import {getTimeRecordsHook} from '../utils/api';
import AuthContext from '../contexts/AuthContexts';
import {BiLoader} from 'react-icons/bi';
import moment = require('moment')

import {Scrollbars} from 'react-custom-scrollbars';

const Track = () => {
  const {logout, token} = React.useContext(AuthContext);
  const timeRecords = useResource(getTimeRecordsHook,
      {
        apiKey: token,
        params: `?from=${moment().subtract('day', 1).
            format('YYYY-MM-DD')}&to=${moment().add('day', 1)
            .format('YYYY-MM-DD')}`,
      }); // a day ago.

  if (timeRecords.error) {
    logout();
  }

  return (
    <>
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
    </>
  );
};

export default Track;
