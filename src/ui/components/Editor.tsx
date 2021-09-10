import * as React from 'react';
import {Alert, Button, Form, FormControl} from 'react-bootstrap';
import ModalScreen from './ModalScreen';
import {useFetcher, useResource} from '@rest-hooks/core';
import {
  // StopTimerHook,
  getProjectsHook,
  request,
  StartStopTimerHook,
} from '../utils/api';
import AuthContext from '../contexts/AuthContexts';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import {
  fromTimeString,
  toShortDate,
  toTimer,
  toUTC,
} from '../utils/functions';
import {isErrorProjects, ProjectResult} from '../utils/types';

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
  const {token} = React.useContext(AuthContext);
  // const stopTimer = useFetcher(StopTimerHook);
  const startStopTimer = useFetcher(StartStopTimerHook);

  const [pause, setPause] = React.useState('');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [date, setDate] = React.useState(new Date());

  // pause resume to get infos.
  React.useEffect(() => {
    if (editorOpen) {
      request(
          '/api/v1/usr/time_records/pause',
          'POST',
          {},
          token).then((res) => {
        if (res.message === 'Timer paused') {
          request('/api/v1/usr/time_records/resume', 'POST', {}, token);
        }
        if (res.pause) {
          setDate(new Date(res.start));
          setPause(toTimer(res.pause_total));
          setFrom(toUTC(res.start));
          setTo(toUTC(Date()));
        }
      })
      ;
    }
  }, [editorOpen]);

  // if (pauseTimer?.message === 'Timer paused') {
  //   useResource(ResumeTimerHook, {apiKey: token});
  // }


  const projects: ProjectResult = useResource(
      getProjectsHook,
      {
        apiKey: token, params: '',
      });


  const [projectId, setProjectId] = React.useState(
      !isErrorProjects(projects)?
      projects.result && projects.result.projects?.length?
      projects.result.projects[0].id :'':'');

  React.useEffect(() => {
    if (!isErrorProjects(projects)) {
      if (projects?.result.projects?.length < 1) {
        setError('Please create a project first');
        setWorkingOn('');
      }
    }
  }, [projects]);


  const handleDateChange = (value, format) => {
    setError('');
    setDate(new Date(value));
  };

  const handleStopTimer = async () => {
    if (projectId.length > 0) {
      const result = await startStopTimer({
        apiKey: token,
        projectId,
        comment,
        date: toShortDate(date),
        startTime: from,
        stopTime: to,
        pause,
      });
      if (result.error && result.error.length > 0) {
        setError(result.error);
      } else {
        stopTimerHandler();
      }
    } else {
      setError('Please Select a project.');
    }
  };

  const handleSelectProject = (e) => {
    setProjectId(e.target.value);
  };

  return (
    <ModalScreen
      modalOpen={editorOpen}
      setModalOpen={setEditorOpen}
      title={'Edit'}
      footer={(
        <>
          <Button variant="secondary"
            onClick={handleResetTimer}>Discard Time</Button>
          <Button variant="primary" onClick={handleStopTimer}>Save</Button>
        </>
      )} >
      {error.length > 0 ?
        <Alert variant={'danger'} onClose={() => setError('')} dismissible>
          {error}
        </Alert> :
        null
      }
      <Form className="form-horizontal">
        <div className="row">
          <div className="col-8">
            <div className="mb-3">
              <Form.Label className="form-label">Project</Form.Label>
              <div>
                {!isErrorProjects(projects) ?
                  projects.result.projects.length ?
                  <Form.Select onChange={handleSelectProject}>
                    {
                      projects?.result?.projects &&
                      projects.result.projects.map((project, index) => (
                        <option key={index} value={project.id}>
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
                }}>create a project now!</a></div>:
                <div>No projects yet, <a style={{
                  color: 'blueviolet',
                  cursor: 'pointer',
                }} onClick={() => {
                  chrome.tabs.create({url: 'https://zeit.io/en/projects/new'});
                }}>create a project now!</a></div>}
              </div>
            </div>
          </div>
          {/* <div className="col-md-4" id="hourly_wage_section">
                <div className="mb-3">
                    <Form.Label className="form-label">Hourly wage</Form.Label>
                    <Form.Select disabled>
                        <option>${}</option>
                    </Form.Select>
                </div>

            </div> */}
        </div>

        <div className="mb-3">
          <div className="row">
            <div className="col-6">
              <Form.Label className="form-label">Date</Form.Label>
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                className="form-control"
                customInput={
                  <FormControl
                    value={date.toDateString()}
                  />
                }
              />
            </div>
            <div className="row">
              <div className="col-4">
                <Form.Label className="form-label">From</Form.Label>
                <FormControl
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value), setError('');
                  }}
                />
              </div>
              <div className="col-4">
                <Form.Label className="form-label">To</Form.Label>
                <FormControl
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value), setError('');
                  }}
                />
              </div>
              <div className="col-4">
                <Form.Label className="form-label">Pause</Form.Label>
                <FormControl
                  value={pause}
                  onChange={(e) => {
                    setPause(e.target.value), setError('');
                  }}
                />
              </div>
            </div>
            <div className="col-4">
              <Form.Label className="form-label">Duration</Form.Label>
              <FormControl
                value={toTimer(fromTimeString(to)-
                  fromTimeString(from)-
                  fromTimeString(pause))}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="mb-3">
          <Form.Label className="form-label">Comment</Form.Label>
          <FormControl
            as="textarea"
            rows={4}
            value={comment}
            onChange={(e) => {
              setWorkingOn(e.target.value), setError('');
            }}
          />

        </div>
      </Form>
    </ModalScreen>
  );
};

export default Editor;
