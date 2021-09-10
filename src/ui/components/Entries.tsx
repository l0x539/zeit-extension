import * as React from 'react';
import {toTimer} from '../utils/functions';
import {TimeEntry} from '../utils/types';

const sortByProject = (entries: TimeEntry[]) => {
  return entries.reduce((i, entry) => {
    i[entry.project_id] = i[entry.project_id]?
        [...i[entry.project_id], entry]: [entry];
    return i;
  }, {});
};

// const sumAmount = (entries: TimeEntry[]) => {
//   return entries.reduce((i, entry) => i + (entry.amount*0.01), 0);
// };

const sumDuration = (entries: TimeEntry[]) => {
  return entries.reduce((i, entry) => i + entry.duration, 0);
};

const Entries = ({entries, total}: {entries: TimeEntry[], total: number}) => {
  const handleVisitProject = (id: string) => {
    chrome.tabs.create({url: 'https://zeit.io/en/projects/' + id});
  };

  const projects = sortByProject(entries);
  return (
    <div className="pb-4">
      <div className="content">
        <HeaderEntry total={total} />
        <div className="shadow-sm time-entries mx-4 my-2 p-2">
          <div>
            {entries?.length ?
             Object.keys(projects).map((project: string, index: number) => (
               <div onClick={() => {
                 handleVisitProject(project);
               }} key={index} className="row time-entry mx-auto">
                 <div className="time-entries-info col m-auto">
                   <div className="time-entries-desc h6">
                     {projects[project][0].project_name}:
                   </div>
                   {/* <a className="time-entries-project">
                     Last worked on:
                     {projects[project][projects[project].length - 1].comment}

                   </a> */}
                 </div>
                 <div className={`time-entries-total-and-time  m-auto 
                               d-flex justify-content-around col-5`}>
                   {/* <div className="time-entries-total">
                      ${sumAmount(projects[project])}
                   </div> */}
                   <div className="ml-1 time-entries-total-time">
                     {toTimer(sumDuration(projects[project]))}
                   </div>
                   {/* <div className="time-entries-play">
                    <BsPlay size={20} />
                </div> */}
                 </div>
               </div>
             )):
            <div className="m-auto">No time records today, Start now!</div>}
          </div>
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
                           d-flex justify-content-center col`}>
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
