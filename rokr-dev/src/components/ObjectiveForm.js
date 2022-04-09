import { useParams, useHistory, useLocation } from "react-router-dom";
import React from 'react';
import $ from 'jquery';
import { getDate } from '../utils/queryData';

// Simulated
import { allData } from '../utils/fakeData';

export default function ObjectiveForm(props) {
    // Extract URL parameters
    const params = useParams();
    const urlParams = new URLSearchParams(useLocation().search);
    const history = useHistory();

    function queryData() {
        // Query data - simulated
        const allObjectives = allData.objectives;

        const currObj = allObjectives.filter(function(obj) {
            return Number(obj.objectiveId) === Number(params.id);
        });

        return currObj[0];
    }

    // Initialise form based on mode
    var mode;
    var initData;
    var team;

    if (props.mode === 'edit') {
        mode = 'Edit';
        initData = queryData();
        team = props.teams.filter(function(item) {
            return item.teamName === initData.team;
        })
    } else {
        mode = 'New';
        team = props.teams.filter(function(item) {
            return item.teamName === urlParams.get('team');
        });

        initData = {
            objectiveTitle: "",
            objectiveDescription: "",
            objectiveStartDate: "",
            objectiveEndDate: "",
            frequency: urlParams.get('frequency'),
            team: urlParams.get('team')
        }
    }

    // Initialise controlled form
    const [formData, setFormData] = React.useState(initData);

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
    React.useEffect(function() {
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
        return history.push('/' + team[0].slug);
    }

    // Submit: Check form and add to errors first
    const [formErrors, setFormErrors] = React.useState([]);
    const formErrorsList = formErrors.map(function(item) {
        return <li key={item}>{item}</li>;
    });

    function submitForm() {
        // Clear previous errors
        setFormErrors([]);

        // Extract mandatory form inputs
        const inputTitle = formData.objectiveTitle;
        const inputStartDate = formData.objectiveStartDate;
        const inputEndDate = formData.objectiveEndDate;
        
        var validStartDate = false;
        var validEndDate = false;

        if (inputStartDate) {
            try {
                var checkStartDate = new Date(inputStartDate);
                if (!checkStartDate.getDate()) {
                    throw new Error('Not a proper date.');
                }
                validStartDate = true;
            } catch(err){
                validStartDate = false;
            }
        }

        if (inputEndDate) {
            try {
                var checkEndDate = new Date(inputEndDate);
                if (!checkEndDate.getDate()) {
                    throw new Error('Not a proper date.');
                }
                validEndDate = true;
            } catch(err){
                validEndDate = false;
            }
        }

        // Form ok
        if (inputTitle && inputStartDate && validStartDate && inputEndDate && validEndDate) {
            if (props.mode === 'edit') {
                console.log('Updating entry:');
                console.log(formData);
            } else {
                console.log('Creating entry:')
                console.log(formData);
            }
            history.push('/' + team[0].slug);
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
            }

            if (!inputEndDate) {
                setFormErrors(prevData => {
                    return [...prevData, 'Set an end date.'];
                })
            }

            if (inputStartDate && !validStartDate) {
                setFormErrors(prevData => {
                    return [...prevData, 'Set a valid start date.'];
                })
            }

            if (inputEndDate && !validEndDate) {
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