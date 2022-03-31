// OKR Collapse Component
//  - Card for objectives
//  - Row/card for key results
//  - Wrapper to put these into a Bootstrap collapse component

import React from 'react';
import $ from 'jquery';

import EditIcon from './EditIcon';
import CaretIcon from './CaretIcon';
import ProgressBar from './ProgressBar';

function KeyResultRow(props) {
    
    return (
        <div className="keyresult-row">
            <div className="row align-items-center">
                <div className="col-5">
                    <span className="keyresult-row--title">
                        {props.krTitle}
                        <button
                            type="button"
                            className="btn btn-edit ml-3"
                            data-toggle="modal"
                            data-target={'#modal-keyresult'}
                        >
                            <EditIcon />
                        </button>
                    </span>
                </div>
                <div className="text-center col-2">
                    <span className="keyresult-row--text ">Owner</span>
                </div>
                <div className="text-center col-2">
                    <span className="keyresult-row--text">31 Mar 2023</span>
                </div>
                <div className="keyresult-row--progress-bar col-3">
                    <ProgressBar progress={props.progress} isKeyResult={true} />
                </div>
            </div>
        </div>
    );
};

function ObjectiveCard(props) {
    
    function populateForm(){
        props.populateObjForm({
            objId: props.objectiveId,
            objTitle: props.objectiveTitle,
            objDescription: props.objectiveDescription,
            objStartDate: props.objectiveStartDate,
            objEndDate: props.objectiveEndDate,
            objTeam: props.team
        });
    };

    return (
        
        <div className="objective-card">
            <div className="row align-items-center mt-2">
                <div className="arrow-div">
                    <button
                        className={"btn btn-collapse text-center" + (props.isClicked ? " rotated" : "")}
                        data-toggle="collapse"
                        data-target={'#' + props.objId}
                        type="button"
                        aria-expanded="false"
                        aria-controls={props.objId}
                        id={'btn-' + props.objId}
                    >
                        <CaretIcon />
                    </button>
                </div>
                <div className="col-7">
                    <h5 className="objective-card--title text-left">
                        <span>{props.objectiveTitle}</span>
                        <button 
                            type="button"
                            className="btn btn-edit ml-2"
                            data-toggle="modal"
                            data-target={'#modal-objective'}
                            onClick={populateForm}
                        >
                            <EditIcon />
                        </button>
                    </h5>
                </div>
                <div className="text-center col-2">
                    <span className="objective-card--text">31 Mar 2023</span>
                </div>
                <div className="objective-card--progress-bar col-3">
                    <ProgressBar progress={props.progress} isKeyResult={false} />
                </div>
            </div>
        </div>
    );
};


export default function OKRCollapse(props) {
    const [isClicked, setIsClicked] = React.useState(false);

    // Calculate objective progress
    var keyResults = [...props.keyResults];
    var objProgress = 0;
    for (var i=0; i < keyResults.length; i++) {
        keyResults[i].progress = keyResults[i].currentValue / keyResults[i].maxValue;
        objProgress += keyResults[i].progress;
    }

    objProgress = objProgress / keyResults.length;

    // Create KR Cards
    const objId = 'obj-' + props.objective.objectiveId;
    
    const keyResultRows = props.keyResults.map(function(item) {
        return (
            <KeyResultRow
                objId={objId}
                {...item}
            />
        );
    });

    React.useEffect(function() {
        $('#' + objId).on('show.bs.collapse', () => setIsClicked(true));
        $('#' + objId).on('hide.bs.collapse', () => setIsClicked(false));
    });

    return (
        <div className="mt-4">
            <ObjectiveCard 
                isClicked={isClicked}
                objId={objId}
                progress={objProgress}
                populateObjForm={props.populateObjForm}
                {...props.objective} />
            <div className="okr collapse" id={objId}>
                {keyResultRows}
            </div>
        </div>
    );
};