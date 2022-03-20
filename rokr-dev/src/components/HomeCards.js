// HomeCards
// Team progress cards

import ProgressCard from './ProgressCard';

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
export default function HomeCards(props) {
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