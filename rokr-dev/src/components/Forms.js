import React from 'react';
import $ from 'jquery';

export function ObjectiveForm(props) {
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [formData, setFormData] = React.useState({
        objId: 0,
        objTitle: "",
        objDescription: "",
        objStartDate: "",
        objEndDate: "",
        objTeam: "",
        objCategory: ""
    });
    
    function toggleEdit(event) {
        setIsEditMode(prev => !prev);
        $('.form-element').each(function() {
            var elem = $(this);
            elem.toggleClass('form-element-open');
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

    return (
        <div>
            <div className="text-right mb-2">
                <label className="form--switch">
                    <input type="checkbox" name="formMode" onChange={toggleEdit} />
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
                        value={props.objTitle}
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
                        value={props.objDescription}
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
                                value={props.objStartDate}
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
                                value={props.objEndDate}
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
                            <input
                                type="text"
                                name="objTeam"
                                className={"form-control form-dark" + (isEditMode ? " form--edit": "")}
                                value={props.objTeam}
                                onChange={handleChange}
                                disabled={!isEditMode}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-element">
                            <label htmlFor="objCategory" className="form--label">Category</label>
                            <input
                                type="text"
                                name="objCategory"
                                className={"form-control form-dark" + (isEditMode ? " form--edit": "")}
                                value={props.objCategory}
                                onChange={handleChange}
                                disabled={!isEditMode}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}