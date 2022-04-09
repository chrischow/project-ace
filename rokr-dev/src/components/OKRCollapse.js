// OKR Collapse Component
//  - Card for objectives
//  - Row/card for key results
//  - Wrapper to put these into a Bootstrap collapse component

import React from 'react';
import $ from 'jquery';

import { CaretIcon, EditIcon, InfoIcon } from './Icons';
import ProgressBar from './ProgressBar';
import { useHistory } from 'react-router-dom';

function KeyResultRow(props) {
    
    function toggleModal() {
        props.setKrData({
            krTitle: props.krTitle,
            krDescription: props.krDescription,
            krStartDate: props.krStartDate,
            krEndDate: props.krEndDate,
            minValue: props.minValue,
            maxValue: props.maxValue,
            currentValue: props.currentValue,
            krId: props.krId,
            owner: props.owner,
            parentObjectiveId: props.parentObjectiveId,
            parentObjectiveTeam: props.parentObjectiveTeam
        });

        $('#kr-modal').modal('toggle');
    }

    return (
        <div className="keyresult-row">
            <div className="row align-items-center">
                <div className="col-5 keyresult-row--info-link" onClick={toggleModal}>
                    <span className="keyresult-row--title">
                        {props.krTitle}
                    </span>
                    <InfoIcon />
                </div>
                <div className="text-center col-2">
                    <span className="keyresult-row--text ">{props.owner}</span>
                </div>
                <div className="text-center col-2">
                    <span className="keyresult-row--text">{props.krEndDate}</span>
                </div>
                <div className="keyresult-row--progress-bar col-3">
                    <ProgressBar progress={props.progress} isKeyResult={true} />
                </div>
            </div>
        </div>
    );
};

function ObjectiveCard(props) {

    var history = useHistory();
    function editObjective() {
        return history.push('/edit/obj/' + props.objectiveId);
    }

    return (
        
        <div className="objective-card">
            <div className="row align-items-top mt-2">
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
                        <span className="mr-3">{props.objectiveTitle}</span>
                        {
                            props.isClicked && 
                            <div style={{display: 'inline-block', cursor: 'pointer'}} onClick={editObjective}>
                                <EditIcon />
                            </div>
                        }
                    </h5>
                    {props.isClicked && <div className="kr-modal--description">{props.objectiveDescription}</div>}
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
    const [isClicked, setIsClicked] = React.useState(true);

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
                key={item.krId}
                objId={objId}
                setKrData={props.setKrData}
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
                {...props.objective}
            />
            <div className="okr collapse show" id={objId}>
                {keyResultRows}
            </div>
        </div>
    );
};