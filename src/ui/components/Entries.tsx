import * as React from 'react';
import {toTimer} from '../utils/functions';
import {TimeEntry} from '../utils/types';


const Entries = ({entries, total}: {entries: TimeEntry[], total: number}) => {
  const handleVisitProject = (id: string) => {
    chrome.tabs.create({url: 'https://zeit.io/en/projects/' + id});
  };
  return (
    <div className="content">
      <HeaderEntry total={total} />
      <div className="shadow-sm time-entries mx-4 my-2 p-2">
        <div>
          {entries.map((entry: TimeEntry, index: number) => (
            <div onClick={() => {
              handleVisitProject(entry.project_id);
            }} key={index} className="row time-entry">
              <div className="time-entries-info col m-auto">
                <div className="time-entries-desc">
                  {entry.comment}
                </div>
                <a className="time-entries-project">
                  {entry.project_name}
                </a>
              </div>
              <div className={`time-entries-total-and-time  m-auto 
                               d-flex justify-content-around col-5`}>
                <div className="time-entries-total">
                                    ${entry.amount*0.01 /* in cents */}
                </div>
                <div className="ml-1 time-entries-total-time">
                  {toTimer(entry.duration)}
                </div>
                {/* <div className="time-entries-play">
                    <BsPlay size={20} />
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HeaderEntry = ({total}: {total: number}) => {
  return (
    <div className="shadow-sm time-entries-head mx-4 p-2">
      <div>
        <div className="row">
          <div className="time-entries-day col">Last 24 Hours</div>
          <div className={`time-entries-total-and-time 
                           d-flex justify-content-end col`}>
            <div className="time-entries-total">
              {'Total:'}
            </div>
            <div className="ml-1 time-entries-total-time">
              {toTimer(total)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entries;
