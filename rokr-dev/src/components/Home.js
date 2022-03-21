import React from 'react';

import Brand from './Brand';
import ProgressCard from './ProgressCard';
import HomeCards from './HomeCards';
import updateCircleProgress from '../utils/updateCircleProgress';

// Home component - to be broken down further
export default function Home(props) {
    React.useEffect(function() {
        // Load overall
        updateCircleProgress('overall_progress', props.overallData.avgCompletion, 200, '50px', '#000718');

        // Load teams
        var teamName;
        var slug;

        for (var i=0; i < props.teams.length; i++) {
            teamName = props.teams[i].teamName;
            slug = props.teams[i].slug;
            updateCircleProgress(slug, props.teamProgressData[teamName].annual.avgCompletion, 160, '35px', '#010D1E');
        }
    });

    return (
        <div>
            <h1><Brand /></h1>
            <h2 className="mt-4">Overall Progress</h2>
            <div className="overall-panel mt-4">
                <ProgressCard progressId="overall_progress" data={props.overallData} isTeam={false} />
            </div>
            <h2 className="mt-5">Teams</h2>
            <HomeCards teams={props.teams} teamProgressData={props.teamProgressData} />
        </div>
    );
}