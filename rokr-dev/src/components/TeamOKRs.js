import { useState } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import "datatables.net-bs4";
import "../dataTables.bootstrap4.min.css";

import KRModal from "./KRModal";
import ObjectiveForm2 from "./ObjectiveForm2";
import OKRCollapse from "./OKRCollapse";
import Modal from "./Modal";

// Simulated
import { getDate } from "../utils/queryData";
import { AddIconText } from "./Icons";
import KRForm2 from "./KRForm2";

export default function TeamOKRs(props) {
  const [krData, setKrData] = useState({});
  const [objFormData, setObjFormData] = useState({});
  // const [krFormData, setKrFormData] = useState({});

  function toggleOKRCards() {
    $(".okr.collapse").each(function () {
      var collapsible = $(this);
      collapsible.collapse("toggle");
    });

    $(".btn-collapse").each(function () {
      var caret = $(this);
      caret.toggleClass("rotated");
    });
  }

  var history = useHistory();

  // Function to initialise objective form and open modal
  function newObjective() {
    const freq = ["annual", "quarterly", "monthly"].includes(
      props.pageData.frequency
    )
      ? props.pageData.frequency
      : "monthly";

    setObjFormData({
      objectiveId: -1,
      objectiveTitle: "",
      objectiveDescription: "",
      objectiveStartDate: getDate(new Date()),
      objectiveEndDate: getDate(new Date()),
      owner: "",
      frequency: freq,
      team: props.team.teamName,
    });

    $("#obj-edit-modal").modal("toggle");
  }

  // Function to render Objective form in modal
  const renderObjForm = () => {
    return (
      <ObjectiveForm2
        teams={props.teams}
        objFormData={objFormData}
        teamName={props.team.teamName}
        refreshData={props.refreshData}
      />
    );
  };

  // Function to render Key Result form in modal
  const renderKrForm = () => {
    return (
      <KRForm2
        teams={props.teams}
        krData={krData}
        teamName={props.team.teamName}
        refreshData={props.refreshData}
        objectives={props.objectives}
      />
    );
  }
  // Prepare OKR Collapse cards
  const objectiveCardRows = props.pageData.data.objectives.map((item) => {
    var tempKRs = props.pageData.data.keyResults.filter(function (kr) {
      return kr.parentObjectiveId === item.objectiveId;
    });

    return (
      <OKRCollapse
        // key={item.objectiveId}
        objective={item}
        keyResults={tempKRs}
        setKrData={setKrData}
        setObjFormData={setObjFormData}
        latestUpdates={props.latestUpdates}
      />
    );
  });

  return (
    <div>
      <h3 className="mt-5">Objectives & Key Results</h3>
      <div className="mb-4 mt-3">
        <button className="btn btn-okr-toggle" onClick={toggleOKRCards}>
          Expand/Collapse
        </button>
        <div className="float-right">
          <button className="btn btn-green" onClick={newObjective}>
            <span className="mr-1">Add Objective</span>
            <AddIconText className="btn-okr-toggle-icon" />
          </button>
        </div>
      </div>
      {objectiveCardRows}
      <KRModal id="kr-modal" krData={krData} />
      <Modal
        modalId="obj-edit-modal"
        modalTitle="Objectives"
        renderModalContent={() => renderObjForm()}
      />
      <Modal
        modalId="kr-edit-modal"
        modalTitle="Key Results"
        renderModalContent={() => renderKrForm()}
      />
    </div>
  );
}
