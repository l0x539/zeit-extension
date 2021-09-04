import * as React from "react"
import { BsList } from "react-icons/bs"
import { BiRefresh } from "react-icons/bi"
import { BsBoxArrowUpRight } from "react-icons/bs"
import { FormControl, InputGroup, Button } from "react-bootstrap"
import { reload } from "../utils/chrome"

const Header = () => {
    return (
        <div className="shadow-sm main-header fixed-top">
            <div className="page-header d-flex align-items-center justify-content-between">
                <div onClick={() => {chrome.tabs.create({ url: "https://zeit.io/en/times" })}}>
                    <img style={{height: "35px", cursor: "pointer"}} className="logo_big" alt="zeit.io icon" src="https://d2ldomkd7flzzm.cloudfront.net/assets/logo-1b1939c78f5369f959943e65b78943cd505527bcfe9f1d44c4c33d5e0e47eeeb.png"/>
                    <span className="logo_zeitio"><a href="/en/" className="a_logo">ZEIT.IO</a></span>
                </div>
                <div className="header__icon-button">
                    <BsBoxArrowUpRight size={25} onClick={() => reload()} />
                    <BiRefresh size={35} />
                    <BsList size={35} />
                </div>
            </div>
            <div className="header-second-row p-3">
                <InputGroup>
                    <FormControl
                    placeholder="What are you working on?"
                    aria-label="What are you working on?"
                    />
                    <Button variant="danger" className="px-3">
                        Start
                    </Button>
                </InputGroup>
            </div>
        </div>
    )
}

export default Header