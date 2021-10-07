import * as React from 'react';
import {
  Alert,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap';
import ModalScreen from './ModalScreen';
import {useFetcher, useResource} from '@rest-hooks/core';
import {
  getProjectsBookableHook,
  StartStopTimerHook,
  getTimeRecordsHook,
  getHourlyWageHook,
} from '../../utils/api';
import {request} from '../../utils/request';
import AuthContext from '../../contexts/AuthContexts';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import {
  fromTimeString,
  getLastTimeRecords,
  getFromValue,
  isInt,
  resolveDateFormat,
  setHMTimer,
  toShortDate,
  toTimeHM,
  toTimer,
  toTimerHM,
  toTimeZone,
  toUTC,
  resolveCurrency,
  resolveWageCategory,
} from '../../utils/functions';
import * as moment from 'moment';

import {
  isErrorProjects,
  Project,
  ProjectResult,
  Ticket,
} from '../../utils/types';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {useComment, useTicket} from '../../utils/chrome';

/*
 * Edit time records posting information when the timer is stopped.
 */
const Editor = ({
  editorOpen,
  setEditorOpen,
  workingOn: comment,
  setWorkingOn,
  stopTimerHandler,
  handleResetTimer,
}: {
  editorOpen: boolean,
  setEditorOpen: (value: boolean) => void,
  workingOn: string,
  setWorkingOn: (value: string) => void,
  stopTimerHandler: () => void,
  handleResetTimer: () => void,
}) => {
  const [error, setError] = React.useState('');
  const {token, userInfos} = React.useContext(AuthContext);
  // const stopTimer = useFetcher(StopTimerHook);
  const startStopTimer = useFetcher(StartStopTimerHook);

  const [storageComment, setStorageComment]: [
    string,
    (value: string) => void,
    boolean,
    string
  ] = useComment();

  const [ticket]: [
    Ticket,
    (value: Ticket) => void,
    boolean,
    string
  ] = useTicket();

  const timeRecords = useResource(getTimeRecordsHook,
      {
        apiKey: token,
        params: `?from=${moment()
            .format('YYYY-MM-DD')}&to=${moment()
            .add(1, 'day')
            .format('YYYY-MM-DD')}`,
      }); // Today working time.

  const [hourlyWageCategory, setHourlyWageCategory] = React.useState('default');

  const [pause, setPause] = React.useState('00:00');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState(userInfos.timezone ?
    toTimeZone(Date(), userInfos.timezone): toUTC(Date()));
  const [date, setDate] = React.useState(new Date());
  const dateFormat = React.useMemo(() => userInfos['date_format'] ?
    resolveDateFormat(userInfos['date_format']): 'dd/MM/yyyy',
  [userInfos.date_format]);
  const [selectedLabels, setSelectedLabels]: [
    string[],
    (label: string[]) => void
  ] = React.useState([]);


  // pause resume to get infos.
  React.useEffect(() => {
    if (editorOpen) {
      request(
          '/api/v1/usr/time_records/pause',
          'POST',
          {},
          token).then((response) => {
        if (response.status === 201) { // Timer paused
          request('/api/v1/usr/time_records/resume', 'POST', {}, token);
        }
        response.data.then((res) => {
          if (res.pause) {
            setDate(new Date(res.start));
            setPause(toTimer(res.pause_total));
            setFrom(userInfos.timezone?
            toTimeZone(res.start, userInfos.timezone): toUTC(res.start));
          } else {
            const lastRecord = getLastTimeRecords(
                timeRecords.result?.time_records,
            );

            setFrom(getFromValue(
                lastRecord?.stop_time ?? '', userInfos.timezone));
          }
        });
      })
      ;
    }
  }, [editorOpen]);

  // if (pauseTimer?.message === 'Timer paused') {
  //   useResource(ResumeTimerHook, {apiKey: token});
  // }

  const allProjects: ProjectResult = useResource(
      getProjectsBookableHook,
      {
        apiKey: token, params: '',
      });

  const [projectId, setProjectId] = React.useState(
    !isErrorProjects(allProjects) &&
     allProjects.result.projects.length > 0?
     allProjects.result.projects[0].id: '');

  const [curProject, setCurProject] = React.useState(
      !isErrorProjects(allProjects) &&
       allProjects.result.projects.length > 0?
       allProjects.result.projects[0]: null);

  const [activityName, setActivityName] = React.useState(
    !isErrorProjects(allProjects) &&
     allProjects.result.projects.length > 0 &&
     allProjects.result.projects[0].activities?.length > 0?
     allProjects.result.projects[0].activities[0].name :
    null);

  React.useEffect(() => {
    if (!isErrorProjects(allProjects) &&
     allProjects.result.projects.length < 1) {
      setError('Please create a project first');
      setWorkingOn('');
    }
  }, [allProjects]);

  const handleDateChange = (value, format) => {
    setError('');
    setDate(new Date(value));
  };

  const cachedComment = React.useMemo(
      () => storageComment?.length? storageComment : comment
      , [storageComment, comment],
  );

  const handleStopTimer = async () => {
    if (projectId.length > 0) {
      const result = await startStopTimer({
        apiKey: token,
        projectId,
        comment: cachedComment,
        date: toShortDate(date, dateFormat),
        startTime: from,
        stopTime: to,
        pause,
        dateFormat: userInfos['date_format']??undefined,
        activityName,
        hourlyWageCategory,
        labels: selectedLabels.length? selectedLabels.join() : null,
        ticketBase: ticket.ticketBase,
        ticketType: ticket.ticketType,
      });
      if (result.error && result.error.length > 0) {
        setError(result.error);
      } else {
        setStorageComment('');
        stopTimerHandler();
      }
    } else {
      setError('Please Select a project.');
    }
  };

  const handleSelectProject = (e) => {
    const selection = e.target.value.split('-');
    const suffix = selection[0];
    setProjectId(selection[1]);
    if (!isErrorProjects(allProjects)) {
      setCurProject(allProjects.result.projects.
          reduce((prev, project) => {
            if (project.id === selection[1]) {
              return project;
            } else return prev;
          }, null));
    }
    switch (suffix) {
      case 'project':
        setProjectId(selection[1]);
        break;
      case 'activity':
        setActivityName(selection[2]);
        break;
    }
  };

  // React.FocusEvent<HTMLInputElement>
  const handleOnBlurHoursMinutes = (
      time: string,
      setValue: (time: string) => void,
  ) => {
    if (time.includes(':')) {
      const timeHM = time.split(':');
      const hours = timeHM[0];
      const minutes = timeHM[1];
      if (isInt(hours) && isInt(minutes)) {
        setValue(setHMTimer(parseInt(hours), parseInt(minutes)));
      } else {
        setValue('00:00');
      }
    } else if (isInt(time)) {
      setValue(toTimerHM(parseInt(time)));
    } else {
      setValue('00:00');
    }
  };

  const duration = fromTimeString(to)-
  fromTimeString(from)-
  fromTimeString(pause);

  return (
    <ModalScreen
      modalOpen={editorOpen}
      setModalOpen={setEditorOpen}
      title={'Time Recording'}
    >
      {error.length > 0 ?
        <Alert variant={'danger'} onClose={() => setError('')} dismissible>
          {error}
        </Alert> :
        null
      }
      {/* <p>
        Your configured timezone is
        <span style={{fontWeight: 'bold'}}>{'\'Paris\''}</span>
        . You can change it <a href="#" onClick={() => {
          chrome.tabs.create({url: 'https://zeit.io/en/settings/localization'});
        }}>here</a>.
      </p> */}
      <Form className="form-horizontal">
        <div className="editor">
          <div className="row mb-2">
            <div className="col-md-8">
              <Form.Label className="form-label">Project</Form.Label>
              <div>
                {
                 !isErrorProjects(allProjects) &&
                  allProjects.result.projects?.length ?
                  <Form.Select onChange={handleSelectProject}>
                    {
                      allProjects.result.projects.map((project, index) => (
                        project.activities.length?
                        <optgroup key={index} label={project.name}>
                          {project.activities.map((activity, i) => (
                            <option
                              key={i}
                              value={`activity-${project.id}-${activity.name}`}
                            >
                              {project.name}/{activity.name}
                            </option>))}
                        </optgroup> :
                        <option key={index} value={`project-${project.id}`}>
                          {project.name}
                        </option>
                      ))
                    }

                  </Form.Select> :
                <div>No projects yet, <a style={{
                  color: 'blueviolet',
                  cursor: 'pointer',
                }} onClick={() => {
                  chrome.tabs.create({url: 'https://zeit.io/en/projects/new'});
                }}>create a project now!</a></div>}
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <HourlyWage
              projectId={projectId}
              setHourlyWageCategory={setHourlyWageCategory}
            />
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <Form.Label className="form-label">Date</Form.Label>
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                className="form-control"
                dateFormat={userInfos['date_format'] ?
                  resolveDateFormat(userInfos['date_format']): undefined}
                customInput={ <FormControl value={date.toDateString()} /> }
              />
            </div>
            <div className="col-3">
              <Form.Label className="form-label">From</Form.Label>
              <FormControl
                isInvalid={toTimeHM(to)-toTimeHM(from) < 0}
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value), setError('');
                }}
                onBlur={(e) => {
                  handleOnBlurHoursMinutes(e.target.value, setFrom),
                  setError('');
                }}
              />
            </div>
            <div className="col-3">
              <Form.Label className="form-label">To</Form.Label>
              <FormControl
                isInvalid={toTimeHM(to)-toTimeHM(from) < 0}
                value={to}
                onChange={(e) => {
                  setTo(e.target.value), setError('');
                }}
                onBlur={(e) => {
                  handleOnBlurHoursMinutes(e.target.value, setTo),
                  setError('');
                }}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <FormControl
                value={pause}
                onChange={(e) => {
                  setPause(e.target.value), setError('');
                }}
                onBlur={(e) => {
                  handleOnBlurHoursMinutes(e.target.value, setPause),
                  setError('');
                }}
              />
              <FormLabel label="Pause" />
            </div>
            <div className="col-6">
              <FormControl
                value={toTimer(duration > 0 ? duration: 0)}
                disabled />
              <FormLabel label="Duration" />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="mb-2">
                <Form.Label className="form-label">Comment</Form.Label>
                <FormControl
                  as="textarea"
                  rows={3}
                  value={cachedComment}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (storageComment?.length) {
                      setStorageComment(value);
                    } else {
                      setWorkingOn(value);
                    }
                    setError('');
                  }}
                />
              </div>
            </div>
          </div>
          <LabelsInput
            project={curProject}
            selectedLabels={selectedLabels}
            setSelectedLabels={setSelectedLabels}
          />
        </div>
        <div className="d-flex justify-content-end">
          <Button variant="secondary"
            onClick={() => {
              setStorageComment('');
              handleResetTimer();
            }}
            className="mx-1"
          >Discard Time</Button>
          <Button
            variant="primary"
            onClick={handleStopTimer}
            className="blue"
          >Save</Button>
        </div>
      </Form>
    </ModalScreen>
  );
};

