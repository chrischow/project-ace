import { useParams, useHistory, useLocation } from "react-router-dom";
import React from 'react';
import $ from 'jquery';

import { getDate } from '../utils/queryData';

// Simulated
import { allData } from '../utils/fakeData';

export default function KRForm(props) {
    // Extract URL parameters
    const params = useParams();
    const urlParams = new URLSearchParams(useLocation().search);
    const history = useHistory();

    function queryData() {
        // Query data - simulated
        const allKeyResults = allData.keyResults;

        const currKr = allKeyResults.filter(function(kr) {
            return Number(kr.krId) === Number(params.id);
        });
        return currKr[0];
    }
    
    // Initialise form based on mode
    var mode;
    var initData;
    var team;

    if (props.mode === 'edit') {
        mode = 'Edit';
        initData = queryData();
        team = props.teams.filter(function(item) {
            return item.teamName === initData.parentObjectiveTeam;
        });
    } else {
        mode = 'New';
        initData = {
            krId: -1,
            krTitle: "",
            krDescription: "",
            krStartDate: "2022-04-01",
            krEndDate: "",
            minValue: 0,
            maxValue: 1,
            currentValue: 0,
            owner: "",
            parentObjectiveId: -1,
            parentObjectiveTeam: urlParams.get('team')
        }
        team = props.teams.filter(function(item) {
            return item.teamName === urlParams.get('team');
        });
    }

    // Retrieve objectives for this team - for select box and parent objective
    function queryObjectives() {
        // Query data - simulated
        const allObjectives = allData.objectives;

        const objectives = allObjectives.filter(function(obj) {
            return obj.team === team[0].teamName;
        });

        const selectObjective = objectives.map(function(obj) {
            return (
                <option
                    key={obj.objectiveId}
                    value={obj.objectiveId}
                    className="selectbox-text"
                >
                    [{obj.frequency.charAt(0).toUpperCase() + obj.frequency.slice(1)}] {obj.objectiveTitle}
                </option>
            );
        });

        const startId = objectives.length > 0 ? objectives[0].objectiveId : 0;
        return [selectObjective, startId];
    }
    
    const [selectObjective, startId] = queryObjectives();
    if (props.mode === 'new') {
        initData = {
            ...initData,
            parentObjectiveId: startId
        };
    }
    
    // Initialise controlled form
    const [formData, setFormData] = React.useState(initData);

    function handleChange(event) {
        const name = event.target.name;
        const value = (name === 'currentValue' || name === 'parentObjectiveId') ? 
            Number(event.target.value) : 
            event.target.value;
        
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        });
    }

    // Enable form datepicker utility
    React.useEffect(function() {
        $(function() {
            var startDatePicker = $('#krStartDate');
            startDatePicker.datepicker({
                format: 'yyyy-mm-dd'
            });

            startDatePicker.on('changeDate', function(){
                setFormData(prevData => {
                    return {
                        ...prevData,
                        krStartDate: getDate(startDatePicker.datepicker('getDate'))
                    };
                })
            });

            var endDatePicker = $('#krEndDate');
            endDatePicker.datepicker({
                format: 'yyyy-mm-dd'
            });

            endDatePicker.on('changeDate', function(){
                setFormData(prevData => {
                    return {
                        ...prevData,
                        krEndDate: getDate(endDatePicker.datepicker('getDate'))
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

    // Configure form errors
    function submitForm() {
        // Clear previous errors
        setFormErrors([]);

        // Extract mandatory form inputs
        const inputTitle = formData.krTitle;
        const inputStartDate = formData.krStartDate;
        const inputEndDate = formData.krEndDate;
        
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
            <h1 className="mb-4">{mode} Key Result</h1>
            <form className="form--group" id="keyResultForm">
                <div className="form-element">
                    <label htmlFor="krTitle" className="form--label">Title</label>
                    <input 
                        type="text"
                        name="krTitle"
                        className="form-control form-dark form--edit"
                        value={formData.krTitle}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-element">
                    <label htmlFor="krDescription" className="form--label">Description</label>
                    <textarea
                        name="krDescription"
                        className="form-control form-dark form--edit"
                        rows="1"
                        value={formData.krDescription}
                        onChange={handleChange}
                    />
                </div>
                <div className="row align-items-center">
                    <div className="col-12">
                        <div className="form-element">
                            <label htmlFor="parentObjectiveId" className="form--label">Objective</label>
                            <select
                                name="parentObjectiveId"
                                className="form-control form-dark form--edit"
                                value={formData.parentObjectiveId}
                                onChange={handleChange}
                            >
                                {selectObjective}
                            </select>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-element">
                            <label htmlFor="parentObjectiveTeam" className="form--label">Team</label>
                            <input
                                type="text"
                                name="parentObjectiveTeam"
                                className="form-control form-dark form--edit"
                                value={formData.parentObjectiveTeam}
                                disabled
                            >
                            </input>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-element">
                            <label htmlFor="owner" className="form--label">Owner</label>
                            <input
                                type="text"
                                name="owner"
                                className="form-control form-dark form--edit"
                                value={formData.owner}
                            >
                            </input>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-4">
                        <div className="form-element">
                            <label htmlFor="krStartDate" className="form--label">Start Date</label>
                            <input
                                type="text"
                                id="krStartDate"
                                name="krStartDate"
                                className="form-control form-dark form--edit datepicker"
                                value={formData.krStartDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-element">
                            <label htmlFor="krEndDate" className="form--label">End Date</label>
                            <input
                                type="text"
                                id="krEndDate"
                                name="krEndDate"
                                className="form-control form-dark form--edit datepicker"
                                value={formData.krEndDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-4">
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
                <div className="row align-items-center">
                    <div className="col-4">
                        <div className="form-element">
                            <label htmlFor="minValue" className="form--label">Min. Value</label>
                            <input
                                name="minValue"
                                type="number"
                                className="form-control form-dark form--edit"
                                value={formData.minValue}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-element">
                            <label htmlFor="currentValue" className="form--label">
                                Current Value: <span className="form--slider-value">{formData.currentValue}</span>
                            </label>
                            <input
                                name="currentValue"
                                min={formData.minValue}
                                max={formData.maxValue}
                                step="1"
                                type="range"
                                className="form-control form-range custom-range form-dark form--edit"
                                value={formData.currentValue}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-element">
                            <label htmlFor="maxValue" className="form--label">Max. Value</label>
                            <input
                                name="maxValue"
                                type="number"
                                className="form-control form-dark form--edit"
                                value={formData.maxValue}
                                onChange={handleChange}
                            />
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