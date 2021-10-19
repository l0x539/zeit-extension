import * as React from 'react';
import {openTab, toTimer} from '../../utils/functions';
import {TimeEntry} from '../../utils/types';

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
    openTab('https://zeit.io/en/times');
  };

  const projects = sortByProject(entries);
  return (
    <div className="pb-4">
      <div className="content">
        <HeaderEntry total={total} />
        {entries?.length ?
          Object.keys(projects).map((project: string, index: number) => {
            const timing = sumDuration(projects[project]);
            if (timing > 0) {
              return (
                <div className="shadow-sm time-entries mx-4 my-3 px-3 py-2"
                  key={index}
                >
                  <div
                    className="row py-2 time-entry"
                    onClick={() => handleVisitProject(project)}
                  >
                    <div className="col-8">
                      {projects[project][0].project_name}:
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                      {toTimer(timing)}
                    </div>
                  </div>
                </div>
              );
            } else {
              return <></>;
            }
          }) :
          (
            <div className="shadow-sm time-entries mx-4 my-3 px-3 py-4">
              <div className="m-auto">No time records today, Start now!</div>
            </div>
          )
        }
      </div>
    </div>
  );
};

const HeaderEntry = ({total}: {total: number}) => {
  return (
    <div className="shadow-sm time-entries mx-4 my-3 px-3 py-2">
      <div className="row py-2">
        <div className="col-8 font-weight-bold">Today</div>
        <div className="col-4 d-flex justify-content-end font-weight-bold">
          {toTimer(total)}
        </div>
      </div>
    </div>
  );
};

export default Entries;
