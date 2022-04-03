import { useParams, Link } from "react-router-dom";
import React from 'react';
import $ from 'jquery';
import EditIcon from './EditIcon';
import { computeKrPercentage, formatDate } from '../utils/processData';

// Simulated
import { allData } from '../utils/fakeData';

function KRPanel(props) {
    const startDate = formatDate(props.krStartDate);
    const endDate = formatDate(props.krEndDate);
    const updateData = [
        {date: '2022-03-30', update: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis facilisis sapien non dolor efficitur, ac dignissim lorem consectetur. Cras dictum libero et ante semper, in auctor metus faucibus. Suspendisse ut.' },
        {date: '2022-03-31', update: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis facilisis sapien non dolor efficitur, ac dignissim lorem consectetur. Cras dictum libero et ante semper, in auctor metus faucibus. Suspendisse ut.' },
        {date: '2022-04-01', update: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis facilisis sapien non dolor efficitur, ac dignissim lorem consectetur. Cras dictum libero et ante semper, in auctor metus faucibus. Suspendisse ut.' }
    ]

    const updates = updateData.map(function(data) {
        return (
            <div className="row mb-3 align-items-center">
                <div className="col-2 text-center">{data.date}</div>
                <div className="col-10">{data.update}</div>
            </div>
        );
    });

    return (
        <div className="mb-4">
            <div className="objpage--kr-panel">
                {/* <h3 className="objpage--kr-header-text mb-3">Key Result</h3> */}
                <h3>
                    <span className="mr-3 objpage--title">{props.krTitle}</span>
                    <EditIcon />
                </h3>
                <div className="objpage--kr-subheader">{startDate} - {endDate}</div>
                <div className="objpage--description">{props.krDescription}</div>
            </div>
            <div className="objpage--kr-update-panel">
                <h3 className="objpage--kr-header-text mb-4">Updates</h3>
                <div className="row justify-content-center objpage--update-header">
                    <div className="col-2 text-center">Date</div>
                    <div className="col-10">Update</div>
                    <div className="col-11 objpage--table-border"></div>
                </div>
                {updates}
            </div>
        </div>
    );
}

export default function ObjectivePage(props) {
    // Extract objective ID from URL parameter
    const params = useParams();

    function queryData() {
        // Query data - simulated
        const allObjectives = allData.objectives;
        const allKeyResults = allData.keyResults;

        const currObj = allObjectives.filter(function(obj) {
            return obj.objectiveId == params.id;
        });

        const currKRs = allKeyResults.filter(function(kr) {
            return kr.parentObjectiveId == params.id;
        });

        return [currObj[0], currKRs];
    }

    const [objData, setObjData] = React.useState({});
    const [krData, setKRData] = React.useState([]);
    const [metric, setMetric] = React.useState(0);
    
    React.useEffect(function() {
        var [obj, krs] = queryData();
        setObjData(obj);
        setKRData(krs);
        setMetric(computeKrPercentage(krs));
    }, []);

    // Format dates
    const startDate = formatDate(objData.objectiveStartDate);
    const endDate = formatDate(objData.objectiveEndDate);
    
    // Key Results
    var keyResults = krData.map(function(kr) {
            return <KRPanel {...kr} />;
    });
    console.log(krData);

    return (
        <div>
            <div className='text-right mb-3'>
                <Link className="objpage--link" to={"/" + objData.team}>Back to Team Page</Link>
            </div>
            <div className="objpage--header-panel mb-5">
                <div className="row align-items-center">
                    <div className="col-9 objpage--main-col">
                        <h3 className="progress-card--header-text mb-3">{objData.team} Objective</h3>
                        <h2 className="objpage--title">{objData.objectiveTitle}</h2>
                        <div className="objpage--subheader">
                            <span className="objpage--subheader">{objData.frequency}</span>
                            <span className="objpage--subheader mr-3 ml-3">|</span>
                            <span className="objpage--subheader">{startDate} - {endDate}</span>
                        </div>
                        <div className="objpage--description">{objData.objectiveDescription}</div>
                    </div>
                    <div className="col-3">
                        <div className="my-auto text-center">
                            <span className="objpage--metric">{Number(metric*100).toFixed(0) + '%'}</span><br />
                            <span className="progress-card--metric-title">AVG Progress</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <h2 className="mb-3">Key Results</h2>
                {keyResults}
            </div>
            <div className="mb-5">
                <h2 className="mb-3">Timeline</h2>
            </div>
            
        </div>
    );
}