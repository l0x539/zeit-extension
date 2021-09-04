import * as React from "react"
import { BsList } from "react-icons/bs"
import { BiRefresh } from "react-icons/bi"
import { ImExit } from "react-icons/im"
import { GrPowerReset } from "react-icons/gr"
import { GrLogout } from "react-icons/gr"
import { BsBoxArrowUpRight } from "react-icons/bs"
import { FormControl, InputGroup, Button, Dropdown } from "react-bootstrap"
import { reload, useClock } from "../utils/chrome"
import AuthContext from "../contexts/AuthContexts"
import { toTimer } from "../utils/functions"
import ModalScreen from "./ModalScreen"
import { useFetcher } from "@rest-hooks/core"
import { StartTimerHook, StopTimerHook, ResetTimerHook } from "../utils/api"
import Editor from "./Editor"

const calculateTime = (time: number) => {
    return time + 1
}

const Header = () => {
    const {token, logout} = React.useContext(AuthContext)
    const [clock, setClock, isPersistent, error]  = useClock();
    const [menuOpen, setMenuOpen] = React.useState(false)
    const [editorOpen, setEditorOpen] = React.useState(false)
    const [timer, setTimer] = React.useState(0)
    const [isOn, setIsOn] = React.useState(false)
    const startTimer = useFetcher(StartTimerHook)
    const resetTimer = useFetcher(ResetTimerHook)
    

    React.useEffect(() => {
        if (isOn) {
            setTimeout(() => {
                setTimer(calculateTime(timer));
            }, 1000);
        } else {
            setTimer(0)
        }
      });

    const handleStartTimer = () => {
        const restult = startTimer({apiKey: token})
        setIsOn(true)
        setClock(restult)
    }

    const handleStopTimer = async () => {
        await setEditorOpen(true)
        setIsOn(false)
    }

    const handleResetTimer = () => {
        resetTimer({apiKey: token})
        setIsOn(flase)
    }

    return (
        <div className="shadow-sm main-header fixed-top">
            <div className="page-header d-flex align-items-center justify-content-between">
                <div onClick={() => {chrome.tabs.create({ url: "https://zeit.io/en/times" })}}>
                    <img style={{height: "35px", cursor: "pointer"}} className="logo_big" alt="zeit.io icon" src="https://d2ldomkd7flzzm.cloudfront.net/assets/logo-1b1939c78f5369f959943e65b78943cd505527bcfe9f1d44c4c33d5e0e47eeeb.png"/>
                    <span className="logo_zeitio"><a href="/en/" className="a_logo">ZEIT.IO</a></span>
                </div>
                <div className="header__icon-button d-flex align-items-center">
                    <BsBoxArrowUpRight size={25} onClick={() => {chrome.tabs.create({ url: "https://zeit.io/en/dashboard" })}} />
                    <BiRefresh size={35} onClick={() => reload()} />
                    <Dropdown
                    align={{ lg: 'start' }}
                    >
                        <Dropdown.Toggle size="35" as={BsList}/>

                        <Dropdown.Menu>
                        
                        <Dropdown.Item eventKey="1" className="d-flex justify-content-around" onClick={() => {setMenuOpen(true)}}><BsList size={20} /> Settings</Dropdown.Item>
                        <Dropdown.Item eventKey="1" className="d-flex justify-content-around"><GrPowerReset size={20} /> Reset</Dropdown.Item>
                        <Dropdown.Item eventKey="1" className="d-flex justify-content-around" onClick={logout}><ImExit size={20} /> Logout </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <div className="header-second-row p-3">
                <InputGroup>
                    <FormControl
                    placeholder="What are you working on?"
                    aria-label="What are you working on?"
                    />
                    {
                        timer && timer > 0 ?
                        <Button onClick={handleStopTimer} variant="danger" className="px-3">                            
                            {toTimer(timer)}
                        </Button>
                        :
                        <Button onClick={handleStartTimer} variant="danger" className="px-3">                            
                            Start
                        </Button>
                    }
                </InputGroup>
            </div>
            <ModalScreen modalOpen={menuOpen} setModalOpen={setMenuOpen} title={"Settings"} >
                <div>
                    <div className="row m-4 menu-item">
                        <div className="col-2 ml-3"><GrPowerReset size={20} onClick={handleResetTimer} /></div>
                        <div className="col"> Reset </div>
                    </div>
                    <div className="row mx-3 my-1 menu-item">
                        <div className="col-2 ml-3"><GrLogout size={20} onClick={logout} /></div>
                        <div className="col"> Logout</div>
                    </div>
                </div>
            </ModalScreen>
            <Editor editorOpen={editorOpen} setEditorOpen={setEditorOpen} fromTime={0} toTime={0} pauseTime={0} />
        </div>
    )
}

export default Header