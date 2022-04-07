import { useParams, useHistory, useLocation } from "react-router-dom";
import React from 'react';

// Simulated
import { allData } from '../utils/fakeData';

export default function KRForm(props) {
    // Extract objective ID from URL parameter
    const params = useParams();
    const urlParams = new URLSearchParams(useLocation().search);

    function queryData() {
        // Query data - simulated
        const allKeyResults = allData.keyResults;
        const allObjectives = allData.objectives;

        const currKr = allKeyResults.filter(function(kr) {
            return Number(kr.krId) === Number(params.id);
        });

        const team = currKr[0].parentObjectiveTeam;
        const objectives = allObjectives.filter(function(obj) {
            return obj.team === team;
        });

        const selectObjective = objectives.map(function(obj) {
            return <option value={obj.objectiveId}>{obj.objectiveTitle}</option>
        });

        return currKr[0];
    }
    
    // Initialise form
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
            krTitle: "",
            krDescription: "",
            krStartDate: "2022-04-01",
            krEndDate: "",
            minValue: 0,
            maxValue: 1,
            currentValue: 0,
            owner: "",
            parentObjectiveId: 0,
            parentObjectiveTeam: urlParams.get('team')
        }
        team = props.teams.filter(function(item) {
            return item.teamName === urlParams.get('team');
        });
    }

    function queryObjectives() {
        // Query data - simulated
        const allObjectives = allData.objectives;

        const objectives = allObjectives.filter(function(obj) {
            return obj.team === team[0].teamName;
        });

        const selectObjective = objectives.map(function(obj) {
            return <option value={obj.objectiveId}>{obj.objectiveTitle}</option>
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
                        onChange={handleLocalChange}
                    />
                </div>
                <div className="form-element">
                    <label htmlFor="krDescription" className="form--label">Description</label>
                    <textarea
                        name="krDescription"
                        className="form-control form-dark form--edit"
                        rows="1"
                        value={formData.krDescription}
                        onChange={handleLocalChange}
                    />
                </div>
                <div className="row align-items-center">
                    <div className="col-4">
                        <div className="form-element">
                            <label htmlFor="krStartDate" className="form--label">Start Date</label>
                            <input
                                type="text"
                                name="krStartDate"
                                className="form-control form-dark form--edit"
                                value={formData.krStartDate}
                                onChange={handleLocalChange}
                            />
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="form-element">
                            <label htmlFor="krEndDate" className="form--label">End Date</label>
                            <input
                                type="text"
                                name="krEndDate"
                                className="form-control form-dark form--edit"
                                value={formData.krEndDate}
                                onChange={handleLocalChange}
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
                                onChange={handleLocalChange}
                            >
                                <option value="annual">Annual</option>
                                <option value="quarterly">Quarterly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="form-element">
                            <label htmlFor="parentObjectiveId" className="form--label">Objective</label>
                            <select
                                name="parentObjectiveId"
                                className="form-control form-dark form--edit"
                                value={formData.parentObjectiveId}
                                onChange={handleLocalChange}
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
                    
                    <div className="col-4">
                        <div className="form-element">
                            <label htmlFor="minValue" className="form--label">Min. Value</label>
                            <input
                                name="minValue"
                                type="number"
                                className="form-control form-dark form--edit"
                                value={formData.minValue}
                                onChange={handleLocalChange}
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
                                onChange={handleLocalChange}
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
                                onChange={handleLocalChange}
                            />
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