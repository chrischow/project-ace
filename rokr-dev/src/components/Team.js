import React from 'react';
import $ from 'jquery';

import ProgressCard from './ProgressCard';
import OKRCollapse from './OKRCollapse';
import { EditIcon } from './Icons';
import updateCircleProgress from '../utils/updateCircleProgress';
import { prepareTeamData, formatDate } from '../utils/processData';
import { useHistory } from 'react-router-dom';
import 'datatables.net-bs4';
import '../dataTables.bootstrap4.min.css';

// Simulated
import { allData } from '../utils/fakeData';
import { getTeamObjectiveDataIBD, getTeamKeyResultDataIBD } from '../utils/queryData';

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
        return update.parentKrId === props.krData.krId;
    });
    
    updateData = updateData.map(function(item) {
        return {
            updateDate: item.updateDate,
            updateText: item.updateText
        };
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

            table.DataTable().rows.add(updateData).draw();
        } else {
            
            table.DataTable().clear();
            table.DataTable().rows.add(updateData).draw();
        }
    });

    // Revert to table page
    function resetTableView() {
        table.DataTable().page.len(5).draw(true);
        table.DataTable().page(0);
    }
    
    const history = useHistory();
    function editKR() {
        $('#kr-modal').modal('hide');
        return history.push('/edit/kr/' + props.krData.krId);
    }

    function editUpdate() {
        $('#kr-modal').modal('hide');
        return history.push('/edit/update/' + props.krData.krId);
    }

    return (
        <div className="modal fade" id='kr-modal' tabIndex="-1" role="dialog" aria-labelledby={'kr-modal-label'} aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
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
                                        <span className="mr-3 text-green">{props.krData.krTitle}</span>
                                        <div style={{display: 'inline-block', cursor: 'pointer', transition: "0.3s"}} onClick={editKR}>
                                            <EditIcon />
                                        </div>
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
                            <h3 className="kr-modal--tag-text mb-3">
                                <span className="mr-3">Updates</span>
                                <div style={{display: 'inline-block', cursor: 'pointer', transition: "0.3s"}} onClick={editUpdate}>
                                    <EditIcon />
                                </div>
                            </h3>
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
    
    var history = useHistory();
    function newObjective() {
        return history.push('/new/obj?team=' + props.team.teamName + '&frequency=' + props.pageData.frequency);
    }

    function newKeyResult() {
        return history.push('/new/kr?team=' + props.team.teamName + '&frequency=' + props.pageData.frequency);
    }

    const objectiveCardRows = props.pageData.data.objectives.map((item) => {
        var tempKRs = props.pageData.data.keyResults.filter(function(kr) {
            return kr.parentObjectiveId === item.objectiveId;
        });

        return <OKRCollapse key={item.objectiveId} objective={item} keyResults={tempKRs} setKrData={setKrData} />;
    });

    return (
        <div>
            <h3 className="mt-5">Objectives & Key Results</h3>
            <div className="mb-4 mt-3">
                <button className="btn btn-okr-toggle mr-3" onClick={toggleOKRCards}>
                    Expand/Collapse
                </button>
                <div className="float-right">
                    <button className="btn btn-green mr-3" onClick={newObjective}>
                        Add Objective
                    </button>
                    <button className="btn btn-green mr-3" onClick={newKeyResult}>
                        Add Key Result
                    </button>
                </div>
            </div>
            {objectiveCardRows}
            <KRModal id="kr-modal" krData={krData} />
        </div>
    );
}

export default function TeamPage(props) {

    // Initialise states for raw team data and processed data
    const [teamData, setTeamData] = React.useState({});
    const [processedData, setProcessedData] = React.useState({});
    const [pageData, setPageData] = React.useState({});
    const [progressData, setProgressData] = React.useState({});
    
    // Callback functions to update respective items in raw data state
    // To be passed to async query to database
    function updateObjectives(data) {
        setTeamData(prevData => {return {...prevData, allObjectives: data}});
    }

    function updateKeyResults(data) {
        setTeamData(prevData => {return {...prevData, allKeyResults: data}});
    }

    // Run once - to trigger query
    React.useEffect(function() {
        // Query data - simulated
        getTeamObjectiveDataIBD(props.team.teamName, updateObjectives);
        getTeamKeyResultDataIBD(props.team.teamName, updateKeyResults);
    }, []);

    // Processes data and updates page data every time there is a change to the 
    // raw data state
    React.useEffect(function() {
        if (teamData.allObjectives && teamData.allKeyResults) {
            const teamProgressData = prepareTeamData(
                props.team.teamName,
                teamData.allObjectives,
                teamData.allKeyResults
            );

            setProcessedData(prevData => {
                return {
                    ...prevData,
                    teamProgressData: teamProgressData
                };
            });
            
            setPageData({
                frequency: 'annual',
                data: teamProgressData['annual']
            });
        }
    }, [teamData])

    // Computes progress metrics for progress card every time the frequency changes
    React.useEffect(function() {
        if (pageData.data) {
            setProgressData({
                objectiveCompletion: pageData.data.objectiveCompletion,
                keyResultCompletion: pageData.data.keyResultCompletion
            });
        }
    }, [pageData]);

    // Initialise circle progress the moment progressData changes
    React.useEffect(function() {
        if (pageData.data) {
            const avgCompletion = pageData.data.avgCompletion;
            updateCircleProgress('team-progress', avgCompletion ? avgCompletion : 0, 200, '50px', '#000718');
        }
    }, [progressData]);

    function changeFrequency(frequency) {
        setPageData({
            ...pageData,
            frequency: frequency,
            data: processedData.teamProgressData[frequency]
        });
        const avgCompletion = processedData.teamProgressData[frequency].avgCompletion;
        $('#team-progress').circleProgress('value', avgCompletion ? avgCompletion : 0.0);
    }

    return (
        <div>
            <h1 className="mb-3">{props.team.teamName}</h1>
            <FrequencyTabs changeFrequency={changeFrequency} />
            {progressData.objectiveCompletion && <TeamProgress progressData={progressData} />}
            {pageData.data && <TeamOKRs 
                pageData={pageData}
                teams={props.teams}
                team={props.team}
            />}
        </div>
    );
}
