import { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from "react-router-dom";
import $ from 'jquery';

import { getDate, checkDate, getOneIBD, getTeamObjectiveDataIBD,
    putIBD } from '../utils/queryData';

// Simulated
import { allData } from '../utils/fakeData';

export default function KRForm(props) {
    // Extract URL parameters
    const params = useParams();
    const urlParams = new URLSearchParams(useLocation().search);
    const history = useHistory();
    
    // Initialise state for form
    const [formData, setFormData] = useState({});
    const [team, setTeam] = useState({});
    const [objectives, setObjectives] = useState([]);

    const mode = props.mode === 'edit' ? 'Edit' : 'New';

    // Run once - query Key Result
    useEffect(function() {
        if (props.mode === 'edit') {
            // Query data - SWAP FUNCTION HERE
            getOneIBD('KeyResultsStore', Number(params.id), setFormData);
            // getOneKR(krListId, Number(params.id), setFormData);
        } else {
            var teamInfo = props.teams.filter(function(item) {
                return item.teamName === urlParams.get('team');
            });
            setTeam(teamInfo[0]);

            // Query objectives - SWAP FUNCTION HERE
            getTeamObjectiveDataIBD(teamInfo[0].teamName, setObjectives);
            // getObjectiveData(objListId, teamInfo[0].teamName, setObjectives);
            
            // Set form data
            setFormData({
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
            });
        }
    }, []);

    // Update team (mainly for edit mode) and query objectives based on KR data
    useEffect(function() {
        if (formData.parentObjectiveTeam && props.mode === 'edit') {
            // Get team info
            var teamInfo = props.teams.filter(function(item) {
                return item.teamName === formData.parentObjectiveTeam;
            });
            setTeam(teamInfo[0]);
            
            // Query objectives - SWAP FUNCTION HERE
            getTeamObjectiveDataIBD(teamInfo[0].teamName, setObjectives);
            // getObjectiveData(objListId, teamInfo[0].teamName, setObjectives);
        }
    }, [formData]);

    // Update options based on Objectives
    useEffect(function() {
        if (props.mode === 'new') {
            setFormData(prevData => {
                return {
                    ...prevData,
                    parentObjectiveId: objectives.length > 0 ? objectives[0].objectiveId : 0
                };
            });
        }
    }, [objectives]);

    function objectivesToOptions(obj) {
        return (
            <option
                key={obj.objectiveId}
                className="selectbox-text form-select-dropdown"
                value={obj.objectiveId}
            >
                [{obj.frequency.charAt(0).toUpperCase() + obj.frequency.slice(1)}] {obj.objectiveTitle}
            </option>
        );
    }

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
    useEffect(function() {
        $(function() {
            const krDescTextArea = $('#krDescription');
            krDescTextArea.on('change input', function () {
                this.style.height = "auto";
                this.style.height = this.scrollHeight + "px";
            });

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
        return history.push('/' + team.slug);
    }

    // Submit: Check form and add to errors first
    const [formErrors, setFormErrors] = useState([]);
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
        
        var validStartDate = inputStartDate ? checkDate(inputStartDate) : false;;
        var validEndDate = inputEndDate ? checkDate(inputEndDate) : false;;

        // Form ok
        if (inputTitle && inputStartDate && validStartDate && inputEndDate && validEndDate) {
            var {krId, parentObjectiveTeam, ...newData} = formData;
            // var reqDigest = getXRequestDigestValue();
            if (props.mode === 'edit') {
                putIBD('KeyResultsStore', formData, () => history.push('/' + team.slug))
                // updateKeyResult(
                //     krListId, krId, newData, reqDigest,
                //     krListItemEntityTypeFullName,
                //     () => history.push('/' + team.slug)
                // );
            } else {
                putIBD('KeyResultsStore', newData, () => history.push('/' + team.slug));
                // addKeyResult(
                //     krListId, newData, reqDigest,
                //     krListItemEntityTypeFullName,
                //     () => history.push('/' + team.slug)
                // );
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
                        id="krDescription"
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
                                {objectives.map(objectivesToOptions)}
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
                    <div className="col-6">
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
                    <div className="col-6">
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
                                Current Value: <span className="form--slider-value text-center">{formData.currentValue}</span>
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
                <button className="btn btn-green" onClick={submitForm}>Submit</button>
            </div>
            {formErrorsList.length > 0 && <div className="form-errors mt-4">
                <p>Please resolve the following errors:</p>
                <ul>{formErrorsList}</ul>
            </div>}
        </div>
    );
}

