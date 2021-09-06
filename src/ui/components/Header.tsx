import * as React from 'react';
import {BsList} from 'react-icons/bs';
import {BiRefresh} from 'react-icons/bi';
import {ImExit} from 'react-icons/im';
import {GrPowerReset} from 'react-icons/gr';
import {FiSettings} from 'react-icons/fi';
import {BsBoxArrowUpRight} from 'react-icons/bs';
import {FormControl, InputGroup, Dropdown} from 'react-bootstrap';
import {reload} from '../utils/chrome';
import AuthContext from '../contexts/AuthContexts';
import ModalScreen from './ModalScreen';
import {useFetcher, useResource} from '@rest-hooks/core';
import {
  StartTimerHook,
  ResetTimerHook,
  PauseTimerHook,
  ResumeTimerHook,
} from '../utils/api';
import Editor from './Editor';
import QuestionModal from './QuestionModal';
import {isErrorTimer, Timer} from '../utils/types';
import TimerButton from './TimerButton';

const calculateTime: (time: number) => number = (time: number) => {
  return time + 1;
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

/*
 * App Header that handles the timer.
 */
const Header: () => JSX.Element = () => {
  const {token, logout} = React.useContext(AuthContext);
  // const [clock, setClock, isPersistent, error]  = useClock();
  const timerStatus: Timer = useResource(PauseTimerHook, {apiKey: token});

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [questionOpen, setQuestionOpen] = React.useState(false);
  const [editorOpen, setEditorOpen] = React.useState(false);
  const [workingOn, setWorkingOn] = React.useState('');
  const [timer, setTimer] = React.useState(0);
  const [isOn, setIsOn] = React.useState(false);
  const startTimer = useFetcher(StartTimerHook);
  const resetTimer = useFetcher(ResetTimerHook);
  const resumeTimer = useFetcher(ResumeTimerHook);


  React.useEffect(() => {
    if (isOn) {
      setTimeout(() => {
        setTimer(calculateTime(timer));
      }, 1000);
    } else {
      setTimer(0);
    }
  });

  React.useEffect(() => {
    if (isErrorTimer(timerStatus)) {

    } else if (timerStatus.message === 'Timer was paused already' &&
                timerStatus.start !== '0') {
      setTimer(Math.floor(Date.now()/1000) -
                    Math.floor(new Date(timerStatus.start).getTime()/1000) -
                    timerStatus.pause_total);
      setQuestionOpen(true);
    } else if (timerStatus.message === 'Timer paused' && timerStatus.start) {
      setTimer(Math.floor(Date.now()/1000) -
                    Math.floor(new Date(timerStatus.start).getTime()/1000) -
                    timerStatus.pause_total);
      resumeTimer({apiKey: token});
      setIsOn(true);
    } else {
      resetTimer({apiKey: token});
    }
  }, []);

  const handleStartTimer = () => {
    startTimer({apiKey: token});
    setIsOn(true);
  };

  const handleStopTimer = async () => {
    await setEditorOpen(true);
  };

  const handleResetTimer = () => {
    resetTimer({apiKey: token});
    setWorkingOn('');
    setIsOn(false);
    setQuestionOpen(false);
  };

  const handleResumeTimer = async () => {
    const result = await resumeTimer({apiKey: token});
    setTimer(Math.floor(Date.now()/1000) -
                Math.floor(new Date(result.start).getTime()/1000) -
                result.pause_total);
    setIsOn(false);
  };

  return (
    <div className="shadow-sm main-header fixed-top">
      <QuestionModal
        title={'Active clock detected.'}
        questionOpen={questionOpen}
        setQuestionOpen={setQuestionOpen}
        question={'Would you like to resume your last record?'}
        handleAccept={handleResumeTimer}
        handleRefuse={handleResetTimer} />
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
          <BsBoxArrowUpRight size={25} onClick={() => {
            chrome.tabs.create({url: 'https://zeit.io/en/dashboard'});
          }} />
          <BiRefresh size={35} onClick={() => reload()} />
          <Dropdown
            align={{lg: 'start'}}
          >
            <Dropdown.Toggle style={{
              height: 35,
              width: 35,
            }} as={IconToggleList}></Dropdown.Toggle>
            <Dropdown.Menu>

              <Dropdown.Item
                eventKey="1"
                className="d-flex justify-content-start"
                onClick={() => {
                  setMenuOpen(true);
                }}>
                <FiSettings size={20} />
                <div className="px-2">Settings</div>
              </Dropdown.Item>
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
          <FormControl
            placeholder={isOn ? '...' : 'What are you working on?'}
            aria-label="What are you working on?"
            value={workingOn.length?workingOn:''}
            onChange={(e) => {
              setWorkingOn(e.target.value);
            }}
            disabled={isOn}
          />
          <TimerButton timer={timer}
            handleStartTimer={handleStartTimer}
            handleStopTimer={handleStopTimer}
          />
        </InputGroup>
      </div>
      <ModalScreen
        modalOpen={menuOpen}
        setModalOpen={setMenuOpen}
        title={'Settings'} >
        <div>
          <div className="row m-4 menu-item">
            <div className="col text-center"> Comming Soon! </div>
          </div>
        </div>
      </ModalScreen>
      <Editor
        editorOpen={editorOpen}
        setEditorOpen={setEditorOpen}
        fromTime={0}
        toTime={0}
        pauseTime={0}
        workingOn={workingOn}
        setWorkingOn={setWorkingOn}
        setIsOn={setIsOn} />
    </div>
  );
};

export default Header;
