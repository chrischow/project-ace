import { useState, useEffect } from "react";
import {
  offsetDate,
  getYear,
  getQuarter,
  getMonth,
} from "../utils/processData";

export function FrequencyTabs(props) {
  return (
    <div>
      <ul className="nav nav-pills justify-content-center" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link frequency-tabs--link active"
            data-toggle="tab"
            role="tab"
            aria-selected="false"
            aria-controls="monthly"
            href="#team-monthly"
            onClick={() => {
              // props.changeFrequency("monthly");
              props.setCurrentGroup("monthly");
            }}
          >
            Monthly
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
            onClick={() => {
              // props.changeFrequency("quarterly");
              props.setCurrentGroup("quarterly");
            }}
          >
            Quarterly
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link frequency-tabs--link"
            data-toggle="tab"
            role="tab"
            aria-selected="true"
            aria-controls="annual"
            href="#team-annual"
            onClick={() => {
              // props.changeFrequency("annual");
              props.setCurrentGroup("annual");
            }}
          >
            Annual
          </a>
        </li>
      </ul>
    </div>
  );
}

export function SubGroupDropdown(props) {
  // State for controlled form
  const [formData, setFormData] = useState("");

  useEffect(() => {
    // Compute default option
    const today = offsetDate(new Date());
    const year = getYear(today);
    const initCurrentSubGroup = props.currentGroup === "annual"
      ? year
      : props.currentGroup === "quarterly"
      ? getQuarter(today, year)
      : getMonth(today, year);
    setFormData(initCurrentSubGroup);
    props.setCurrentSubGroup(initCurrentSubGroup);
  }, [props.currentGroup]);

  // Handle change in dropdown
  const handleChange = (event) => {
    setFormData((prevData) => event.target.value);
    props.setCurrentSubGroup(event.target.value);
    console.log(event.target.value);
  };

  // Prepare options
  const subgroupOptions = props.subGroups[props.currentGroup];
  
  const options = subgroupOptions.map((item, idx) => {
    return <option value={item} key={'sg-' + idx}>{item}</option>;
  });

  return (
    <div className="row justify-content-center mt-3">
      <div className="col-3">
        <select
          name="subgroup-select"
          className="form-control form-dark nav-subgroup-dropdown"
          onChange={handleChange}
          value={formData}
        >
          {options}
        </select>
      </div>
    </div>
  );
}

export function TeamMemberTabs(props) {
  var staffList = ["All", ...props.staffList];
  staffList = staffList.map(function (item, idx) {
    return (
      <li className="nav-item" key={'tm-' + idx}>
        <a
          className={
            "nav-link individual-tabs--link" + (item === "All" ? " active" : "")
          }
          data-toggle="tab"
          role="tab"
          aria-selected="true"
          aria-controls={item}
          href={"#team-" + item}
          onClick={() => {
            const group = item === "All" ? "monthly" : item;
            props.changeFrequency(item === "All" ? "monthly" : item);
            props.setCurrentStaff(item == "All" ? null : item);
          }}
        >
          {item}
        </a>
      </li>
    );
  });
  return (
    <div className="mt-2">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        {staffList}
      </ul>
    </div>
  );
}
