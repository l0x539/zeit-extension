import * as React from 'react';

import Header from '../components/Header';
import Entries from '../components/Entries';
import {useResource} from '@rest-hooks/core';
import {getTimeRecordsHook, getUserInfos} from '../utils/api';
import AuthContext from '../contexts/AuthContexts';
import {BiLoader} from 'react-icons/bi';
import * as moment from 'moment';

import {Scrollbars} from 'react-custom-scrollbars';
import {isErrorUserInfos, UserInfosResponse} from '../utils/types';

/*
 * Hold time records entries (currently main app page)
 */
const Track = () => {
  const {logout, token, setUserInfo} = React.useContext(AuthContext);
  document.body.style.minHeight = '600px';

  const userInfos: UserInfosResponse = useResource(
      getUserInfos, {
        apiKey: token,
        state: 'infos',
      },
  );


  React.useEffect(() => {
    if (!isErrorUserInfos(userInfos)) {
      setUserInfo(userInfos.user);
    }
  }, []);

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
      <Header
        userInfos={userInfos}
      />
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
