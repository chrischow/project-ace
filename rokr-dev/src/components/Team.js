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
    // const typeTitle = props.type === 'objective' ? 'Objective' : 'Key Result';

    return <ObjectiveForm teams={props.teams} formData={props.formData} type={props.type} />;
    
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
    
    // Intermediary state to transfer data from OKRCollapse up to TeamPageBody
    // and down to DetailModal
    const [objFormData, setObjFormData] = React.useState({
        objId: 0,
        objTitle: "",
        objDescription: "",
        objStartDate: "",
        objEndDate: "",
        objTeam: "",
        objCategory: ""
    });

    function changeFrequency(frequency) {
        setPageData({
            ...pageData,
            frequency: frequency,
            data: teamProgressData[frequency]
        });
        
        $('#team-progress').circleProgress('value', teamProgressData[frequency].avgCompletion);
    }

    React.useEffect(function() {

        updateCircleProgress('team-progress', pageData.data.avgCompletion, 200, '50px', '#000718');
    });
    
    const progressData = {
        objectiveCompletion: pageData.data.objectiveCompletion,
        keyResultCompletion: pageData.data.keyResultCompletion
    };

    const objectiveCardRows = pageData.data.objectives.map((item) => {
        var tempKRs = pageData.data.keyResults.filter(function(kr) {
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
            <h1 className="mb-3">{props.team.teamName}</h1>
            <FrequencyTabs changeFrequency={changeFrequency} />
            <h3 className="mt-4">Team Progress</h3>
            <div className="overall-panel mt-4">
                <ProgressCard progressId="team-progress" data={progressData} isTeam={false} />
            </div>
            <h3 className="mt-5">Objectives & Key Results</h3>
            <button className="btn btn-okr-toggle mt-2 mb-3" onClick={toggleOKRCards}>
                Expand/Collapse
            </button>
            {objectiveCardRows}
            <DetailModal type="objective" title="Objective" teams={props.teams} formData={objFormData} />
            {/* <DetailModal type="keyresult" title="Key Result" /> */}
        </div>
    );
}
