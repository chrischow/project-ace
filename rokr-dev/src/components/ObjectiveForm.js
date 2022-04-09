import { useParams, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import $ from 'jquery';
import { getDate, checkDate, getOneIBD, putIBD } from '../utils/queryData';

export default function ObjectiveForm(props) {
    // Extract URL parameters
    const params = useParams();
    const urlParams = new URLSearchParams(useLocation().search);
    const history = useHistory();

    // Initialise state for form
    const [formData, setFormData] = useState({});
    const [team, setTeam] = useState({});
    const [formErrors, setFormErrors] = useState([]);
    const formErrorsList = formErrors.map(function(item) {
        return <li key={item}>{item}</li>;
    });

    const mode = props.mode === 'edit' ? 'Edit' : 'New';
    
    // Query data - simulated
    useEffect(function() {
        if (props.mode === 'edit') {
            getOneIBD('ObjectivesStore', Number(params.id), setFormData);
        } else {
            var teamInfo = props.teams.filter(function(item) {
                return item.teamName === urlParams.get('team');
            });

            setTeam(teamInfo[0])

            setFormData({
                objectiveId: -1,
                objectiveTitle: "",
                objectiveDescription: "",
                objectiveStartDate: getDate(new Date()),
                objectiveEndDate: getDate(new Date()),
                frequency: urlParams.get('frequency'),
                team: urlParams.get('team')
            });
        }
    }, []);

    useEffect(function() {
        if (formData.team && props.mode === 'edit') {
            var teamInfo = props.teams.filter(function(item) {
                return item.teamName === formData.team;
            });
            setTeam(teamInfo[0]);
        }
    }, [formData]);
    
    function handleChange(event) {
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        });
    }

    // Prepare select input options
    var teams = props.teams.map(function(team) {
        return <option key={team.slug} value={team.teamName}>{team.teamName}</option>
    });
    
    // Enable form datepicker utility
    useEffect(function() {
        $(function() {
            var startDatePicker = $('#objectiveStartDate');
            startDatePicker.datepicker({
                format: 'yyyy-mm-dd'
            });

            startDatePicker.on('changeDate', function(){
                setFormData(prevData => {
                    return {
                        ...prevData,
                        objectiveStartDate: getDate(startDatePicker.datepicker('getDate'))
                    };
                })
            });

            var endDatePicker = $('#objectiveEndDate');
            endDatePicker.datepicker({
                format: 'yyyy-mm-dd'
            });

            endDatePicker.on('changeDate', function(){
                setFormData(prevData => {
                    return {
                        ...prevData,
                        objectiveEndDate: getDate(endDatePicker.datepicker('getDate'))
                    };
                })
            });
        });
    });

    // Cancel: Go back
    function redirectBack() {
        return history.push('/' + team.slug);
    }

    function submitForm() {
        // Clear previous errors
        setFormErrors([]);

        // Extract mandatory form inputs
        const inputTitle = formData.objectiveTitle;
        const inputStartDate = formData.objectiveStartDate;
        const inputEndDate = formData.objectiveEndDate;
        
        var validStartDate = inputStartDate ? checkDate(inputStartDate) : false;
        var validEndDate = inputEndDate ? checkDate(inputEndDate) : false;

        // Form ok
        if (inputTitle && inputStartDate && validStartDate && inputEndDate && validEndDate) {
            if (props.mode === 'edit') {
                putIBD('ObjectivesStore', formData, () => history.push('/' + team.slug) );
            } else {
                var {objectiveId, ...newData} = formData;
                putIBD('ObjectivesStore', newData, () => history.push('/' + team.slug) );
            }
        } else {
            if (!inputTitle) {
                setFormErrors(prevData => {
                    return [...prevData, 'Input a title.'];
                })
            }

            if (!inputStartDate) {
                setFormErrors(prevData => {
                    return [...prevData, 'Set a start date.'];
                })
            } else if (!validStartDate) {
                setFormErrors(prevData => {
                    return [...prevData, 'Set a valid start date.'];
                })
            }

            if (!inputEndDate) {
                setFormErrors(prevData => {
                    return [...prevData, 'Set an end date.'];
                })
            } else if (!validEndDate) {
                setFormErrors(prevData => {
                    return [...prevData, 'Please set a valid end date.'];
                })
            }
        }
    }

    return (
        <div>
            <h1 className="mb-4">{mode} Objective</h1>
            <form className="form--group" id="objectiveForm">
                <div className="form-element">
                    <label htmlFor="objectiveTitle" className="form--label">Title</label>
                    <input 
                        type="text"
                        name="objectiveTitle"
                        className="form-control form-dark form--edit"
                        value={formData.objectiveTitle}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-element">
                    <label htmlFor="objectiveDescription" className="form--label">Description</label>
                    <textarea
                        name="objectiveDescription"
                        className="form-control form-dark form--edit"
                        rows="1"
                        value={formData.objectiveDescription}
                        onChange={handleChange}
                    />
                </div>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="form-element">
                            <label htmlFor="objectiveStartDate" className="form--label">Start Date</label>
                            <input
                                type="text"
                                id="objectiveStartDate"
                                name="objectiveStartDate"
                                className="form-control form-dark form--edit datepicker"
                                value={formData.objectiveStartDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-element">
                            <label htmlFor="objectiveEndDate" className="form--label">End Date</label>
                            <input
                                type="text"
                                id="objectiveEndDate"
                                name="objectiveEndDate"
                                className="form-control form-dark form--edit datepicker"
                                value={formData.objectiveEndDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="form-element">
                            <label htmlFor="team" className="form--label">Team</label>
                            <select
                                name="team"
                                className="form-control form-dark form--edit"
                                value={formData.team}
                                onChange={handleChange}
                            >
                                {teams}
                            </select>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-element">
                            <label htmlFor="frequency" className="form--label">Frequency</label>
                            <select
                                name="frequency"
                                className="form-control form-dark form--edit"
                                value={formData.frequency}
                                onChange={handleChange}
                            >
                                <option value="annual">Annual</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
            <div className="text-right mt-2">
                <button type="button" className="btn btn-secondary mr-2" onClick={redirectBack}>Back to Team Page</button>
                <button className="btn btn-blue" onClick={submitForm}>Submit</button>
            </div>
            {formErrorsList.length > 0 && <div className="form-errors mt-4">
                <p>Please resolve the following errors:</p>
                <ul>{formErrorsList}</ul>
            </div>}
        </div>
    );
}