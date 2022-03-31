import React from 'react';
import $ from 'jquery';

import ProgressCard from './ProgressCard';
import OKRCollapse from './OKRCollapse';
import { ObjectiveForm } from './Forms'
import updateCircleProgress from '../utils/updateCircleProgress';
import { prepareTeamData } from '../utils/processData';

// Simulated
import { allData } from '../fakeData';

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

function DetailModal(props) {
    const typeTitle = props.type === 'objective' ? 'Objective' : 'Key Result';
    const [formData, setFormData] = React.useState({...props.objFormData});
    const [isEditMode, setIsEditMode] = React.useState(false);

    React.useEffect(function() {
        setFormData({...props.objFormData});
    }, [props.objFormData]);

    function toggleEdit(event) {
        setIsEditMode(prev => !prev);
        $('.form-element').each(function() {
            var elem = $(this);
            elem.toggleClass('form-element-open');
        });
    };

    function closeForm(event) {
        $('#modal-' + props.type).modal('hide');
        $('input[type="checkbox"]')[0].checked = false;
        setIsEditMode(false);
        $('.form-element').each(function() {
            var elem = $(this);
            elem.removeClass('form-element-open');
        });
    };

    function submitData(){
        closeForm();
        console.log('Submitting data:');
        console.log(formData);
    }

    // Define form
    var form;
    if (props.type === 'objective') {
        form = <ObjectiveForm
            isEditMode={isEditMode}
            setFormData={setFormData}
            type={props.type}
            formData={props.okrFormData}
            teams={props.teams}
        />;
    } else {
        form = 'hello';
    }

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
                        {form}
                        
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
    // Intermediary state to transfer data between OKRCollapse and DetailModal
    const [objFormData, setObjFormData] = React.useState({
        objId: 0,
        objTitle: "",
        objDescription: "",
        objStartDate: "",
        objEndDate: "",
        objTeam: "",
        objCategory: ""
    });

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

        return (
            <OKRCollapse 
                objective={item}
                keyResults={tempKRs}
                populateObjForm={setObjFormData}
            />
        );
    });

    return (
        <div>
            <h3 className="mt-5">Objectives & Key Results</h3>
            <button className="btn btn-okr-toggle mt-2 mb-3" onClick={toggleOKRCards}>
                Expand/Collapse
            </button>
            {objectiveCardRows}
            <DetailModal
                type="objective"
                teams={props.teams}
                okrFormData={objFormData}
            />
            {/* <DetailModal
                type="keyResult"
                teams={props.teams}
                okrFormData={krFormData}
            /> */}
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
