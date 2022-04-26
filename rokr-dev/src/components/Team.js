import { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-bs4";
import "../dataTables.bootstrap4.min.css";
import ProgressCard from "./ProgressCard";
import { FrequencyTabs, TeamMemberTabs } from './Tabs';
import TeamOKRs from './TeamOKRs';
import updateCircleProgress from "../utils/updateCircleProgress";
import { prepareTeamData, sortStringArray } from "../utils/processData";

// Simulated
import {
  getTeamObjectiveDataIBD,
  getTeamKeyResultDataIBD,
} from "../utils/queryData";

function TeamProgress(props) {
  const entity =
    props.frequency !== "annual" && props.frequency !== "quarterly"
      ? "Individual"
      : "Team";
  return (
    <div>
      <h3 className="mt-4">{entity} Progress</h3>
      <div className="overall-panel mt-4">
        <ProgressCard
          progressId="team-progress"
          data={props.progressData}
          isTeam={false}
        />
      </div>
    </div>
  );
}

export default function TeamPage(props) {
  // Initialise states for raw team data and processed data
  const [teamData, setTeamData] = useState({});
  const [processedData, setProcessedData] = useState({});
  const [pageData, setPageData] = useState({});
  const [staffList, setStaffList] = useState([]);

  // Callback functions to update respective items in raw data state
  // To be passed to async query to database
  const updateObjectives = (data) => {
    // Sort data
    var dataSorted = data.sort((a, b) => {
      return a.objectiveTitle > b.objectiveTitle
        ? 1
        : a.objectiveTitle < b.objectiveTitle
        ? -1
        : 0;
    });
    
    setTeamData((prevData) => {
      return { ...prevData, allObjectives: dataSorted };
    });
  };

  const updateKeyResults = (data) => {
    // Sort data
    var dataSorted = data.sort((a, b) => {
      return a.krTitle > b.krTitle ? 1 : a.krTitle < b.krTitle ? -1 : 0;
    });

    setTeamData((prevData) => {
      return { ...prevData, allKeyResults: dataSorted };
    });
  };

  const refreshData = () => {
    getTeamObjectiveDataIBD(props.team.teamName, updateObjectives);
    getTeamKeyResultDataIBD(props.team.teamName, updateKeyResults);
    // getObjectiveData(objListId, props.team.teamName, updateObjectives);
    // getKRData(krListId, props.team.teamName, updateKeyResults);
  };

  // Run once - to trigger query
  useEffect(
    function () {
      // Query data - simulated
      refreshData();
    },
    [props.team.teamName]
  );

  // Processes data and updates page data every time there is a change to the
  // raw data state
  useEffect(
    function () {
      if (teamData.allObjectives && teamData.allKeyResults) {
        const teamProgressData = prepareTeamData(
          teamData.allObjectives,
          teamData.allKeyResults
        );

        setProcessedData((prevData) => {
          return { ...prevData, teamProgressData: teamProgressData };
        });

        setPageData({
          frequency: "monthly",
          data: teamProgressData["monthly"],
        });

        var staffListSorted = Object.keys(teamProgressData).filter(function (
          item
        ) {
          return (
            item !== "monthly" && item !== "quarterly" && item !== "annual"
          );
        });
        staffListSorted = staffListSorted.sort(sortStringArray);
        setStaffList(staffListSorted);
      }
    },
    [teamData, props.team.teamName]
  );

  // Computes progress metrics for progress card every time the frequency changes
  useEffect(
    function () {
      if (pageData.data) {
        const avgCompletion = pageData.data.avgCompletion;
        updateCircleProgress(
          "team-progress",
          avgCompletion ? avgCompletion : 0,
          200,
          "50px",
          "#000718"
        );
        // Reset OKR Collapses
        $(".okr.collapse").each(function () {
          var collapsible = $(this);
          collapsible.collapse("show");
        });
      }
    },
    [pageData]
  );

  function changeFrequency(frequency) {
    setPageData({
      ...pageData,
      frequency: frequency,
      data: processedData.teamProgressData[frequency],
    });
    const avgCompletion =
      processedData.teamProgressData[frequency].avgCompletion;
    $("#team-progress").circleProgress(
      "value",
      avgCompletion ? avgCompletion : 0.0
    );
  }

  return (
    <div>
      <h1 className="mb-3">{props.team.teamName}</h1>
      <FrequencyTabs changeFrequency={changeFrequency} />
      {pageData.frequency !== "annual" &&
        pageData.frequency !== "quarterly" &&
        staffList && (
          <TeamMemberTabs
            staffList={staffList}
            changeFrequency={changeFrequency}
          />
        )}
      {pageData.data && (
        <TeamProgress
          progressData={pageData.data}
          frequency={pageData.frequency}
        />
      )}
      {pageData.data && (
        <TeamOKRs
          pageData={pageData}
          teams={props.teams}
          team={props.team}
          refreshData={refreshData}
        />
      )}
    </div>
  );
}
