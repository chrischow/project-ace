import React from 'react';
import $ from 'jquery';

import ProgressCard from './ProgressCard';
import OKRCollapse from './OKRCollapse';
import { EditIcon } from './Icons';
import updateCircleProgress from '../utils/updateCircleProgress';
import { prepareTeamData, formatDate } from '../utils/processData';
import { Link } from 'react-router-dom';
import 'datatables.net-bs4';
import '../dataTables.bootstrap4.min.css';

// Simulated
import { allData } from '../utils/fakeData';

// const $ = require('jquery');
$.DataTable = require('datatables.net');

function FrequencyTabs(props) {
    return (
        <div className="mt-4">
            <ul className="nav nav-pills justify-content-center" role="tablist">
                <li className="nav-item">
                    <a
                        className="nav-link frequency-tabs--link active"
                        data-toggle="tab"
                        role="tab"
                        aria-selected="true"
                        aria-controls="annual"
                        href="#team-annual"
                        onClick={() => props.changeFrequency('annual')}
                    >
                            Annual
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link frequency-tabs--link"
                        data-toggle="tab"
                        role="tab"
                        aria-selected="false"
                        aria-controls="quarterly"
                        href="#team-quarterly"
                        onClick={() => props.changeFrequency('quarterly')}
                    >
                            Quarterly
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link frequency-tabs--link"
                        data-toggle="tab"
                        role="tab"
                        aria-selected="false"
                        aria-controls="monthly"
                        href="#team-monthly"
                        onClick={() => props.changeFrequency('monthly')}
                    >
                            Monthly
                    </a>
                </li>
            </ul>
        </div>
    );
}

function KRModal(props) {
    const startDate = formatDate(props.krData.krStartDate);
    const endDate = formatDate(props.krData.krEndDate);
    
    // Query update data
    var updateData = allData.updates.filter(function(update) {
        return update.parentKrId == props.krData.krId;
    });
    
    updateData = updateData.map(function(item) {
        return {
            updateDate: item.updateDate,
            updateText: item.updateText
        };
    });

    const updates = updateData.map(function(data) {
        return (
            <tr>
                <td className="text-center">{data.updateDate}</td>
                <td>{data.updateText}</td>
            </tr>
        );
    });

    const table = $('#kr-modal-table');
    $(function() {
        if (! $.fn.dataTable.isDataTable( '#kr-modal-table' )) {
            table.DataTable().destroy();
            table.DataTable({
                autoWidth: false,
                pageLength: 5,
                displayStart: 0,
                lengthMenu: [5, 10, 25, 50],
                order: [[0, 'desc']],
                fixedColumns: true,
                columnDefs: [
                    {width: '18%', name: 'updateDate', targets: 0, data: 'updateDate', className: 'text-center'},
                    {width: '82%', name: 'updateText', targets: 1, data: 'updateText'},
                ]
            });
        } else {
            
            table.DataTable().clear();
            table.DataTable().rows.add(updateData).draw();
        }
    });

    // React.useEffect(function() {
    // });

    // Revert to table page
    function resetTableView() {
        $('#kr-modal-table').DataTable().page(0).draw(true);
    }

    return (
        <div className="modal fade" id={'kr-modal'} tabIndex="-1" role="dialog" aria-labelledby={'kr-modal-label'} aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={'kr-modal-label'}>{props.krData.parentObjectiveTeam} Key Result</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="kr-modal--panel">
                            <div className="row align-items-center">
                                <div className="col-9 kr-modal--main-col">
                                    <h3>
                                        <span className="mr-3 kr-modal--title">{props.krData.krTitle}</span>
                                        <EditIcon />
                                    </h3>
                                    <div className="kr-modal--subheader">{startDate} - {endDate}</div>
                                    <div className="kr-modal--description">{props.krData.krDescription}</div>
                                </div>
                                <div className="col-3 pl-4 text-center">
                                    <div className="row align-items-center justify-content-center">
                                        <span className="progress-card--metric-sm">{props.krData.currentValue}</span>
                                        <span className="pl-3 pr-3 progress-card--metric-between-sm">/</span>
                                        <span className="progress-card--metric-sm">{props.krData.maxValue}</span>
                                    </div>
                                    <div className="col-12 text-center">
                                        <span className='progress-card--metric-title-sm'>Completed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="kr-modal--update-panel">
                            <h3 className="kr-modal--tag-text mb-4">Updates</h3>
                            <table className="table table-dark kr-modal--table w-100" id="kr-modal-table">
                                <thead>
                                    <tr>
                                        <th className="text-center">Date</th>
                                        <th className="text-center">Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={resetTableView}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function TeamProgress(props) {
    return (
        <div>
            <h3 className="mt-4">Team Progress</h3>
            <div className="overall-panel mt-4">
                <ProgressCard progressId="team-progress" data={props.progressData} isTeam={false} />
            </div>
        </div>
    );
}

export function TeamOKRs(props) {
    const [krData, setKrData] = React.useState({});

    function toggleOKRCards() {
        $('.okr.collapse').each(function() {
            var collapsible = $(this);
            collapsible.collapse('toggle');
        });
    
        $('.btn-collapse').each(function() {
            var caret = $(this);
            caret.toggleClass('rotated');
        })
    }

    const objectiveCardRows = props.pageData.data.objectives.map((item) => {
        var tempKRs = props.pageData.data.keyResults.filter(function(kr) {
            return kr.parentObjectiveId === item.objectiveId;
        });

        return <OKRCollapse objective={item} keyResults={tempKRs} setKrData={setKrData} />;
    });

    return (
        <div>
            <h3 className="mt-5">Objectives & Key Results</h3>
            <button className="btn btn-okr-toggle mt-2 mb-3" onClick={toggleOKRCards}>
                Expand/Collapse
            </button>
            {objectiveCardRows}
            <KRModal id="kr-modal" krData={krData} />
        </div>
    );
}

export default function TeamPage(props) {
    
    // Query data - simulated
    const allObjectives = allData.objectives;
    const allKeyResults = allData.keyResults;

    // Process data
    const teamProgressData = prepareTeamData(props.team.teamName, allObjectives, allKeyResults);
    
    // Set state
    const [pageData, setPageData] = React.useState({
        frequency: 'annual',
        data: teamProgressData['annual'],
    });

    function changeFrequency(frequency) {
        setPageData({
            ...pageData,
            frequency: frequency,
            data: teamProgressData[frequency]
        });
        const avgCompletion = teamProgressData[frequency].avgCompletion;
        $('#team-progress').circleProgress('value', avgCompletion ? avgCompletion : 0.0);
    }

    React.useEffect(function() {
        const avgCompletion = pageData.data.avgCompletion;
        updateCircleProgress('team-progress', avgCompletion ? avgCompletion : 0, 200, '50px', '#000718');
    });
    
    const progressData = {
        objectiveCompletion: pageData.data.objectiveCompletion,
        keyResultCompletion: pageData.data.keyResultCompletion
    };

    return (
        <div>
            <h1 className="mb-3">{props.team.teamName}</h1>
            <FrequencyTabs changeFrequency={changeFrequency} />
            <TeamProgress progressData={progressData} />
            <TeamOKRs 
                pageData={pageData}
                teams={props.teams}
            />
        </div>
    );
}
