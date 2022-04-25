import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import "datatables.net-bs4";
import "../dataTables.bootstrap4.min.css";

import { EditIcon, EditIconText } from "./Icons";
import { formatDate } from "../utils/processData";

// Simulated
import { getTeamUpdatesDataIBD } from "../utils/queryData";

export default function KRModal(props) {
  const startDate = formatDate(props.krData.krStartDate);
  const endDate = formatDate(props.krData.krEndDate);

  // Initialise states for raw team data and processed data
  const [updateData, setUpdateData] = useState([]);
  const history = useHistory();
  const table = $("#kr-modal-table");

  // Trigger once props are in
  useEffect(
    function () {
      if (props.krData.krId) {
        // Query update data - SWAP FUNCTION HERE
        getTeamUpdatesDataIBD(props.krData.krId, setUpdateData);
        // getUpdateData(updateListId, props.krData.krId, setUpdateData);
      }
    },
    [props.krData]
  );

  // Update table everytime the table is populated
  useEffect(
    function () {
      $(function () {
        if (!$.fn.dataTable.isDataTable("#kr-modal-table")) {
          table.DataTable().destroy();
          table.DataTable({
            autoWidth: false,
            pageLength: 5,
            displayStart: 0,
            lengthMenu: [5, 10, 25, 50],
            order: [[0, "desc"]],
            fixedColumns: true,
            columnDefs: [
              {
                width: "18%",
                name: "updateDate",
                targets: 0,
                data: "updateDate",
                className: "text-center",
              },
              {
                width: "82%",
                name: "updateText",
                targets: 1,
                data: "updateText",
              },
            ],
          });

          table.DataTable().rows.add(updateData).draw();
        } else {
          table.DataTable().clear();
          table.DataTable().rows.add(updateData).draw();
        }
      });
    },
    [updateData]
  );

  // Revert to table page
  function resetTableView() {
    table.DataTable().page.len(5).draw(true);
    table.DataTable().page(0);
  }

  function editKR() {
    $("#kr-modal").modal("hide");
    return history.push("/edit/kr/" + props.krData.krId);
  }

  function editUpdate() {
    $("#kr-modal").modal("hide");
    return history.push("/edit/update/" + props.krData.krId);
  }

  return (
    <div
      className="modal fade"
      id="kr-modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby={"kr-modal-label"}
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-xl modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={"kr-modal-label"}>
              {props.krData.parentObjectiveTeam} Key Result
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="kr-modal--panel">
              <div className="row align-items-center">
                <div className="col-9 kr-modal--main-col">
                  <h3>
                    <span className="mr-3 text-green">
                      {props.krData.krTitle}
                    </span>
                    <div
                      style={{
                        display: "inline-block",
                        cursor: "pointer",
                        transition: "0.3s",
                      }}
                      onClick={editKR}
                    >
                      <EditIcon />
                    </div>
                  </h3>
                  <div className="kr-modal--subheader">
                    <span>
                      {startDate} - {endDate}
                    </span>
                    {props.krData.owner ? (
                      <span>
                        <span className="mr-3 ml-3">|</span>
                        <span>{props.krData.owner}</span>
                      </span>
                    ) : null}
                  </div>
                  <div className="kr-modal--description">
                    {props.krData.krDescription}
                  </div>
                </div>
                <div className="col-3 pl-4 text-center">
                  <div className="row align-items-center justify-content-center">
                    <span className="progress-card--metric-sm">
                      {props.krData.currentValue}
                    </span>
                    <span className="pl-3 pr-3 progress-card--metric-between-sm">
                      /
                    </span>
                    <span className="progress-card--metric-sm">
                      {props.krData.maxValue}
                    </span>
                  </div>
                  <div className="col-12 text-center">
                    <span className="progress-card--metric-title-sm">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="kr-modal--update-panel">
              <h3 className="kr-modal--tag-text mb-4 align-items-center">
                <span className="mr-4">Updates</span>
                <button
                  className="btn kr-modal--edit-button"
                  onClick={editUpdate}
                >
                  <span className="kr-modal--edit-text mr-1">Edit</span>
                  <EditIconText className="kr-modal--edit-icon" />
                </button>
              </h3>
              <table
                className="table table-dark table-striped kr-modal--table w-100"
                id="kr-modal-table"
              >
                <thead>
                  <tr>
                    <th className="text-center">Date</th>
                    <th className="text-center">Update</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={resetTableView}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
