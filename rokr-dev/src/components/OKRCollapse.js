// OKR Collapse Component
//  - Card for objectives
//  - Row/card for key results
//  - Wrapper to put these into a Bootstrap collapse component

import { useState, useEffect } from 'react';
import $ from 'jquery';

import ProgressBar from './ProgressBar';

function KeyResultRow(props) {
    return (
        <div className="keyresult-row">
            <div className="row align-items-center">
                <div className="col-5">
                    <span className="keyresult-row--title">
                        {props.title}
                        <button type="button" className="btn ml-3" data-toggle="modal" data-target={'#modal-keyresult'}>
                            <i className="fas fa-edit edit-icon"></i>
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
        $('input[name=objId').val(props.objectiveId);
        $('input[name=objTitle').val(props.title);
        $('textarea[name=objDescription').val(props.description);
    };

    return (
        
        <div className="objective-card">
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
                    <i className="fa-solid fa-caret-right collapse-icon"></i>
                </button>
            </div>
            <div className="row align-items-center mt-2">
                <div className="col-7">
                    <h5 className="objective-card--title text-left">
                        <span>{props.title}</span>
                        <button 
                            type="button"
                            className="btn btn-edit ml-2"
                            data-toggle="modal"
                            data-target={'#modal-objective'}
                            onClick={populateForm}
                        >
                            <i className="fas fa-edit edit-icon"></i>
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
    const [isClicked, setIsClicked] = useState(false);

    // Create KR Cards
    const objId = 'obj-' + props.objectiveId;

    const keyResultRows = props.keyResults.map(function(item) {
        return <KeyResultRow objId={objId} {...item} />
    });

    useEffect(function() {
        $('#' + objId).on('show.bs.collapse', () => setIsClicked(true));
        $('#' + objId).on('hide.bs.collapse', () => setIsClicked(false));
    });

    return (
        <div className="mt-4">
            <ObjectiveCard 
                isClicked={isClicked}
                objId={objId}
                {...props} />
            <div className="okr collapse" id={objId}>
                {keyResultRows}
            </div>
        </div>
    );
};