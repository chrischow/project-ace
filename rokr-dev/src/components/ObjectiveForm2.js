import { useParams, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import $ from "jquery";
import { getDate, checkDate, getOneIBD, putIBD } from "../utils/queryData";

export default function ObjectiveForm2(props) {
  // Extract URL parameters
  const history = useHistory();

  // Initialise state for form
  const [formData, setFormData] = useState({});
  const [mode, setMode] = useState('');
  const [team, setTeam] = useState({});
  const [formErrors, setFormErrors] = useState([]);
  const formErrorsList = formErrors.map(function (item) {
    return <li key={item}>{item}</li>;
  });

  useEffect(() => {
    if (props.objFormData) {
      setMode(props.objFormData.objectiveId > 0 ? "Edit" : "New");
      setFormData(props.objFormData);
    }
  }, [props.objFormData]);

  function handleChange(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  // Prepare select input options
  var teams = props.teams.map(function (team) {
    return (
      <option
        key={team.slug}
        className="form-select-dropdown"
        value={team.teamName}
      >
        {team.teamName}
      </option>
    );
  });

  // Enable form datepicker utility
  useEffect(function () {
    $(function () {
      const objDescTextArea = $("#objectiveDescription");
      objDescTextArea.on("change input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });

      var startDatePicker = $("#objectiveStartDate");
      startDatePicker.datepicker({
        format: "yyyy-mm-dd",
      });

      startDatePicker.on("changeDate", function () {
        setFormData((prevData) => {
          return {
            ...prevData,
            objectiveStartDate: getDate(startDatePicker.datepicker("getDate")),
          };
        });
      });

      var endDatePicker = $("#objectiveEndDate");
      endDatePicker.datepicker({
        format: "yyyy-mm-dd",
      });

      endDatePicker.on("changeDate", function () {
        setFormData((prevData) => {
          return {
            ...prevData,
            objectiveEndDate: getDate(endDatePicker.datepicker("getDate")),
          };
        });
      });
    });
  });

  // Cancel: Go back
  function redirectBack() {
    return history.push("/" + team.slug);
  }

  function submitForm() {
    // Clear previous errors
    setFormErrors([]);

    // Extract mandatory form inputs
    const inputTitle = formData.objectiveTitle;
    const inputStartDate = formData.objectiveStartDate;
    const inputEndDate = formData.objectiveEndDate;

    var validStartDate = inputStartDate ? checkDate(inputStartDate) : false;
    var validEndDate = inputEndDate ? checkDate(inputEndDate) : false;

    // Form ok
    if (
      inputTitle &&
      inputStartDate &&
      validStartDate &&
      inputEndDate &&
      validEndDate
    ) {
      var { objectiveId, ...newData } = formData;
      // var reqDigest = getXRequestDigestValue();
      if (mode === "Edit") {
        putIBD("ObjectivesStore", formData, () => {
          $("#obj-edit-modal").modal("hide");
          props.refreshData()
        });

        // updateObjective(
        //     objListId, objectiveId, newData, reqDigest,
        //     objListItemEntityTypeFullName,
        //     () => history.push('/' + team.slug)
        // );
      } else {
        putIBD("ObjectivesStore", newData, () => {
          $("#obj-edit-modal").modal("hide");
          props.refreshData()
        });

        // addObjective(
        //     objListId, newData, reqDigest,
        //     objListItemEntityTypeFullName,
        //     () => history.push('/' + team.slug)
        // );
      }
    } else {
      if (!inputTitle) {
        setFormErrors((prevData) => {
          return [...prevData, "Input a title."];
        });
      }

      if (!inputStartDate) {
        setFormErrors((prevData) => {
          return [...prevData, "Set a start date."];
        });
      } else if (!validStartDate) {
        setFormErrors((prevData) => {
          return [...prevData, "Set a valid start date."];
        });
      }

      if (!inputEndDate) {
        setFormErrors((prevData) => {
          return [...prevData, "Set an end date."];
        });
      } else if (!validEndDate) {
        setFormErrors((prevData) => {
          return [...prevData, "Please set a valid end date."];
        });
      }
    }
  }

  return (
    <div>
      <h3 className="mt-4 mb-4">{mode} Objective</h3>
      <form className="form--group" id="objectiveForm">
        <div className="form-element">
          <label htmlFor="objectiveTitle" className="form--label">
            Title
          </label>
          <input
            type="text"
            name="objectiveTitle"
            className="form-control form-dark form--edit"
            value={formData.objectiveTitle}
            onChange={handleChange}
          />
        </div>
        <div className="form-element">
          <label htmlFor="objectiveDescription" className="form--label">
            Description
          </label>
          <textarea
            name="objectiveDescription"
            id="objectiveDescription"
            className="form-control form-dark form--edit"
            rows="1"
            value={formData.objectiveDescription}
            onChange={handleChange}
          />
        </div>
        <div className="row align-items-center">
          <div className="col-4">
            <div className="form-element">
              <label htmlFor="objectiveStartDate" className="form--label">
                Start Date
              </label>
              <input
                type="text"
                id="objectiveStartDate"
                name="objectiveStartDate"
                className="form-control form-dark form--edit datepicker"
                value={formData.objectiveStartDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-element">
              <label htmlFor="objectiveEndDate" className="form--label">
                End Date
              </label>
              <input
                type="text"
                id="objectiveEndDate"
                name="objectiveEndDate"
                className="form-control form-dark form--edit datepicker"
                value={formData.objectiveEndDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-4">
            <div className="form-element">
              <label htmlFor="frequency" className="form--label">
                Frequency
              </label>
              <select
                name="frequency"
                className="form-control form-dark form--edit"
                value={formData.frequency}
                onChange={handleChange}
              >
                <option className="form-select-dropdown" value="annual">
                  Annual
                </option>
                <option className="form-select-dropdown" value="quarterly">
                  Quarterly
                </option>
                <option className="form-select-dropdown" value="monthly">
                  Monthly
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-6">
            <div className="form-element">
              <label htmlFor="team" className="form--label">
                Team
              </label>
              <select
                name="team"
                className="form-control form-dark form--edit"
                value={formData.team}
                onChange={handleChange}
              >
                {teams}
              </select>
            </div>
          </div>
          <div className="col-6">
            <div className="form-element">
              <label htmlFor="owner" className="form--label">
                Owner
              </label>
              <input
                type="text"
                name="owner"
                className="form-control form-dark form--edit"
                value={formData.owner}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="text-right mt-2">
        <button className="btn btn-green" onClick={submitForm}>
          Submit
        </button>
      </div>
      {formErrorsList.length > 0 && (
        <div className="form-errors mt-4">
          <p>Please resolve the following errors:</p>
          <ul>{formErrorsList}</ul>
        </div>
      )}
    </div>
  );
}
