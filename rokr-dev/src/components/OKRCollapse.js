// OKR Collapse Component
//  - Card for objectives
//  - Row/card for key results
//  - Wrapper to put these into a Bootstrap collapse component

import { useState, useEffect } from "react";
import $ from "jquery";

import {
  CaretIcon,
  EditIconText,
  AddIconText,
  LaunchIcon,
} from "./Icons";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import { useHistory } from "react-router-dom";

function KeyResultRow(props) {
  const history = useHistory();

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
      parentObjectiveTeam: props.parentObjectiveTeam,
    });

    $("#kr-modal").modal("toggle");
  }
  
  // Function to launch Key Result edit modal
  const editKeyResult = mode => {
    $('#kr-edit-modal').modal('toggle');
  };

  function goToUpdates() {
    history.push("/edit/update/" + props.krId);
  }

  return (
    <div className="keyresult-row">
      <div className="row align-items-center">
        <div className="col-5">
          <div className="keyresult-row--title">{props.krTitle}</div>
        </div>
        <div className="col-2 text-center">
          <div className="keyresult-row--action-btn keyresult-row--edit-text mb-1" onClick={toggleModal}>
            View
          </div>
          <span className="keyresult-row--action-divider keyresult-row--edit-text ml-1 mr-1 mb-1"> | </span>
          <div className="keyresult-row--action-btn keyresult-row--edit-text" onClick={editKeyResult}>
            Edit
          </div>
          {/* <div className="keyresult-row--action-btn keyresult-row--edit-text" onClick={goToUpdates}>
            Updates
          </div> */}
        </div>
        {/* <div
          className="keyresult-row--updates text-center col-2"
          onClick={goToUpdates}
        >
          <span className="ml-1">Updates </span>
          <LaunchIcon className="keyresult-row--icon" />
        </div> */}
        <div className="text-center col-2">
          <span className="keyresult-row--text">{props.krEndDate}</span>
        </div>
        <div className="keyresult-row--progress-bar col-3">
          <ProgressBar progress={props.progress} isKeyResult={true} />
        </div>
      </div>
    </div>
  );
}

function ObjectiveCard(props) {
  var history = useHistory();

  // Function to launch Objective edit modal
  function editObjective() {
    props.setObjFormData({
      objectiveId: props.objectiveId,
      objectiveTitle: props.objectiveTitle,
      objectiveDescription: props.objectiveDescription,
      objectiveStartDate: props.objectiveStartDate,
      objectiveEndDate: props.objectiveEndDate,
      owner: props.owner,
      frequency: props.frequency,
      team: props.team,
    });
    $('#obj-edit-modal').modal('toggle');
    // return history.push("/edit/obj/" + props.objectiveId);
  }

  const addKR = () => {
    // Update state here - have to pass down from TeamOKRs
    $('#kr-edit-modal').modal('toggle');
    // return history.push(
    //   "/new/kr?team=" +
    //     props.team +
    //     "&frequency=" +
    //     props.frequency +
    //     "&parentObjectiveId=" +
    //     props.objectiveId
    // );
  }

  return (
    <div className="objective-card">
      <div className="row align-items-top mt-2">
        <div className="arrow-div">
          <button
            className={
              "btn btn-collapse text-center" +
              (props.isClicked ? " rotated" : "")
            }
            data-toggle="collapse"
            data-target={"#" + props.objId}
            type="button"
            aria-expanded="false"
            aria-controls={props.objId}
            id={"btn-" + props.objId}
          >
            <CaretIcon />
          </button>
        </div>
        <div className="col-7">
          <h5 className="objective-card--title text-left">
            <span className="mr-2">{props.objectiveTitle}</span>
          </h5>
          {props.isClicked && (
            <div className="kr-modal--description mb-3">
              {props.objectiveDescription}
            </div>
          )}
          {props.isClicked && (
            <button
              className="btn objective-card--edit-button mr-3"
              onClick={editObjective}
            >
              <span className="objective-card--edit-text mr-1">Edit</span>
              <EditIconText className="objective-card--edit-icon" />
            </button>
          )}

          {props.isClicked && (
            <button
              className="btn objective-card--add-kr-button"
              onClick={addKR}
            >
              <span className="objective-card--add-kr-text mr-1">Add KR</span>
              <AddIconText className="objective-card--edit-icon" />
            </button>
          )}
        </div>
        <div className="text-center col-2">
          <span className="objective-card--text">{props.objectiveEndDate}</span>
        </div>
        <div className="objective-card--progress-bar col-3">
          <ProgressBar progress={props.progress} isKeyResult={false} />
        </div>
      </div>
    </div>
  );
}

export default function OKRCollapse(props) {
  const [isClicked, setIsClicked] = useState(true);

  // Calculate objective progress
  var keyResults = [...props.keyResults];
  var objProgress = 0;
  for (var i = 0; i < keyResults.length; i++) {
    keyResults[i].progress =
      keyResults[i].currentValue / keyResults[i].maxValue;
    objProgress += keyResults[i].progress;
  }

  objProgress = objProgress / keyResults.length;

  // Create KR Cards
  const objId = "obj-" + props.objective.objectiveId;

  const keyResultRows = props.keyResults.map(item => {
    return (
      <KeyResultRow
        // key={item.krId}
        objId={objId}
        setKrData={props.setKrData}
        {...item}
      />
    );
  });

  useEffect(function () {
    $("#" + objId).on("show.bs.collapse", () => setIsClicked(true));
    $("#" + objId).on("hide.bs.collapse", () => setIsClicked(false));
  });

  return (
    <div className="mt-4">
      <ObjectiveCard
        isClicked={isClicked}
        objId={objId}
        progress={objProgress}
        setObjFormData={props.setObjFormData}
        {...props.objective}
      />
      <div className="okr collapse show" id={objId}>
        {keyResultRows}
      </div>
    </div>
  );
}