const FormLabel = ({label}: {label: string}) => {
  return (
    <Form.Label as="small" className="align-top form-text mt-1 text-muted">
      {label}
    </Form.Label>
  );
};

const HourlyWage = (
    {projectId, setHourlyWageCategory} : {
    projectId:
    string,
    setHourlyWageCategory: (categ: string) => void
  }) => {
  const {token} = React.useContext(AuthContext);
  const hourlyWage = useResource(getHourlyWageHook, {apiKey: token, projectId});

  React.useEffect(() => {
    if (hourlyWage?.result?.hourly_wages?.length) {
      setHourlyWageCategory(hourlyWage?.result?.hourly_wages[0]);
    }
  }, [hourlyWage?.result?.hourly_wages]);

  const handleChangeSelect = (e) => {
    setHourlyWageCategory(e.target.value);
  };

  return (
    hourlyWage?.result?.hourly_wages?.length?
    <div className="col-md-8">
      <Form.Label className="form-label">Hourly wage</Form.Label>
      <Form.Select
        onChange={handleChangeSelect}
        disabled={hourlyWage?.result?.hourly_wages?.length <= 1}
      >
        {hourlyWage?.result?.hourly_wages.map((wage, i) => {
          return (
            <option value={wage.category} key={i}>
              {`${resolveWageCategory(wage.category,
              )} ${wage.value} ${resolveCurrency(hourlyWage?.result?.currency,
              )}`}
            </option>
          );
        })}
      </Form.Select>
    </div> : null
  );
};

const LabelsInput = ({
  project,
  selectedLabels,
  setSelectedLabels,
}: {
  project: Project,
  selectedLabels: string[],
  setSelectedLabels: (label) => void,
}) => {
  return (
    project.labels_enabled? (
      <div className="col-md-8 mb-4">
        <Form.Label className="form-label">Labels</Form.Label>
        <Typeahead
          id="labels"
          onChange={setSelectedLabels}
          options={project.labels.map((label) => label.name)}
          placeholder="Choose labels..."
          selected={selectedLabels}
          multiple
        />
      </div>
    ): null
  );
};

export default Editor;
