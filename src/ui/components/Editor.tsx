import * as React from 'react';
import {Alert, Button, Form, FormControl} from 'react-bootstrap';
import ModalScreen from './ModalScreen';
import {useFetcher, useResource} from '@rest-hooks/core';
import {StopTimerHook, getProjectsHook} from '../utils/api';
import AuthContext from '../contexts/AuthContexts';
import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from "react-datepicker";
// import {toTimer} from '../utils/functions';
import {isErrorProjects, ProjectResult} from '../utils/types';

/*
 * Edit time records posting information when the timer is stopped.
 */
const Editor = ({
  editorOpen,
  setEditorOpen,
  fromTime,
  toTime,
  pauseTime,
  workingOn: comment,
  setWorkingOn,
  stopTimerHandler,
  handleResetTimer,
}: {
        editorOpen: boolean,
        setEditorOpen: (value: boolean) => void,
        fromTime: number,
        toTime: number,
        pauseTime: number,
        workingOn: string,
        setWorkingOn: (value: string) => void,
        stopTimerHandler: () => void,
        handleResetTimer: () => void,
    }) => {
  const [error, setError] = React.useState('');
  const {token} = React.useContext(AuthContext);
  const stopTimer = useFetcher(StopTimerHook);
  const projects: ProjectResult = useResource(
      getProjectsHook,
      {apiKey: token, params: '',
      });
  // const [date, setDate] = React.useState('')
  // const [from, setFrom] = React.useState(fromTime)
  // const [pause, setPause] = React.useState(pauseTime)
  // const [to, setTo] = React.useState(toTime)
  const [projectId, setProjectId] = React.useState(
      !isErrorProjects(projects)?
      projects.result && projects.result.projects.length?
      projects.result.projects[0].id :'':'');

  React.useEffect(() => {
    if (!isErrorProjects(projects)) {
      if (projects?.result.projects.length < 1) {
        setError('Please create a project first');
        setWorkingOn('');
      }
    }
  }, [projects]);


  //   const handleDateChange = (value, format) => {
  //     setError('');
  //     // setDate(value)
  //     console.log('format', format);
  //   };

  const handleStopTimer = async () => {
    if (projectId.length > 0) {
      const result = await stopTimer({
        apiKey: token,
        projectId,
        comment});
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
          <div className="col-md-8">
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

        {/* <div className="mb-3">
            <div className="row">
                <div className="col-md-3">
                    <Form.Label className="form-label">Date</Form.Label>
                    <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    className="form-control"
                    customInput={
                        <FormControl
                        value={date}
                        />
                    }
                />
                </div>
                <div className="col-md-2">
                    <Form.Label className="form-label">From</Form.Label>
                    <FormControl
                    defaultValue={toTimer(from)}
                    onChange={(e) => {setFrom(e.target.value), setError('')}}
                    />
                </div>
                <div className="col-md-2">
                    <Form.Label className="form-label">To</Form.Label>
                    <FormControl
                    defaultValue={toTimer(to)}
                    onChange={(e) => {setTo(e.target.value), setError('')}}
                    />
                </div>
                <div className="col-md-2">
                    <Form.Label className="form-label">Pause</Form.Label>
                    <FormControl
                    defaultValue={toTimer(pause)}
                    onChange={(e) => {setPause(e.target.value), setError('')}}
                    />
                </div>
                <div className="col-md-3">
                    <Form.Label className="form-label">Duration</Form.Label>
                    <FormControl
                    value={toTimer(to-from)}
                    disabled
                    />
                </div>
            </div>
        </div> */}
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
