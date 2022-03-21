import { useState, useEffect } from 'react';
import $ from 'jquery';

import ProgressCard from './ProgressCard';
import OKRCollapse from './OKRCollapse';
import { ObjectiveForm } from './Forms'
import updateCircleProgress from '../utils/updateCircleProgress';

import { teamData } from '../fakeData';

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

function DetailModal(props) {
    const typeTitle = props.type === 'objective' ? 'Objective' : 'Key Result';

    return (
        <div className="modal fade" id={'modal-' + props.type} tabIndex="-1" role="dialog" aria-labelledby={'modal-' + props.type + '-label'} aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id={'modal-' + props.type + '-label'}>{typeTitle} Details</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {props.form}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-blue">Save changes</button>
                </div>
                </div>
            </div>
        </div>
    );
}

function TeamPageBody(props) {
    const [pageData, setPageData] = useState({
            frequency: 'annual',
            data: props.teamData['annual'],
            modalObjective: {},
            modalKeyResult: {},
        });
    
    function handleModalObjective(objectiveData) {
        setPageData({
            ...pageData,
            modalObjective: objectiveData
        })
    }

    function handleModalKeyResult(keyResultData) {
        setPageData({
            ...pageData,
            modalObjective: keyResultData
        })
    }

    function changeFrequency(frequency) {
        setPageData({
            ...pageData,
            frequency: frequency,
            data: props.teamData[frequency]
        });
        
        $('#team-progress').circleProgress('value', props.teamData[frequency].avgCompletion);
    }

    useEffect(function() {
        updateCircleProgress('team-progress', pageData.data.avgCompletion, 200, '50px', '#000718');
    });

    const progressData = {
        objectiveCompletion: pageData.data.objectiveCompletion,
        keyResultCompletion: pageData.data.keyResultCompletion
    };

    const objectiveCardRows = pageData.data.okrs.map((item) => {
        return (
            <OKRCollapse 
                {...item}
                handleModalObjective={handleModalObjective}
                handleModalKeyResult={handleModalKeyResult}
            />
        );
    });

    return (
        <div>
            <FrequencyTabs changeFrequency={changeFrequency} />
            <h3 className="mt-4">Team Progress</h3>
            <div className="overall-panel mt-4">
                <ProgressCard progressId="team-progress" data={progressData} isTeam={false} />
            </div>
            <h3 className="mt-5">Objectives & Key Results</h3>
            <button className="btn btn-okr-toggle mt-2 mb-3" onClick={toggleOKRCards}>Expand/Collapse</button>
            {objectiveCardRows}
            <DetailModal type="objective" title="Objective" form={<ObjectiveForm />} />
            <DetailModal type="keyresult" title="Key Result" />
        </div>
    );
}

export default function TeamPage(props) {
    return (
        <div>
            <h1 className="mb-3">{props.team.teamName}</h1>
            <TeamPageBody teamData={teamData} />
        </div>
    );
};
