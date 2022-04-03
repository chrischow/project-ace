import React from 'react';

import Brand from './Brand';
import ProgressCard from './ProgressCard';
import HomeCards from './HomeCards';
import updateCircleProgress from '../utils/updateCircleProgress';
import { computeAnnualMetrics, computeTeamsAnnualMetrics } from '../utils/processData';

// Simulated
import { allData } from '../utils/fakeData';

// Home component - to be broken down further
export default function Home(props) {
    // Query data - simulated
    const allObjectives = allData.objectives;
    const allKeyResults = allData.keyResults;

    // Process data
    const overallProgressData = computeAnnualMetrics(allObjectives, allKeyResults);
    const allTeamsProgressData = computeTeamsAnnualMetrics(props.teams, allObjectives, allKeyResults);

    React.useEffect(function() {

        // Query data - simulated
        const allObjectives = allData.objectives;
        const allKeyResults = allData.keyResults;
        
        // Process data
        const overallProgressData = computeAnnualMetrics(allObjectives, allKeyResults);
        const allTeamsProgressData = computeTeamsAnnualMetrics(props.teams, allObjectives, allKeyResults);

        // Load overall
        updateCircleProgress('overall_progress', overallProgressData.avgCompletion, 200, '50px', '#000718');

        // Load teams
        var teamName;
        var slug;

        for (var i=0; i < props.teams.length; i++) {
            teamName = props.teams[i].teamName;
            slug = props.teams[i].slug;
            updateCircleProgress(slug, allTeamsProgressData[teamName].avgCompletion, 160, '35px', '#010D1E');
        }
    });

    return (
        <div>
            <h1><Brand /></h1>
            <h2 className="mt-4">Overall Progress</h2>
            <div className="overall-panel mt-4">
                <ProgressCard progressId="overall_progress" data={overallProgressData} isTeam={false} />
            </div>
            <h2 className="mt-5">Teams</h2>
            <HomeCards teams={props.teams} allTeamsProgressData={allTeamsProgressData} />
        </div>
    );
}