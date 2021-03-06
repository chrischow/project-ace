import { useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net-bs4";
import "../dataTables.bootstrap4.min.css";
import ProgressCard from "./ProgressCard";
import { FrequencyTabs, TeamMemberTabs, SubGroupDropdown } from "./Tabs";
import TeamOKRs from "./TeamOKRs";
import updateCircleProgress from "../utils/updateCircleProgress";
import {
  prepareTeamData,
  getStaffFromObjectives,
  sortStringArray,
  sortObjectivesFreqTitle,
  getSubGroupsFromObjectives,
  prepareTeamPageData,
  getMonth,
  getYear,
  offsetDate,
} from "../utils/processData";

// Simulated
import {
  getTeamObjectiveDataIBD,
  getTeamKeyResultDataIBD,
  getAllIDB,
  getDate,
} from "../utils/queryData";

function TeamProgress(props) {
  const entity =
    props.frequency !== "annual" && props.frequency !== "quarterly"
      ? "Individual"
      : "Team";
  return (
    <div>
      <h3 className="mt-1">{entity} Progress</h3>
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
  // Initialise states for data
  const [teamData, setTeamData] = useState({});
  const [latestUpdates, setLatestUpdates] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [subGroups, setSubGroups] = useState({});

  // Initialise states for filters
  const [currentGroup, setCurrentGroup] = useState("monthly");
  const [currentSubGroup, setCurrentSubGroup] = useState("");
  const [currentStaff, setCurrentStaff] = useState("");
  const [currentData, setCurrentData] = useState({});

  const [processedData, setProcessedData] = useState({});
  const [pageData, setPageData] = useState({});

  // Callback functions to update respective items in raw data state
  // To be passed to async query to database
  const updateObjectives = (data) => {
    // Sort data
    var dataSorted = data.sort(sortObjectivesFreqTitle);

    setTeamData((prevData) => ({ ...prevData, allObjectives: dataSorted }));
  };

  const updateKeyResults = (data) => {
    // Sort data
    var dataSorted = data.sort((a, b) => {
      return a.krTitle > b.krTitle ? 1 : a.krTitle < b.krTitle ? -1 : 0;
    });

    setTeamData((prevData) => ({ ...prevData, allKeyResults: dataSorted }));
  };

  const updateUpdates = (data) => {
    // Configure date
    var startDate = new Date(),
      endDate = new Date();

    startDate.setDate(startDate.getDate() - 7);
    startDate = getDate(startDate);
    endDate = getDate(endDate);

    // Get array of krIds
    const krIds = teamData.allKeyResults.map((item) => {
      return item.krId;
    });

    // Filter data by date and krId
    var filteredData = data.filter((item) => {
      const updateDate = getDate(item.updateDate);
      return (
        updateDate >= startDate &&
        updateDate <= endDate &&
        krIds.includes(item.parentKrId)
      );
    });

    setLatestUpdates(filteredData);
  };

  const refreshData = () => {
    getTeamObjectiveDataIBD(props.team.teamName, updateObjectives);
    getTeamKeyResultDataIBD(props.team.teamName, updateKeyResults);
    // getObjectiveData(objListId, props.team.teamName, updateObjectives);
    // getKRData(krListId, props.team.teamName, updateKeyResults);
  };

  // Run once - to trigger query
  useEffect(() => {
    // Query data - simulated
    refreshData();
  }, [props.team.teamName]);

  // Get filters: frequencies and staff list
  useEffect(() => {
    if (teamData.allObjectives) {
      const staffList = getStaffFromObjectives(teamData.allObjectives);
      const subgroups = getSubGroupsFromObjectives(teamData.allObjectives);
      setStaffList(staffList);
      setSubGroups(subgroups);
      // Check today's date
      const today = offsetDate(new Date());
      const year = getYear(today);
      const initCurrentSubGroup = getMonth(today, year);
      setCurrentSubGroup(initCurrentSubGroup);
    }
  }, [teamData.allObjectives]);

  // Processes data and updates page data every time there is a change to the
  // raw data state
  useEffect(() => {
    if (teamData.allObjectives && teamData.allKeyResults) {
      // Query updates
      getAllIDB("UpdatesStore", updateUpdates);

      // WIP: BYPASS THIS PRE-COMPUTE STEP - contains different frequencies
      const teamProgressData = prepareTeamData(
        teamData.allObjectives,
        teamData.allKeyResults
      );
      
      setProcessedData((prevData) => {
        return { ...prevData, teamProgressData: teamProgressData };
      });

      setPageData({
        frequency: "monthly",
        // WIP: JUMP STRAIGHT TO THIS I.E. COMPUTE METRICS
        data: teamProgressData["monthly"],
      });
      
    }
  }, [teamData, props.team.teamName]);

  useEffect(() => {
    if (
      teamData.allObjectives &&
      teamData.allKeyResults &&
      currentGroup &&
      currentSubGroup
    ) {
      const newCurrentData = prepareTeamPageData(teamData.allObjectives, teamData.allKeyResults, currentGroup, currentStaff, currentSubGroup);
      setCurrentData(newCurrentData);
    }
  }, [teamData, currentGroup, currentSubGroup, currentStaff]);

  // Computes progress metrics for progress card every time the frequency changes
  useEffect(() => {
    // if (pageData.data) {
    if (Object.keys(currentData).length > 0) {
      const avgCompletion = currentData.avgCompletion;
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
  }, [currentData]);

  const changeFrequency = (frequency) => {
    setCurrentGroup(frequency);
    const avgCompletion =
      currentData.avgCompletion;
    $("#team-progress").circleProgress(
      "value",
      avgCompletion ? avgCompletion : 0.0
    );
  };

  return (
    <div>
      <h1 className="teampage-title">{props.team.teamName}</h1>
      <FrequencyTabs
        changeFrequency={changeFrequency}
        setCurrentGroup={setCurrentGroup}
      />
      {currentGroup !== "annual" &&
        currentGroup !== "quarterly" &&
        staffList && (
          <TeamMemberTabs
            staffList={staffList}
            changeFrequency={changeFrequency}
            setCurrentStaff={setCurrentStaff}
          />
        )}
      {currentGroup && subGroups.monthly && (
        <SubGroupDropdown
          currentGroup={currentGroup}
          subGroups={subGroups}
          setCurrentSubGroup={setCurrentSubGroup}
        />
      )}
      {Object.keys(currentData).length > 0 && (
        <TeamProgress
          progressData={currentData}
          frequency={currentGroup}
        />
      )}
      {Object.keys(currentData).length > 0 && (
        <TeamOKRs
          currentData={currentData}
          currentGroup={currentGroup}
          objectives={teamData.allObjectives}
          teams={props.teams}
          team={props.team}
          refreshData={refreshData}
          latestUpdates={latestUpdates}
        />
      )}
    </div>
  );
}
