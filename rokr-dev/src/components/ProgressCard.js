// ProgressCard
// Card with (1) a progress circle, (2) count of objectives, and (3) count of key results

export default function ProgressCard(props) {
    // Define styles
    var styleCircleText = 'progress-card--circle-text';
    var styleHeaderText = 'progress-card--header-text';
    var styleMetric = 'progress-card--metric';
    var styleMetricTitle = 'progress-card--metric-title';
    var styleMetricBetween = 'pl-3 pr-3 progress-card--metric-between';
    var styleCircleFont = 'progress-circle-font';

    // Add "-sm" suffix for Team cards
    if (props.isTeam) {
        styleCircleText = styleCircleText + '-sm';
        styleHeaderText = styleHeaderText + '-sm';
        styleMetric = styleMetric + '-sm';
        styleMetricTitle = styleMetricTitle + '-sm';
        styleMetricBetween = styleMetricBetween + '-sm';
        styleCircleFont = styleCircleFont + '-sm';
    }
    
    return (
        <div>
            <div className="row justify-content-center align-items-center">
                <div className="col-6 text-center">
                    <div id={props.progressId} className="progress-circle text-center">
                        <div className={styleCircleFont + " progress-circle-value"}></div>
                    </div>
                    <div className={styleCircleText + " text-center mt-3"}>
                        AVG Objective Progress
                    </div>
                </div>
                <div className="col-6 text-center">
                    <h4 className={styleHeaderText + " mb-2"}>Objectives</h4>
                    <div className="row align-items-center justify-content-center text-center">
                        <span className={styleMetric}>{props.data.objectiveCompletion.completed}</span>
                        <span className={styleMetricBetween}>/</span>
                        <span className={styleMetric}>{props.data.objectiveCompletion.total}</span>
                    </div>
                    <div className="text-center">
                        <span className={styleMetricTitle}>Completed</span>
                    </div>
                    <hr className="mt-4 mb-4" />
                    <h4 className={styleHeaderText + " mb-2"}>Key Results</h4>
                    <div className="row align-items-center justify-content-center text-center">
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

