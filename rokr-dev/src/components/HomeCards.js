// HomeCards
// Team progress cards
import ProgressCard from './ProgressCard';
import { useHistory } from 'react-router-dom';

function Card(props) {
    const history = useHistory();
    function goToTeamPage() {
        return history.push('/' + props.slug);
    }

    return (
        <div className="col-6 card--outer" onClick={goToTeamPage}>
            <div className="card--inner">
                <h4 className="card--header text-center mb-3">{props.teamName}</h4>
                <ProgressCard progressId={props.slug} data={props.data} isTeam={true} />
            </div>
        </div>
    );
}

// HomeCards
export default function HomeCards(props) {
    var cards = props.teams.map(function(team) {
        return (
            <Card
                teamName={team.teamName}
                key={team.slug}
                slug={team.slug}
                data={props.allTeamsProgressData[team.teamName]}
            />
        );
    });

    return (
        <div className="row align-items-center mt-3 mx-auto">
            {cards}
        </div>
    );
}

