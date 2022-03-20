import { useState, Component } from 'react';
import $ from 'jquery';
import { ProgressCard } from './Home';
import updateCircleProgress from '../utils/updateCircleProgress';

// #FAKEDATA
const annualOkrs = [
    {
        objectiveId: 1, title: 'Annual O1', description: 'Annual O1 description', progress: 0.12,
        keyResults: [
            {title: 'Annual O1 KR1', description: 'Annual O1 KR1 description', progress: 0.11},
            {title: 'Annual O1 KR2', description: 'Annual O1 KR2 description', progress: 0.12},
            {title: 'Annual O1 KR3', description: 'Annual O1 KR3 description', progress: 0.13},
        ]
    },
    {
        objectiveId: 2, title: 'Annual O2 - w/ empty description', description: '', progress: 0.22,
        keyResults: [
            {title: 'Annual O2 KR1', description: 'Annual O2 KR1 description', progress: 0.21},
            {title: 'Annual O2 KR2', description: 'Annual O2 KR2 description', progress: 0.22},
            {title: 'Annual O2 KR3', description: 'Annual O2 KR3 description', progress: 0.23},
        ]
    },
    {
        objectiveId: 3, title: 'Annual O3 - w/ no description at all', progress: 0.32,
        keyResults: [
            {title: 'Annual O3 KR1', description: 'Annual O3 KR1 description', progress: 0.31},
            {title: 'Annual O3 KR2', description: 'Annual O3 KR2 description', progress: 0.32},
            {title: 'Annual O3 KR3', description: 'Annual O3 KR3 description', progress: 0.33},
        ]
    },
];

const quarterlyOkrs = [
    {
        objectiveId: 4, title: 'Quarterly O1', description: 'Quarterly O1 description', progress: 0.42,
        keyResults: [
            {title: 'Quarterly O1 KR1', description: 'Quarterly O1 KR1 description', progress: 0.41},
            {title: 'Quarterly O1 KR2', description: 'Quarterly O1 KR2 description', progress: 0.42},
            {title: 'Quarterly O1 KR3', description: 'Quarterly O1 KR3 description', progress: 0.43},
        ]
    },
    {
        objectiveId: 5, title: 'Quarterly O2', description: 'Quarterly O2 description', progress: 0.52,
        keyResults: [
            {title: 'Quarterly O2 KR1', description: 'Quarterly O2 KR1 description', progress: 0.51},
            {title: 'Quarterly O2 KR2', description: 'Quarterly O2 KR2 description', progress: 0.52},
            {title: 'Quarterly O2 KR3', description: 'Quarterly O2 KR3 description', progress: 0.53},
        ]
    },
    {
        objectiveId: 6, title: 'Quarterly O3', description: 'Quarterly O3 description', progress: 0.62,
        keyResults: [
            {title: 'Quarterly O3 KR1', description: 'Quarterly O3 KR1 description', progress: 0.61},
            {title: 'Quarterly O3 KR2', description: 'Quarterly O3 KR2 description', progress: 0.62},
            {title: 'Quarterly O3 KR3', description: 'Quarterly O3 KR3 description', progress: 0.63},
        ]
    },
];

const monthlyOkrs = [
    {
        objectiveId: 7, title: 'Monthly O1', description: 'Monthly O1 description', progress: 0.72,
        keyResults: [
            {title: 'Monthly O1 KR1', description: 'Monthly O1 KR1 description', progress: 0.71},
            {title: 'Monthly O1 KR2', description: 'Monthly O1 KR2 description', progress: 0.72},
            {title: 'Monthly O1 KR3', description: 'Monthly O1 KR3 description', progress: 0.73},
        ]
    },
    {
        objectiveId: 8, title: 'Monthly O2', description: 'Monthly O2 description', progress: 0.82,
        keyResults: [
            {title: 'Monthly O2 KR1', description: 'Monthly O2 KR1 description', progress: 0.81},
            {title: 'Monthly O2 KR2', description: 'Monthly O2 KR2 description', progress: 0.82},
            {title: 'Monthly O2 KR3', description: 'Monthly O2 KR3 description', progress: 0.83},
        ]
    },
    {
        objectiveId: 9, title: 'Monthly O3', description: 'Monthly O3 description', progress: 0.92,
        keyResults: [
            {title: 'Monthly O3 KR1', description: 'Monthly O3 KR1 description', progress: 0.91},
            {title: 'Monthly O3 KR2', description: 'Monthly O3 KR2 description', progress: 0.92},
            {title: 'Monthly O3 KR3', description: 'Monthly O3 KR3 description', progress: 0.93},
        ]
    },
];

const teamData = {
    annual: {
        objectiveCompletion: {completed: 1, total: 3},
        keyResultCompletion: {completed: 3, total: 9},
        avgCompletion: 0.22,
        okrs: annualOkrs
    },
    quarterly: {
        objectiveCompletion: {completed: 2, total: 6},
        keyResultCompletion: {completed: 6, total: 18},
        avgCompletion: 0.52,
        okrs: quarterlyOkrs
    },
    monthly: {
        objectiveCompletion: {completed: 3, total: 9},
        keyResultCompletion: {completed: 9, total: 27},
        avgCompletion: 0.82,
        okrs: monthlyOkrs
    }
    
};

