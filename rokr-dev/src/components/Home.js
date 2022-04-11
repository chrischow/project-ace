import { useState, useEffect } from 'react';

import Brand from './Brand';
import ProgressCard from './ProgressCard';
import HomeCards from './HomeCards';
import updateCircleProgress from '../utils/updateCircleProgress';
import { computeAnnualMetrics, computeTeamsAnnualMetrics } from '../utils/processData';

// Simulated
import { allData } from '../utils/fakeData';
import { getAllIDB } from '../utils/queryData';

// Home component - to be broken down further
export default function Home(props) {
    // Initialise states for raw data and computed metrics
    const [data, setData] = useState({});
    const [metrics, setMetrics] = useState({});

    // Callback functions to update respective items in raw data state
    // To be passed to async query to database
    function updateObjectives(data) {
        setData(prevData => {return {...prevData, allObjectives: data}});
    }

    function updateKeyResults(data) {
        setData(prevData => {return {...prevData, allKeyResults: data}});
    }
    
    // Run once - to trigger query
    useEffect(function() {
        // Query data - simulated
        getAllIDB('ObjectivesStore', updateObjectives);
        getAllIDB('KeyResultsStore', updateKeyResults);
    }, [])

    // Computes progress card metrics every time there is a change to the raw data state
    useEffect(function() {
        if (data.allObjectives && data.allKeyResults) {
            setMetrics(prevData => {
                return {
                    ...prevData,
                    overallProgressData: computeAnnualMetrics(data.allObjectives, data.allKeyResults),
                    allTeamsProgressData: computeTeamsAnnualMetrics(props.teams, data.allObjectives, data.allKeyResults)
                };});
        }
    }, [data, props.teams])

    // Renders progress cards every time there is a change to the metrics
    useEffect(function() {
        if (metrics.overallProgressData) {
            updateCircleProgress('overall_progress', metrics.overallProgressData.avgCompletion, 200, '50px', '#000718');
        }

        // Load teams
        var teamName;
        var slug;
        if (metrics.allTeamsProgressData) {
            for (var i=0; i < props.teams.length; i++) {
                teamName = props.teams[i].teamName;
                slug = props.teams[i].slug;
                updateCircleProgress(slug, metrics.allTeamsProgressData[teamName].avgCompletion, 160, '35px', '#010D1E');
            }
        }
    }, [metrics, props.teams]);

    return (
        <div>
            <h1><Brand /></h1>
            <h2 className="mt-4">Overall Progress</h2>
            {metrics.overallProgressData && <div className="overall-panel mt-4">
                <ProgressCard progressId="overall_progress" data={metrics.overallProgressData} isTeam={false} />
            </div>}
            {!metrics.overallProgressData && <div className="overall-panel mt-4 text-center align-items-center">
                <span className="no-data">No data to display.</span>
            </div>}
            <h2 className="mt-5">Teams</h2>
            {metrics.allTeamsProgressData && <HomeCards teams={props.teams} allTeamsProgressData={metrics.allTeamsProgressData} />}
            {!metrics.allTeamsProgressData && <div className="overall-panel mt-4 text-center align-items-center">
                <span className="no-data">No data to display.</span>
            </div>}
        </div>
    );
}

