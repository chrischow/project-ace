import { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { EditIcon, editIconString } from './Icons';
import $ from 'jquery';

import { getDate, checkDate, getOneIBD, getTeamUpdatesDataIBD, 
    putIBD, deleteIBD } from '../utils/queryData';

// Simulated
import { allData } from '../utils/fakeData';

function UpdatesTable(props) {

    // Initialise state for no. of entries
    const dataTableSettings = {
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
            {width: '10%', name: 'linkButton', targets: 2, data: 'linkButton', sortable: false, className: "text-center"},
            {width: '0%', name: 'id', targets: 3, data: 'updateId', visible: false},
            {width: '0%', name: 'parentKrId', targets: 4, data: 'parentKrId', visible: false},
        ]
    };

    const updateRows = props.updateData.map(function(item) {
        return (
        <tr key={item.updateId}>
            <td className="text-center">{item.updateDate}</td>
            <td>{item.updateText}</td>
            <td className="text-center">
                <div onClick={() => {
                    props.editUpdate(item);
                }}>
                    <EditIcon />
                </div>
            </td>
        </tr>
        );
    });

    

    useEffect(function() {
        $(function() {
            const updateData = props.updateData.map(function(item) {
                return {
                    ...item,
                    linkButton: '<span class="updates-table--link">' + editIconString + '</span>'
                };
            })

            // Render datatable
            const table = $('#updates-table');
            if (! $.fn.dataTable.isDataTable( '#updates-table' )) {
                table.DataTable(dataTableSettings);
                table.DataTable().rows.add(updateData).draw();
            } else {
                table.DataTable().clear();
                table.DataTable().rows.add(updateData).draw();
            }
            
            // Link function
            $('#updates-table tbody').prop('onclick', 'span').off('click')
            $('#updates-table tbody').on('click', 'span', function() {
                var data = table.DataTable().row($(this).parents('tr')).data();
                props.editUpdate(data);
            });
        });
    }, [props.updateData]);

    return (
        <table className="table table-dark table-striped directory--table w-100" id="updates-table">
            <thead>
                <tr>
                    <th className="text-center">Date</th>
                    <th className="text-center">Description</th>
                    <th className="text-center">Edit</th>
                </tr>
            </thead>
            <tbody className="align-items-center">
            </tbody>
        </table>
    );
}

export default function UpdatesForm(props){

    // Extract key result ID from URL parameter
    const params = useParams();
    const history = useHistory();

    // Initialise states for page data
    const [krData, setKrData] = useState({});
    const [updateData, setUpdateData] = useState([]);
    const [team, setTeam] = useState('');

    // Initialise states for form
    const [mode, setMode] = useState('');
    const [formData, setFormData] = useState({
        updateId: -1,
        updateDate: '',
        updateText: '',
        parentKrId: -1
    });
    const [formErrors, setFormErrors] = useState([]);
    const formErrorsList = formErrors.map(function(item) {
        return <li key={item}>{item}</li>;
    });

    function sortByDate(a, b) {
        if (a.updateDate > b.updateDate) {
            return -1;
        } else if (a.updateDate < b.updateDate) {
            return 1;
        }
        return 0;
    }

    function sortAndSetUpdates(data) {
        data.sort(sortByDate);
        setUpdateData(data);
    }

    // Query update data - simulated
    useEffect(function() {
        getOneIBD('KeyResultsStore', Number(params.id), setKrData);
        getTeamUpdatesDataIBD(Number(params.id), sortAndSetUpdates);
    }, []);

    // Update team based on KR Data
    useEffect(function() {
        if (krData.parentObjectiveTeam) {
            const team = props.teams.filter(function(item) {
                return item.teamName === krData.parentObjectiveTeam;
            });
            setTeam(team);
            setFormData(prevData => {
                return {
                    parentKrId: krData.krId
                };
            })
        }
    }, [krData]);

    // One time: ensure textarea expands and initialise datepicker
    useEffect(function() {

        const updateTextArea = $('#updateTextArea');
        updateTextArea.on('change input', function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        });

        $('#editUpdateModal').on('shown.bs.modal', function(event){
            updateTextArea.height('');
            updateTextArea.height(updateTextArea.prop('scrollHeight') + 'px');
        });

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
    }, []);

    function handleChange(event){
        setFormData(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        });
    }

    function addUpdate() {
        setFormData({
            updateId: 0,
            updateDate: getDate(new Date()),
            updateText: '',
            parentKrId: krData.krId
        });
        setMode('new');
        $('#updateDate').datepicker('setDate', new Date());
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
        $('#updateDate').datepicker('setDate', new Date(update.updateDate));
        $('#editUpdateModal').modal('toggle');
    }
    
    // Back to Team Page
    function redirectBack() {
        return history.push('/' + team[0].slug);
    }

    function submitForm() {
        // Clear previous errors
        setFormErrors([]);

        // Extract mandatory form inputs
        const inputText = formData.updateText;
        const inputDate = formData.updateDate;

        var validDate = inputDate ? checkDate(inputDate) : false;
        
        if (inputText && inputDate && validDate){
            // Form ok
            var {updateId, ...newData} = formData;
            if (mode === 'edit') {
                putIBD('UpdatesStore', formData, () => {
                    getTeamUpdatesDataIBD(Number(params.id), sortAndSetUpdates);
                });
            } else if (mode === 'new') {
                putIBD('UpdatesStore', newData, () => {
                    getTeamUpdatesDataIBD(Number(params.id), sortAndSetUpdates);
                });
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
            deleteIBD('UpdatesStore', formData.updateId, () => {
                getTeamUpdatesDataIBD(Number(params.id), sortAndSetUpdates);
            });
            $('#editUpdateModal').modal('hide');
        };
    }

    return (
        <div>
            <h1 className="mb-2">Key Result Updates</h1>
            {krData.krTitle && <h2 className="mb-4">
                {krData.krTitle} - <span className="text-green">{krData.parentObjectiveTeam}</span>
            </h2>}
            <div className="mb-4">
                <button className="btn btn-blue mr-3" onClick={addUpdate}>Add Update</button>
                <button className="btn btn-secondary float-right" onClick={redirectBack}>Back to Team Page</button>
            </div>
            <div className="directory--container">
                {updateData.length > 0 && <UpdatesTable updateData={updateData} editUpdate={editUpdate} />}
                {updateData.length === 0 && <div className="text-center">
                    <span className="no-data">No data to display.</span>
                </div>}
            </div>
            <div className="modal fade" id="editUpdateModal" tabIndex="-1" aria-labelledby="editUpdateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editUpdateModalLabel">{mode === 'edit' ? 'Edit' : 'Add'} Update</h5>
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
                            <button type="button" className="btn btn-secondary mr-3" onClick={() => setFormErrors([])} data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-green mr-3" onClick={submitForm}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}