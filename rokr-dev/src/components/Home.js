import Brand from './Brand';
import { Component } from 'react';
import updateCircleProgress from '../utils/updateCircleProgress';

function Card(props) {
    return (
        <div className="col-6 card--outer">
            <div className="card--inner">
                <h4 className="card--header text-center mb-3">{props.teamName}</h4>
                <ProgressCard progressId={props.slug} data={props.data} isTeam={true} />
            </div>
        </div>
    );
}

// HomeCards
function HomeCards(props) {
    var teams = props.teams;
    var teamProgressData = props.teamProgressData;
    var cards = [];
    for (var i = 0; i < teams.length; i++) {
        cards.push(
            <Card 
                teamName={teams[i].teamName}
                key={teams[i].slug}
                slug={teams[i].slug}
                data={teamProgressData[i]}
            />
        )
    }

    return (
        <div className="row align-items-center mt-3 container mx-auto">
            {cards}
        </div>
    );
}

export function ProgressCard(props) {
    // Define styles
    var styleCircleText = 'progress-card--circle-text';
    var styleHeaderText = 'progress-card--header-text';
    var styleMetric = 'progress-card--metric';
    var styleMetricTitle = 'progress-card--metric-title';
    var styleMetricBetween = 'pl-3 pr-3 progress-card--metric-between';

    // Add "-sm" suffix for Team cards
    if (props.isTeam) {
        styleCircleText = styleCircleText + '-sm';
        styleHeaderText = styleHeaderText + '-sm';
        styleMetric = styleMetric + '-sm';
        styleMetricTitle = styleMetricTitle + '-sm';
        styleMetricBetween = styleMetricBetween + '-sm';
    }

    return (
        <div>
            <div className="row justify-content-center align-items-center">
                <div className="col-6">
                    <div id={props.progressId} className="progress-circle text-center">
                        <div className="progress-circle-value"></div>
                    </div>
                    <div className={styleCircleText + " text-center mt-3"}>
                        AVG Objective Progress
                    </div>
                </div>
                <div className="col-6 text-center">
                    <h4 className={styleHeaderText + " mb-3"}>Objectives</h4>
                    <div className="row align-items-center justify-content-center mb-1 text-center">
                        <span className={styleMetric}>{props.data.objectiveCompletion.completed}</span>
                        <span className={styleMetricBetween}>/</span>
                        <span className={styleMetric}>{props.data.objectiveCompletion.total}</span>
                    </div>
                    <div className="text-center">
                        <span className={styleMetricTitle}>Completed</span>
                    </div>
                    <hr className="mt-4 mb-4" />
                    <h4 className={styleHeaderText + " mb-3"}>Key Results</h4>
                    <div className="row align-items-center justify-content-center mb-1 text-center">
                        <span className={styleMetric}>{props.data.keyResultCompletion.completed}</span>
                        <span className={styleMetricBetween}>/</span>
                        <span className={styleMetric}>{props.data.keyResultCompletion.total}</span>
                    </div>
                    <div className="text-center">
                        <span className={styleMetricTitle}>Completed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Home component - to be broken down further
export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        // Load overall
        updateCircleProgress('overall_progress', 0.2, 220, '50px', '#000718');

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