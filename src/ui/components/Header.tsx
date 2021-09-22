import * as React from 'react';
import {BsList} from 'react-icons/bs';
import {BiRefresh} from 'react-icons/bi';
import {ImExit} from 'react-icons/im';
import {GrPowerReset} from 'react-icons/gr';
// import {FiSettings} from 'react-icons/fi';
import {InputGroup, Dropdown, Form} from 'react-bootstrap';
import {
  registerCommandAction,
  useComment,
  useSettings,
} from '../../utils/chrome';
import AuthContext from '../../contexts/AuthContexts';
import ModalScreen from './ModalScreen';
import {useFetcher, useResetter, useResource} from '@rest-hooks/core';
import {
  StartTimerHook,
  ResetTimerHook,
  PauseTimerHook,
  ResumeTimerHook,
} from '../../utils/api';
import Editor from './Editor';
import QuestionModal from './QuestionModal';
import {
  isErrorTimer,
  Settings,
  Timer,
  UserInfosResponse,
} from '../../utils/types';
import ZeitTimer, {TimerStatus} from './ZeitTimer';

const calculateTime: (
  start: string,
  pauseTotal: number
  ) => number = (
      start: string,
      pauseTotal: number,
  ) => {
    return Math.floor(Date.now()/1000) -
        Math.floor(new Date(start).getTime()/1000) -
        pauseTotal;
  };


const IconToggleList = React.forwardRef(({onClick}: {
  onClick: () => void
},
ref: React.RefObject<HTMLDivElement>) => (
  <div
    ref={ref}
    onClick={onClick}
  >
    <BsList size={35} />
  </div>
));

IconToggleList.displayName = 'IconToggleList';

interface IHeader {
  userInfos: UserInfosResponse
}

/*
 * App Header that handles the timer.
 */
