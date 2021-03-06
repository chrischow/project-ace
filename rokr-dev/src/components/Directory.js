import { useState, useEffect } from 'react';
import $ from 'jquery';


// Simulated
import { getAllIDB, getTeamKeyResultDataIBD } from '../utils/queryData';
import { allData } from '../utils/fakeData';

export default function DirectoryPage() {

    // Initialise state for Key Results
    const [krData, setKrData] = useState([]);

    // Run once - query KRs
    useEffect(function() {
        // Query data - SWAP FUNCTION HERE
        getAllIDB('KeyResultsStore', setKrData);
        // getTeamKeyResultDataIBD(krListId, 'all', setKrData);
    }, []);

    // Create table when Key Results are updated
    useEffect(function() {
        if (krData.length > 0){
            // Query update data
            var krRows = krData.map(function(kr) {
                return {
                    title: kr.krTitle,
                    description: kr.krDescription,
                    team: kr.parentObjectiveTeam,
                    due: kr.krEndDate,
                    progress: (100 * Number(kr.currentValue) / Number(kr.maxValue)).toFixed(0) + '%'
                };
            });

            const table = $('#directory-table');
            $(function() {
                if (! $.fn.dataTable.isDataTable( '#directory-table' )) {
                    table.DataTable({
                        autoWidth: false,
                        pageLength: 25,
                        displayStart: 0,
                        lengthMenu: [10, 25, 50, 75, 100],
                        order: [
                            [3, 'asc'],
                            [4, 'asc'],
                        ],
                        fixedColumns: true,
                        columnDefs: [
                            {width: '25%', name: 'title', targets: 0, data: 'title', className: "directory--table-text-sm"},
                            {width: '35%', name: 'description', targets: 1, data: 'description', className: "directory--table-text-sm"},
                            // {width: '13%', name: 'owner', targets: 2, data: 'owner', className: 'text-center'},
                            {width: '10%', name: 'team', targets: 2, data: 'team', className: 'text-center'},
                            {width: '12%', name: 'due', targets: 3, data: 'due', className: 'text-center'},
                            {width: '10%', name: 'progress', targets: 4, data: 'progress', className: 'text-center'},
                        ]
                    });
        
                    table.DataTable().rows.add(krRows).draw();
                } else {
                    table.DataTable().clear();
                    table.DataTable().rows.add(krRows).draw();
                }
            });
        }
    
    });
    

    return (
        <div>
            <h1 className="mb-2">Key Results Directory</h1>
            <p className="directory--text mb-5">Find others with compatible KRs to collaborate with.</p>
            <div className="directory--container">
                {krData.length > 0 && <table className="table table-dark directory--table w-100" id="directory-table">
                    <thead>
                        <tr>
                            <th className="text-center">Title</th>
                            <th className="text-center">Description</th>
                            {/* <th className="text-center">Owner</th> */}
                            <th className="text-center">Team</th>
                            <th className="text-center">Due</th>
                            <th className="text-center">Progress</th>
                        </tr>
                    </thead>
                    <tbody className="align-items-center">
                    </tbody>
                </table>}
                {krData.length === 0 && <div className="text-center">
                    <span className="no-data">No data to display.</span>
                </div>}
            </div>
        </div>
    );
}