function ProgressBar(props) {
    const progressNow = Math.round(100 * Number(props.progress));
    const progressNowString = String(progressNow) + '%';

    const progressStyle = {
        width: progressNowString
    };

    const progressClass = props.isKeyResult ? "progress progress-keyresult" : "progress";
    const progressBarCol = props.isKeyResult ? "col-9": "col-11";
    const progressTextCol = props.isKeyResult ? "col-3": "col-1";

    return (
        <div className="row align-items-center">
            <div className={progressBarCol}>
                <div className={progressClass}>
                    <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow={progressNow}
                        style={progressStyle}
                    ></div>
                </div>
            </div>
            <div className={progressTextCol}>
                <span className="progress-text">{progressNowString}</span>
            </div>
        </div>
    );
};

function KeyResultCard(props) {
    return (
        <div className="keyresult-card">
            <h4 className="keyresult-card--tag">Key Result</h4>
            <h4 className="keyresult-card--title mt-2">
                {props.title}
            </h4>
            {props.description && <p className="keyresult-card--description mt-1">
                {props.description}
            </p>}
            <ProgressBar progress={props.progress} isKeyResult={true} />
        </div>
    );
}

function KeyResultRow(props) {
    return (
        <div className="keyresult-row">
            <div className="row align-items-center">
                <div className="col-5">
                    <span className="keyresult-row--title">{props.title}</span>
                </div>
                <div className="text-center col-2">
                    <span className="keyresult-row--text ">Owner</span>
                </div>
                <div className="text-center col-2">
                    <span className="keyresult-row--text">31 Mar 2023</span>
                </div>
                <div className="keyresult-row--progress-bar col-3">
                    <ProgressBar progress={props.progress} isKeyResult={true} />
                </div>
            </div>
        </div>
    );
};

function ObjectiveCard(props) {
    const [isClicked, setIsClicked] = useState(false);

    const objId = 'obj-' + props.objectiveId;

    function updateArrow() {
        $('#' + objId).on('shown.bs.collapse', () => setIsClicked(true));
        $('#' + objId).on('hidden.bs.collapse', () => setIsClicked(false));
    }

    return (
        <button
            className="btn objective-card text-left"
            data-toggle="collapse"
            data-target={'#' + objId}
            type="button"
            aria-expanded="false"
            aria-controls={objId}
            onClick={updateArrow}
            id={'btn-' + objId}
        >
            <h4 className="objective-card--tag mb-3">Objective</h4>
            <div className={isClicked ? "arrow-down" : "arrow-right"}></div>
            <h4 className="objective-card--title mt-2">
                {props.title}
            </h4>
            {props.description && <p className="objective-card--description mt-1">
                {props.description}
            </p>}
            <ProgressBar progress={props.progress} />
        </button>
    );
};

function ObjectiveCardGroup(props) {
    // Create KR Cards
    const objId = 'obj-' + props.objectiveId;

    const keyResultCards = props.keyResults.map(function(item) {
        return <KeyResultCard {...item} />
    });

    return (
        <div className="mt-4">
            <ObjectiveCard {...props} />
            <div class="okr collapse" id={objId}>
                {keyResultCards}
            </div>
        </div>
    );
};

function ObjectiveCardGroup2(props) {
    // Create KR Cards
    const objId = 'obj-' + props.objectiveId;

    const keyResultRows = props.keyResults.map(function(item) {
        return <KeyResultRow {...item} />
    });

    return (
        <div className="mt-4">
            <ObjectiveCard {...props} />
            <div class="okr collapse" id={objId}>
                {keyResultRows}
            </div>
        </div>
    );
};

function FrequencyTabs(props) {
    return (
        <div className="mt-4">
            <ul className="nav nav-pills justify-content-center" role="tablist">
                <li className="nav-item">
                    <a
                        className="nav-link frequency-tabs--link active"
                        data-toggle="tab"
                        role="tab"
                        aria-selected="true"
                        aria-controls="annual"
                        href="#team-annual"
                        onClick={() => props.changeFrequency('annual')}
                    >
                            Annual
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
                        onClick={() => props.changeFrequency('quarterly')}
                    >
                            Quarterly
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link frequency-tabs--link"
                        data-toggle="tab"
                        role="tab"
                        aria-selected="false"
                        aria-controls="monthly"
                        href="#team-monthly"
                        onClick={() => props.changeFrequency('monthly')}
                    >
                            Monthly
                    </a>
                </li>
            </ul>
        </div>
    );
}

class TeamPageBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            frequency: 'annual',
            data: props.teamData['annual']
        };
    }

    changeFrequency = (frequency) => {
        this.setState({
            frequency: frequency,
            data: this.props.teamData[frequency]
        });
        
        $('#team-progress').circleProgress('value', this.props.teamData[frequency].avgCompletion);
    }

    componentDidMount() {
        updateCircleProgress('team-progress', this.state.data.avgCompletion, 220, '50px', '#000718');
    }

    render() {
        const progressData = {
            objectiveCompletion: this.state.data.objectiveCompletion,
            keyResultCompletion: this.state.data.keyResultCompletion
        };

        const objectiveCardGroups = this.state.data.okrs.map(function(item) {
            return <ObjectiveCardGroup {...item} />
        });

        const objectiveCardRows = this.state.data.okrs.map(function(item) {
            return <ObjectiveCardGroup2 {...item} />
        });

        return (
            <div>
                <FrequencyTabs changeFrequency={this.changeFrequency} />
                <h3 className="mt-4">Team Progress</h3>
                <div className="overall-panel mt-4">
                    <ProgressCard progressId="team-progress" data={progressData} isTeam={false} />
                </div>
                <h3 className="mt-5">Objectives & Key Results</h3>
                {objectiveCardRows}
            </div>
        );
    }
}

export default function TeamPage(props) {
    return (
        <div>
            <h1 className="mb-3">{props.team.teamName}</h1>
            <TeamPageBody teamData={teamData} />
        </div>
    );
};