const Header: React.FC<IHeader> = ({
  userInfos,
}) => {
  const {token, logout} = React.useContext(AuthContext);
  // const [clock, setClock, isPersistent, error]  = useClock();
  const timerStatus: Timer = useResource(
      ResumeTimerHook, {
        apiKey: token,
        state: 'resume',
      },
  );

  const [comment, setComment]: [
    string,
    (value: string) => void,
    boolean,
    string
] = useComment();
  const [settings, setSettings]: [
  Settings,
  (value: Settings) => void,
  boolean,
  string
] = useSettings();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [questionOpen, setQuestionOpen] = React.useState(false);
  const [
    canAskPauseQuestion,
    setCanAskPauseQuestion,
  ] = React.useState(false);

  const [editorOpen, setEditorOpen] = React.useState(false);
  const [workingOn, setWorkingOn] = React.useState('');
  const [timer, setTimer] = React.useState(0);
  const [isOn, setIsOn] = React.useState(false);
  const [status, setTimerStatus]: [
    TimerStatus,
    React.Dispatch<React.SetStateAction<TimerStatus>>
  ] = React.useState('RESETTED');
  const startTimer = useFetcher(StartTimerHook);
  const resetTimer = useFetcher(ResetTimerHook);
  const resumeTimer = useFetcher(ResumeTimerHook);
  const pauseTimer = useFetcher(PauseTimerHook);
  const resetCache = useResetter();

  const handleSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'start-stop':
        setSettings({...settings, startStop: e.target.checked});
        break;
      case 'start-browser':
        setSettings({...settings, startBrowser: e.target.checked});
        break;
      case 'stop-browser':
        setSettings({...settings, StopBrowser: e.target.checked});
        break;
      case 'alarm-reminder':
        setSettings({...settings, alarmReminder: e.target.checked});
        break;
      case 'notifications':
        setSettings({...settings, notifications: e.target.checked});
        break;
    }
  };

  const handleClearComment = () => {
    setWorkingOn('');
    setComment('');
  };

  React.useEffect(() => {
    if (isOn) {
      setTimeout(() => {
        setTimer(timer+1);
      }, 1000);
    }
  });


  registerCommandAction(() => {
    setTimerStatus(isOn?'PAUSED':'STARTED');
    setIsOn(!isOn);
  }, 'start-stop', 'settings');

  React.useEffect(() => {
    if (isOn && comment && comment.length) {
      setWorkingOn(comment);
    }
  }, [comment]);

  React.useEffect(() => {
    if (!isErrorTimer(timerStatus)) {
      switch (timerStatus.status) {
        case 201:
          pauseTimer({apiKey: token});
          setTimer(calculateTime(timerStatus.start, timerStatus.pause_total));
          setTimerStatus('PAUSED');

          setQuestionOpen(true);

          break;
        case 400:
          setTimer(calculateTime(timerStatus.start, timerStatus.pause_total));
          setTimerStatus('STARTED');
          setIsOn(true);
          break;
        default:
          resetTimer({apiKey: token});
          break;
      }
    } else if (timerStatus.status === 400 &&
                timerStatus.start !== '0') {
      setTimer(calculateTime(timerStatus.start, timerStatus['pause_total']));
      setTimerStatus('STARTED');
      setIsOn(true);
    }
  }, []);

  const handleStartTimer = () => {
    setTimerStatus('STARTED');
    setComment(workingOn);
    startTimer({apiKey: token});
    setIsOn(true);
  };

  const handleOpenEditor = async () => {
    await setEditorOpen(true);
  };

  const handlePauseTimer = () => {
    setTimerStatus('PAUSED');

    setIsOn(false);
    pauseTimer({apiKey: token});
  };

  const handleStopTimer = () => {
    setIsOn(false);
    setTimerStatus('RESETTED');
    setWorkingOn('');
    setEditorOpen(false);
    resetCache();
    setTimeout(() => {
      setTimer(0);
    }, 1000);
  };

  const handleResetTimer = () => {
    setTimerStatus('RESETTED');
    handleClearComment();
    setIsOn(false);
    setWorkingOn('');
    setQuestionOpen(false);
    setEditorOpen(false);
    resetCache();
    resetTimer({apiKey: token});
    setTimeout(() => {
      setTimer(0);
    }, 1000);
  };

  const handleResumeTimer = async () => {
    setSettings({
      ...settings,
      askPause: !canAskPauseQuestion,
    });
    setTimerStatus('STARTED');
    const res = await resumeTimer({apiKey: token});
    setTimer(calculateTime(res.start, res.pause_total));

    setQuestionOpen(false);
    setIsOn(true);
  };

  return (
    <div className="shadow-sm main-header fixed-top">
      {settings.askPause ?
      <QuestionModal
        title={'Active clock detected.'}
        questionOpen={questionOpen}
        setQuestionOpen={setQuestionOpen}
        question={<div>
          <div className="row">
            <Form.Check
              type={'checkbox'}
              id={`ask-again`}
              label={`Don't ask me again`}
              checked={canAskPauseQuestion}
              onChange={(e) => {
                setCanAskPauseQuestion(e.target.checked);
              }}
            />
          </div>
          <div className="row">
            Would you like to resume your last record?
          </div>
        </div>}
        handleAccept={handleResumeTimer}
        handleRefuse={() => {
          setSettings({
            ...settings,
            askPause: !canAskPauseQuestion,
          });
          setQuestionOpen(false)
          ;
        }} /> :
        null
      }
      <div className={`page-header d-flex align-items-center 
                       justify-content-between`}>
        <div onClick={() => {
          chrome.tabs.create({url: 'https://zeit.io/en/times'});
        }}>
          <img style={{height: '35px', cursor: 'pointer'}} className="logo_big" alt="zeit.io icon" src="https://d2ldomkd7flzzm.cloudfront.net/assets/logo-1b1939c78f5369f959943e65b78943cd505527bcfe9f1d44c4c33d5e0e47eeeb.png"/>
          <span className="logo_zeitio">
            <a href="/en/" className="a_logo">ZEIT.IO</a>
          </span>
        </div>
        <div className="header__icon-button d-flex align-items-center">
          <BiRefresh size={35} onClick={() => resetCache()} />
          <Dropdown
            align={{lg: 'start'}}
          >
            <Dropdown.Toggle
              style={{
                height: 35,
                width: 35,
              }}
              as={IconToggleList}
            />
            <Dropdown.Menu>

              {/* <Dropdown.Item
                eventKey="1"
                className="d-flex justify-content-start"
                onClick={() => {
                  setMenuOpen(true);
                }}>
                <FiSettings size={20} />
                <div className="px-2">Settings</div>
              </Dropdown.Item> */}
              <Dropdown.Item
                eventKey="1"
                className="d-flex justify-content-start"
                onClick={handleResetTimer}>
                <GrPowerReset size={20} />
                <div className="px-2">Reset Timer</div>
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="1"
                className="d-flex justify-content-start"
                onClick={logout}><ImExit size={20} />
                <div className="px-2">Logout</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="header-second-row p-3">
        <InputGroup>
          <ZeitTimer timer={timer}
            handleStartTimer={handleStartTimer}
            handleStopTimer={handleOpenEditor}
            handlePauseTimer={handlePauseTimer}
            handleResumeTimer={handleResumeTimer}
            status={status}
          />
        </InputGroup>
      </div>
      <ModalScreen
        modalOpen={menuOpen}
        setModalOpen={setMenuOpen}
        title={'Settings'} >
        <div>
          <div className="row m-4">
            <div className="col text-center">
              Your Settings will automatically save
            </div>
          </div>
        </div>
        <hr />
        <Form
          className="m-3 mt-5">
          <div className="mb-3 menu-item">
            <Form.Check
              type={'checkbox'}
              id={`start-stop`}
              label={`Start/pause timer shortcut (Ctrl+Shift+S)`}
              checked={typeof settings?.startStop === 'undefined' ?
                  false:settings?.startStop}
              onChange={handleSettings}
            />
          </div>
          <div className="mb-3 menu-item">
            <Form.Check
              type={'checkbox'}
              id={`start-browser`}
              label={`Start timer when the browser start`}
              checked={typeof settings?.startBrowser === 'undefined' ?
                  false:settings?.startBrowser}
              onChange={handleSettings}
            />
          </div>
          <div className="mb-3 menu-item">
            <Form.Check
              type={'checkbox'}
              id={`stop-browser`}
              label={`Pause timer when the browser close`}
              checked={typeof settings?.StopBrowser === 'undefined' ?
                  false:settings?.StopBrowser}
              onChange={handleSettings}
            />
          </div>
          <div className="mb-3 menu-item">
            {/* <Form.Check
              type={'checkbox'}
              id={`alarm-reminder`}
              label={`Set an alarm reminder`}
              checked={typeof settings?.startStop === 'undefined' ?
                  false:settings?.alarmReminder}
              onChange={handleSettings}
            /> */}
          </div>
          <div className="mb-3 menu-item">
            <Form.Check
              type={'checkbox'}
              id={`notifications`}
              label={`Enable notifications.`}
              checked={typeof settings?.notifications === 'undefined' ?
                  false:settings?.notifications}
              onChange={handleSettings}
            />
          </div>
        </Form>
      </ModalScreen>
      <Editor
        editorOpen={editorOpen}
        setEditorOpen={setEditorOpen}
        workingOn={workingOn}
        setWorkingOn={setWorkingOn}
        handleResetTimer={handleResetTimer}
        stopTimerHandler={handleStopTimer}
      />
    </div>
  );
};

export default Header;
