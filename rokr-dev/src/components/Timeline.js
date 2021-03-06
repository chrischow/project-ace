import { useState, useEffect } from 'react';
import { editIconString } from './Icons';
import $ from 'jquery';


// Simulated
import { getAllIDB, getTeamKeyResultDataIBD } from '../utils/queryData';
import { allData } from '../utils/fakeData';

export default function TimelinePage() {

    // Initialise state for Key Results
    const [objectiveData, setObjectiveData] = useState([]);
    const [krData, setKrData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const [combinedData, setCombinedData] = useState([]);

    // DataTable settings
    const dataTableSettings = {
      autoWidth: false,
      pageLength: 25,
      displayStart: 0,
      lengthMenu: [10, 25, 50, 75, 100],
      order: [
        [0, 'desc'],
        [1, 'asc'],
        [2, 'asc'],
      ],
      fixedColumns: true,
      columnDefs: [
        {width: '15%', name: 'date', targets: 0, data: 'updateDate', className: "text-center"},
        {width: '25%', name: 'date', targets: 1, data: 'objectiveTitle'},
        {width: '25%', name: 'date', targets: 2, data: 'krTitle'},
        { width: '35%', name: 'text', targets: 3, data: 'updateText',
          className: "directory--table-text-sm", sortable: false},
        {width: '0%', name: 'id', targets: 4, data: 'updateId', visible: false},
        {width: '0%', name: 'parentKrId', targets: 5, data: 'parentKrId', visible: false},
      ]
    };

    // Run once - query KRs
    useEffect( () => {
        // Query data - SWAP FUNCTION HERE
        getAllIDB('ObjectivesStore', setObjectiveData);
        getAllIDB('KeyResultsStore', setKrData);
        getAllIDB('UpdatesStore', setUpdateData);
        // getKRData(krListId, 'all', setKrData);
    }, []);

    // Combine data
    useEffect( () => {
      if (updateData.length > 0 && krData.length > 0 && objectiveData.length > 0) {
        // Extract all related OKRs
        const allOkrs = updateData.map(item => {
          // Get associated key result
          const keyResult = krData.filter(krItem => {
            return krItem.krId === item.parentKrId;
          })[0];

          // Get associated objective
          const objective = objectiveData.filter(objectiveItem => {
            return objectiveItem.objectiveId === keyResult.parentObjectiveId;
          })[0];

          // Put update data
          return {
            ...item,
            krTitle: keyResult.krTitle,
            objectiveTitle: objective.objectiveTitle,
          };
        });
        
        setCombinedData(allOkrs);
      }
    }, [objectiveData, krData, updateData] );

    // Create table when all OKRs are merged
    useEffect(function() {
      
        if (combinedData.length > 0){
          $(function() {
            // Render datatable
            const table = $('#updates-table');
            if (! $.fn.dataTable.isDataTable( '#updates-table' )) {
              table.DataTable(dataTableSettings);
              table.DataTable().rows.add(combinedData).draw();
            } else {
              table.DataTable().clear();
              table.DataTable().rows.add(combinedData).draw();
            }
            
            // Link function
            $('#updates-table tbody').prop('onclick', 'span').off('click')
            $('#updates-table tbody').on('click', 'span', function() {
              var data = table.DataTable().row($(this).parents('tr')).data();
              // props.editUpdate(data);
            });
          });
        }
    
    }, [combinedData]);
    
    return (
        <div>
            <h1 className="mb-4">Updates Timeline</h1>
            <div className="directory--container">
                {updateData.length > 0 && <table className="table table-dark table-striped directory--table w-100" id="updates-table">
                  <thead>
                    <tr>
                      <th className="text-center">Date</th>
                      <th className="text-center">Objective</th>
                      <th className="text-center">Key Result</th>
                      <th className="text-center">Description</th>
                    </tr>
                  </thead>
                  <tbody className="align-items-center">
                  </tbody>
                </table>}
                {updateData.length === 0 && <div className="text-center">
                    <span className="no-data">No data to display.</span>
                </div>}
            </div>
        </div>
    );
}

