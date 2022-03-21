import { Component } from 'react';

import Brand from './Brand';
import ProgressCard from './ProgressCard';
import HomeCards from './HomeCards';
import updateCircleProgress from '../utils/updateCircleProgress';

// Home component - to be broken down further
export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        // Load overall
        updateCircleProgress('overall_progress', 0.2, 200, '50px', '#000718');

        // Load teams
        var slug;
        var team_progress;

        for (var i=0; i < this.props.teams.length; i++) {
            slug = this.props.teams[i].slug;
            team_progress = Number(this.props.teamProgressData[i].progress);
            updateCircleProgress(slug, team_progress, 160, '35px', '#010D1E');
        }
    }

    render() {
        return (
            <div>
                <h1><Brand /></h1>
                <h2 className="mt-4">Overall Progress</h2>
                <div className="overall-panel mt-4">
                    <ProgressCard progressId="overall_progress" data={this.props.overallData} isTeam={false} />
                </div>
                <h2 className="mt-5">Teams</h2>
                <HomeCards teams={this.props.teams} teamProgressData={this.props.teamProgressData} />
            </div>
        )
    };
}