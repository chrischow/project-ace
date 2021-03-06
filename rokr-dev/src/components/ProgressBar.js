export default function ProgressBar(props) {
    const progressNow = Math.round(100 * Number(props.progress));
    const progressNowString = String(progressNow ? progressNow: 0) + '%';

    const progressStyle = {
        width: progressNowString
    };

    const progressClass = props.isKeyResult ? "progress progress-keyresult" : "progress";
    const progressBarClass = props.isKeyResult ? "progress-bar progress-keyresult" : "progress-bar";
    const progressBarText = props.isKeyResult? "progress-text-sm" : 'progress-text';

    return (
        <div className="row align-items-center">
            <div className="col-9">
                <div className={progressClass}>
                    <div
                        className={progressBarClass}
                        role="progressbar"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow={progressNow}
                        style={progressStyle}
                    ></div>
                </div>
            </div>
            <div className="col-3 text-center">
                <span className={progressBarText}>{progressNowString}</span>
            </div>
        </div>
    );
};

