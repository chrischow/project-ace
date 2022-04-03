import { NavLink } from 'react-router-dom';
import Brand from './Brand';

export default function Navbar(props) {
    var linkElements = props.teams.map(function(item) {
        return (
            <li key={'nav-' + item.slug} className="nav-item">
                <NavLink className="nav-link" to={"/" + item.slug}>{item.teamName}</NavLink>
            </li>
        );
    });

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    <Brand />
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-expanded="false" aria-label="Toggle Nav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ml-auto">
                        {linkElements}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/directory">Directory</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}