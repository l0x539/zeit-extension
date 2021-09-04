import * as React from "react"
import { Alert, Button, Form, FormControl } from "react-bootstrap"
import ModalScreen from "./ModalScreen"
import { useFetcher, useResource } from "@rest-hooks/core"
import { StopTimerHook, ResetTimerHook, getProjectsHook } from "../utils/api"
import AuthContext from "../contexts/AuthContexts"
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const Editor = ({editorOpen, setEditorOpen, fromTime, toTime, pauseTime}) => {
    const [error, setError] = React.useState('')
    const {token} = React.useContext(AuthContext)
    const stopTimer = useFetcher(StopTimerHook)
    const resetTimer = useFetcher(ResetTimerHook)
    const projects = useResource(getProjectsHook, {apiKey: token, params: ''})
    const [date, setDate] = React.useState('')
    const [from, setFrom] = React.useState(fromTime)
    const [pause, setPause] = React.useState(pauseTime)
    const [comment, setComment] = React.useState('')
    const [project_id, setProjectId] = React.useState('')
    const [to, setTo] = React.useState(toTime)


    React.useEffect(() => {
        if (projects.length < 1) {
            setError('Please create a project first')
        }
    }, [projects])

    const handleDateChange = (value, format) => {
        setError('')
        setDate(format)
    }

    const handleStopTimer = async () => {
        if (project_id.length > 0) {
            const result = await stopTimer({apiKey: token, project_id, comment})
            if (result.error && result.error.length > 0) {
                setEditorOpen(false)
            }
        } else {
            setError('Please Select a project.')
        }
    }

    const handleSelectProject = (e) => {
        console.log(e.target.value)
    }

    return (
        <ModalScreen modalOpen={editorOpen} setModalOpen={setEditorOpen} title={"Edit"} footer={(
            <>
                <Button variant="secondary" onClick={() => {
                    resetTimer({apiKey: token})
                    setEditorOpen(false)}
                }>Discard Time</Button>
                <Button variant="primary" onClick={handleStopTimer}>Save</Button>
            </>
        )} >
                {error.length > 0 ? 
                    <Alert variant={"danger"} onClose={() => setError('')} dismissible>
                        {error}
                    </Alert>
                :
                    null
                }
                <Form className="form-horizontal">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <Form.Label className="form-label">Project</Form.Label>
                            <div>
                            <Form.Select onSelect={handleSelectProject}>
                                {projects && projects.length ?
                                    projects.map((project, index) => <option key={index} value={project.id}>{project.name}</option>)
                                    :
                                    <option>No projects yet</option>
                                }
                                
                            </Form.Select>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-4" id="hourly_wage_section">
                            <div className="mb-3">
                                <Form.Label className="form-label">Hourly wage</Form.Label>
                                <Form.Select disabled>
                                    <option>$30.00</option>
                                </Form.Select>
                            </div>

                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="row">
                            <div className="col-md-3">
                                <Form.Label className="form-label">Date</Form.Label>
                                <DatePicker
                                selected={date}
                                onChange={handleDateChange}
                                className="form-control"
                                minDate={date}
                                customInput={
                                    <FormControl
                                    defaultValue={date}
                                    />
                                }
                            />
                            </div>
                            <div className="col-md-2">
                                <Form.Label className="form-label">From</Form.Label>
                                <FormControl
                                defaultValue={from}
                                onChange={(e) => {setFrom(e.target.value), setError('')}}
                                />
                            </div>
                            <div className="col-md-2">
                                <Form.Label className="form-label">To</Form.Label>
                                <FormControl
                                defaultValue={to}
                                onChange={(e) => {setTo(e.target.value), setError('')}}
                                />
                            </div>
                            <div className="col-md-2">
                                <Form.Label className="form-label">Pause</Form.Label>
                                <FormControl
                                defaultValue={pause}
                                onChange={(e) => {setPause(e.target.value), setError('')}}
                                />
                            </div>
                            <div className="col-md-3">
                                <Form.Label className="form-label">Duration</Form.Label>
                                <FormControl
                                value={to-from}
                                disabled
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <Form.Label className="form-label">Comment</Form.Label>
                        <FormControl
                        type="textarea"
                        onChange={(e) => {setComment(e.target.value), setError('')}}
                        />

                    </div>
                </Form>
        </ModalScreen>
    )
}

export default Editor