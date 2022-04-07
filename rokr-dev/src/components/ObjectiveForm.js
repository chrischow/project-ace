import { useParams, useHistory, useLocation } from "react-router-dom";
import React from 'react';
import $ from 'jquery';
import { getDate } from '../utils/queryData';

// Simulated
import { allData } from '../utils/fakeData';

export default function ObjectiveForm(props) {
    // Extract objective ID from URL parameter
    const params = useParams();
    const urlParams = new URLSearchParams(useLocation().search);

    function queryData() {
        // Query data - simulated
        const allObjectives = allData.objectives;

        const currObj = allObjectives.filter(function(obj) {
            return Number(obj.objectiveId) === Number(params.id);
        });

        return currObj[0];
    }

    // Initialise form
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

    const history = useHistory();

    function redirectBack() {
        return history.push('/' + team[0].slug);
    }

    function submitForm() {
        console.log('Submitting form:');
        console.log(formData);
        history.push('/' + team[0].slug);
    }

    const [formData, setFormData] = React.useState(initData);

    function handleLocalChange(event) {
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        });
    }

    var teams = props.teams.map(function(team) {
        return <option key={team.slug} value={team.teamName}>{team.teamName}</option>
    });
    
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
                        onChange={handleLocalChange}
                    />
                </div>
                <div className="form-element">
                    <label htmlFor="objectiveDescription" className="form--label">Description</label>
                    <textarea
                        name="objectiveDescription"
                        className="form-control form-dark form--edit"
                        rows="1"
                        value={formData.objectiveDescription}
                        onChange={handleLocalChange}
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
                                onChange={handleLocalChange}
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
                                onChange={handleLocalChange}
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
                                onChange={handleLocalChange}
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
                                onChange={handleLocalChange}
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
                <button type="button" className="btn btn-secondary mr-2" onClick={redirectBack}>Cancel</button>
                <button className="btn btn-blue" onClick={submitForm}>Submit</button>
            </div>
        </div>
    );
}