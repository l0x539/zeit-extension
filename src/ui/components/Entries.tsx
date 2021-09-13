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
        <div className="shadow-sm time-entries mx-4 my-2 px-3 py-2">
          {entries?.length ?
             Object.keys(projects).map((project: string, index: number) => {
               const timing = sumDuration(projects[project]);
               if (timing > 0) {
                 return (
                   <div onClick={() => {
                     handleVisitProject(project);
                   }}
                   key={index}
                   className="row py-4 time-entry">
                     <div className="col-9 time-entries-project">
                       {projects[project][0].project_name}:
                     </div>
                     <div className="col-3 d-flex justify-content-end">
                       {toTimer(timing)}
                     </div>
                   </div>
                 );
               } else {
                 return <></>;
               }
             }):
            <div className="m-auto">No time records today, Start now!</div>}
        </div>
      </div>
    </div>
  );
};

const HeaderEntry = ({total}: {total: number}) => {
  return (
    <div className="shadow-sm time-entries-head mx-4 px-3 py-2">
      <div>
        <div className="row">
          <div className="col-8">Today</div>
          <div className="col-4 d-flex justify-content-end">
            {'Total: '}
            {toTimer(total)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entries;
