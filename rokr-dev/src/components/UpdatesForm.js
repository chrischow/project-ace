import React, { useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import { EditIcon } from './Icons';

// Simulated
import { allData } from '../utils/fakeData';

export default function UpdatesForm(props){

    // State
    const [updates, setUpdates] = React.useState([]);

    // Extract objective ID from URL parameter
    const params = useParams();

    function queryData() {
        // Query data - simulated
        const allKeyResults = allData.keyResults;

        const currKr = allKeyResults.filter(function(kr) {
            return kr.krId == params.id;
        });

        return currKr[0];
    }

    const krData = queryData();
    const history = useHistory();
    const team = props.teams.filter(function(item) {
        return item.teamName === krData.parentObjectiveTeam;
    });

    const updateData = allData.updates.filter(function(update) {
        return update.parentKrId == krData.krId;
    });

    function redirectBack() {
        return history.push('/' + team[0].slug);
    }

    function addUpdate() {
        setUpdates(prevUpdate => {
            return [
                ...updates,
                {
                    updateId: 99,
                    updateText: 'Test entry at ' + new Date(),
                    updateDate: '2022-04-05',
                    parentKrId: krData.krId
                }
            ];
        });
    }

    useEffect(function() {
        setUpdates(updateData);
    }, []);

    const updateRows = updates.map(function(item) {
        return (
            <div className="row align-items-top update-form--table-text">
                <div className="col-2 text-center">{item.updateDate}</div>
                <div className="col-9">{item.updateText}</div>
                <div className="col-1 text-center"><EditIcon /></div>
            </div>
        );
    });

    return (
        <div>
            <h1 className="mb-2">Key Result Updates</h1>
            <h2 className="mb-4">{krData.krTitle} - <span className="text-green">{krData.parentObjectiveTeam}</span></h2>
            <div className="mb-4">
                <button className="btn btn-blue mr-3" onClick={addUpdate}>Add Update</button>
                {/* <button className="btn btn-blue">Edit</button> */}
                <button className="btn btn-secondary float-right" onClick={redirectBack}>Back to Objective</button>
            </div>
            <div className="row align-items-top update-form--table-header">
                <div className="col-2 text-center">Date</div>
                <div className="col-9">Description</div>
                <div className="col-1 text-center">Edit</div>
            </div>
            {updateRows}
        </div>
    );
}