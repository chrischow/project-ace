import { useParams, useHistory } from "react-router-dom";
import React from 'react';

// Simulated
import { allData } from '../utils/fakeData';

export default function KRForm(props) {
    // Extract objective ID from URL parameter
    const params = useParams();

    function queryData() {
        // Query data - simulated
        const allKeyResults = allData.keyResults;

        const currKr = allKeyResults.filter(function(kr) {
            return kr.krId == params.id;
        });

        return currKr[0];
    }

    const initData = queryData();
    // const history = useHistory();
    const team = props.teams.filter(function(item) {
        return item.teamName === initData.parentObjectiveTeam;
    });
    
    function redirectBack() {
        // return history.push('/' + team[0].slug);
        // history.goBack();
        console.log(this.context);
        return 'hello';
    }

    function submitForm() {
        console.log('Submitting form:');
        console.log(formData);
        // history.push('/' + team[0].slug);
    }

    const [formData, setFormData] = React.useState(initData);

    function handleLocalChange(event) {
        const name = event.target.name;
        const value = (name === 'currentValue') ? Number(event.target.value) : event.target.value;
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        });
    }

    var teams = props.teams.map(function(team) {
        return <option value={team.teamName}>{team.teamName}</option>
    });
    
    return (
        <div>
            <h1 className="mb-4">Edit Key Result</h1>
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
                    <div className="col-6">
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
                    <div className="col-6">
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
                </div>
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="form-element">
                            <label htmlFor="parentObjectiveTeam" className="form--label">Team</label>
                            <select
                                name="parentObjectiveTeam"
                                className="form-control form-dark form--edit"
                                value={formData.parentObjectiveTeam}
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
                    {/* <div className="col-4">
                        <div className="form-element">
                            <label htmlFor="currentValue" className="form--label">Current Value</label>
                            <input
                                name="currentValue"
                                type="number"
                                className="form-control form-dark form--edit"
                                value={formData.currentValue}
                                onChange={handleLocalChange}
                            />
                        </div>
                    </div> */}
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