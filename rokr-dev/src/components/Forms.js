import React from 'react';

export function ObjectiveForm(props) {
    const [localFormData, setLocalFormData] = React.useState({...props.formData});
    
    function handleLocalChange(event) {
        setLocalFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        });
        props.setFormData(prevData => {
            return localFormData;
        });
    }
    
    React.useEffect(function() {
        setLocalFormData(props.formData);
        props.setFormData(props.formData);
    }, [props.formData]);

    var teams = props.teams.map(function(team) {
        return <option value={team.teamName}>{team.teamName}</option>
    });

    return (
        <form className="form--group" id="objectiveForm">
            <div className="form-element">
                <label htmlFor="objTitle" className="form--label">Title</label>
                <input 
                    type="text"
                    name="objTitle"
                    className={"form-control form-dark" + (props.isEditMode ? " form--edit": "")}
                    value={localFormData.objTitle}
                    onChange={handleLocalChange}
                    disabled={!props.isEditMode}
                />
            </div>
            <div className="form-element">
                <label htmlFor="objDescription" className="form--label">Description</label>
                <textarea
                    name="objDescription"
                    className={"form-control form-dark" + (props.isEditMode ? " form--edit": "")}
                    rows="1"
                    value={localFormData.objDescription}
                    onChange={handleLocalChange}
                    disabled={!props.isEditMode}
                />
            </div>
            <div className="row align-items-center">
                <div className="col-6">
                    <div className="form-element">
                        <label htmlFor="objStartDate" className="form--label">Start Date</label>
                        <input
                            type="text"
                            name="objStartDate"
                            className={"form-control form-dark" + (props.isEditMode ? " form--edit": "")}
                            value={localFormData.objStartDate}
                            onChange={handleLocalChange}
                            disabled={!props.isEditMode}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-element">
                        <label htmlFor="objEndDate" className="form--label">End Date</label>
                        <input
                            type="text"
                            name="objEndDate"
                            className={"form-control form-dark" + (props.isEditMode ? " form--edit": "")}
                            value={localFormData.objEndDate}
                            onChange={handleLocalChange}
                            disabled={!props.isEditMode}
                        />
                    </div>
                </div>
            </div>
            <div className="row align-items-center">
                <div className="col-6">
                    <div className="form-element">
                        <label htmlFor="objTeam" className="form--label">Team</label>
                        <select
                            name="objTeam"
                            className={"form-control form-dark" + (props.isEditMode ? " form--edit": "")}
                            value={localFormData.objTeam}
                            onChange={handleLocalChange}
                            disabled={!props.isEditMode}
                        >
                            {teams}
                        </select>
                    </div>
                </div>
                <div className="col-6">
                    <div className="form-element">
                        <label htmlFor="objCategory" className="form--label">Category</label>
                        <input
                            type="text"
                            name="objCategory"
                            className={"form-control form-dark" + (props.isEditMode ? " form--edit": "")}
                            value={localFormData.objCategory}
                            onChange={handleLocalChange}
                            disabled={!props.isEditMode}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}