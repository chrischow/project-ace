export function FrequencyTabs(props) {
  return (
    <div className="mt-2">
      <ul className="nav nav-pills justify-content-center" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link frequency-tabs--link active"
            data-toggle="tab"
            role="tab"
            aria-selected="false"
            aria-controls="monthly"
            href="#team-monthly"
            onClick={() => props.changeFrequency("monthly")}
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
            onClick={() => props.changeFrequency("quarterly")}
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
            onClick={() => props.changeFrequency("annual")}
          >
            Annual
          </a>
        </li>
      </ul>
    </div>
  );
}

export function TeamMemberTabs(props) {
  var staffList = ["All", ...props.staffList];
  staffList = staffList.map(function (item) {
    return (
      <li className="nav-item">
        <a
          className={
            "nav-link individual-tabs--link" + (item === "All" ? " active" : "")
          }
          data-toggle="tab"
          role="tab"
          aria-selected="true"
          aria-controls={item}
          href={"#team-" + item}
          onClick={() =>
            props.changeFrequency(item === "All" ? "monthly" : item)
          }
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