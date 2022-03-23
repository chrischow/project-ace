import React from 'react';
import $ from 'jquery';

export function ObjectiveForm(props) {
    
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [formData, setFormData] = React.useState(props.formData);

    React.useEffect(function() {
        setFormData({...props.formData});
    }, [props.formData]);

    const typeTitle = props.type === 'objective' ? 'Objective' : 'Key Result';

    function toggleEdit(event) {
        setIsEditMode(prev => !prev);
        $('.form-element').each(function() {
            var elem = $(this);
            elem.toggleClass('form-element-open');
        });
    };

    function closeForm(event) {
        $('#modal-objective').modal('hide');
        $('input[type="checkbox"]')[0].checked = false;
        setIsEditMode(false);
        $('.form-element').each(function() {
            var elem = $(this);
            elem.removeClass('form-element-open');
        });
    };

    function handleChange(event) {
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        });
    };
    
    function submitData(){
        closeForm();
        console.log('Submitting data:');
        console.log(formData);
    }

    var teams = props.teams.map(function(team) {
        return <option value={team.teamName}>{team.teamName}</option>
    });

    return (
        <div className="modal fade" id={'modal-' + props.type} tabIndex="-1" role="dialog" aria-labelledby={'modal-' + props.type + '-label'} aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={'modal-' + props.type + '-label'}>{typeTitle} Details</h5>
                        <button type="button" className="close" onClick={closeForm} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="text-right mb-2">
                            <label className="form--switch">
                                <input type="checkbox" onClick={toggleEdit} />
                                <span className="form--slider round"></span>
                            </label>
                            Edit
                        </div>
                        <form className="form--group" id="objectiveForm">
                            <div className="form-element">
                                <label htmlFor="objTitle" className="form--label">Title</label>
                                <input 
                                    type="text"
                                    name="objTitle"
                                    className={"form-control form-dark" + (isEditMode ? " form--edit": "")}
                                    value={formData.objTitle}
                                    onChange={handleChange}
                                    disabled={!isEditMode}
                                />
                            </div>
                            <div className="form-element">
                                <label htmlFor="objDescription" className="form--label">Description</label>
                                <textarea
                                    name="objDescription"
                                    className={"form-control form-dark" + (isEditMode ? " form--edit": "")}
                                    rows="1"
                                    value={formData.objDescription}
                                    onChange={handleChange}
                                    disabled={!isEditMode}
                                />
                            </div>
                            <div className="row align-items-center">
                                <div className="col-6">
                                    <div className="form-element">
                                        <label htmlFor="objStartDate" className="form--label">Start Date</label>
                                        <input
                                            type="text"
                                            name="objStartDate"
                                            className={"form-control form-dark" + (isEditMode ? " form--edit": "")}
                                            value={formData.objStartDate}
                                            onChange={handleChange}
                                            disabled={!isEditMode}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-element">
                                        <label htmlFor="objEndDate" className="form--label">End Date</label>
                                        <input
                                            type="text"
                                            name="objEndDate"
                                            className={"form-control form-dark" + (isEditMode ? " form--edit": "")}
                                            value={formData.objEndDate}
                                            onChange={handleChange}
                                            disabled={!isEditMode}
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
                                            className={"form-control form-dark" + (isEditMode ? " form--edit": "")}
                                            value={formData.objTeam}
                                            onChange={handleChange}
                                            disabled={!isEditMode}
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
                                            className={"form-control form-dark" + (isEditMode ? " form--edit": "")}
                                            value={formData.objCategory}
                                            onChange={handleChange}
                                            disabled={!isEditMode}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={closeForm}>Close</button>
                        <button type="button" className="btn btn-blue" onClick={submitData} data-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}