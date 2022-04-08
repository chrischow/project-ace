import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import { EditIcon, editIconString } from './Icons';
import $ from 'jquery';

import { getDate } from '../utils/queryData';

// Simulated
import { allData } from '../utils/fakeData';

export default function UpdatesForm(props){

    // Extract key result ID from URL parameter
    const params = useParams();
    const history = useHistory();

    // Get KR
    function queryData() {
        // Query data - simulated
        const allKeyResults = allData.keyResults;

        const currKr = allKeyResults.filter(function(kr) {
            return kr.krId == params.id;
        });

        return currKr[0];
    }

    const krData = queryData();

    // State
    const [updates, setUpdates] = React.useState([]);
    const [formData, setFormData] = React.useState({
        updateId: 0,
        updateDate: '',
        updateText: '',
        parentKrId: krData.krId
    });

    const team = props.teams.filter(function(item) {
        return item.teamName === krData.parentObjectiveTeam;
    });
    
    const updateData = allData.updates.filter(function(update) {
        return update.parentKrId == krData.krId;
    });

    function sortByDate(a, b) {
        if (a.updateDate > b.updateDate) {
            return -1;
        } else if (a.updateDate < b.updateDate) {
            return 1;
        }
        return 0;
    }

    updateData.sort(sortByDate);

    function handleChange(event){
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        });
    }

    React.useEffect(function() {
        // Set updates
        setUpdates([...updateData]);

        const updateTextArea = $('#updateTextArea');
        updateTextArea.on('change input', function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        });

        $('#editUpdateModal').on('shown.bs.modal', function(event){
            updateTextArea.height('');
            updateTextArea.height(updateTextArea.prop('scrollHeight') + 'px');
        });
    }, []);

    React.useEffect(function() {
        const table = $('#updates-table');
        $(function() {
            // Render datatable
            if (! $.fn.dataTable.isDataTable( '#updates-table' )) {
                table.DataTable({
                    autoWidth: false,
                    pageLength: 10,
                    displayStart: 0,
                    lengthMenu: [10, 25, 50, 75, 100],
                    order: [
                        [0, 'desc']
                    ],
                    fixedColumns: true,
                    columnDefs: [
                        {width: '15%', name: 'date', targets: 0, data: 'updateDate', className: "text-center"},
                        {
                            width: '75%', name: 'text', targets: 1, data: 'updateText',
                            className: "directory--table-text-sm", sortable: false},
                        {width: '10%', name: 'edit', targets: 2, className: 'text-center', sortable: false}
                    ]
                });
    
                table.DataTable().draw();
            } else {
                table.DataTable().draw();
            }
        });
    });

    React.useEffect(function() {
        $(function() {
            var datePicker = $('#updateDate');
            datePicker.datepicker({
                format: 'yyyy-mm-dd'
            });

            datePicker.on('changeDate', function(){
                setFormData(prevData => {
                    return {
                        ...prevData,
                        updateDate: getDate(datePicker.datepicker('getDate'))
                    };
                })
            });
        });
    });

    // Functions to add vs. edit
    const [mode, setMode] = React.useState('');

    function addUpdate() {
        setFormData({
            updateId: 0,
            updateDate: '',
            updateText: '',
            parentKrId: krData.krId
        });
        setMode('new');
        $('#editUpdateModal').modal('toggle');
    }

    function editUpdate(update){
        setFormData(prevData => {
            return {
                ...prevData,
                updateDate: update.updateDate,
                updateId: update.updateId,
                updateText: update.updateText
            };
        });
        setMode('edit');
        $('#editUpdateModal').modal('toggle');
    }
    
    // Back to Team Page
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
        const inputText = formData.updateText;
        const inputDate = formData.updateDate;

        var validDate = false;

        if (inputDate) {
            try {
                var checkDate = new Date(inputDate);
                if (!checkDate.getDate()) {
                    throw 'Not a proper date.'
                }
                validDate = true;
            } catch(err) {
                validDate = false;
            }
        }

        if (inputText && inputDate && validDate){
            // Form ok
            if (mode === 'edit') {
                console.log('Updating entry:');
                console.log(formData);
            } else if (mode === 'new') {
                console.log('Creating entry:');
                console.log(formData);
            }
            $('#editUpdateModal').modal('hide');
        } else {
            // Form not ok
            if (!inputText) {
                setFormErrors(prevData => {
                    return [...prevData, 'Provide an update.'];
                })
            }

            if (!inputDate) {
                setFormErrors(prevData => {
                    return [...prevData, 'Input a date.'];
                })
            }

            if (inputDate && !validDate) {
                setFormErrors(prevData => {
                    return [...prevData, 'Input a valid date.'];
                })
            }
        }
    }

    function confirmDelete() {
        if (window.confirm('Hit OK to confirm deletion of update. This cannot be undone.')) {
            console.log('Delete entry:');
            console.log(formData);
            $('#editUpdateModal').modal('hide');
        };
    }

    const updateRows = updates.map(function(item) {
        return (
            <tr key={item.updateId}>
                <td className="text-center">{item.updateDate}</td>
                <td>{item.updateText}</td>
                <td className="text-center">
                    <div onClick={() => {
                        editUpdate(item);
                    }}>
                        <EditIcon />
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <h1 className="mb-2">Key Result Updates</h1>
            <h2 className="mb-4">{krData.krTitle} - <span className="text-green">{krData.parentObjectiveTeam}</span></h2>
            <div className="mb-4">
                <button className="btn btn-blue mr-3" onClick={addUpdate}>Add Update</button>
                <button className="btn btn-secondary float-right" onClick={redirectBack}>Back to Team Page</button>
            </div>
            <div className="directory--container">
                <table className="table table-dark directory--table w-100" id="updates-table">
                    <thead>
                        <tr>
                            <th className="text-center">Date</th>
                            <th className="text-center">Description</th>
                            <th className="text-center">Edit</th>
                        </tr>
                    </thead>
                    <tbody className="align-items-center">
                        {updateRows}
                    </tbody>
                </table>
            </div>
            <div className="modal fade" id="editUpdateModal" tabIndex="-1" aria-labelledby="editUpdateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editUpdateModalLabel">Edit Update</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="form--group">
                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-element">
                                            <label htmlFor="updateDate" className="form--label">Date</label>
                                            <input
                                                type="text"
                                                id="updateDate"
                                                name="updateDate"
                                                className="form-control form-semi-dark form--edit datepicker"
                                                value={formData.updateDate}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-element">
                                    <label htmlFor="updateText" className="form--label">Update</label>
                                    <textarea
                                        id="updateTextArea"
                                        name="updateText"
                                        rows="1"
                                        className="form-control form-semi-dark form--edit"
                                        value={formData.updateText}
                                        onChange={handleChange}
                                    />
                                </div>
                            </form>
                        </div>
                        {formErrorsList.length > 0 && <div className="pr-5 pl-5 mb-4"><div className="form-errors-update mt-2">
                            <p>Please resolve the following errors:</p>
                            <ul>{formErrorsList}</ul>
                        </div></div>}
                        <div className="modal-footer-custom text-right">
                            {mode === 'edit' && <button type="button" className="btn btn-danger ml-3 float-left" onClick={confirmDelete}>Delete</button>}
                            <button type="button" className="btn btn-secondary mr-3" onClick={() => setFormErrors([])} data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-blue mr-3" onClick={submitForm}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}