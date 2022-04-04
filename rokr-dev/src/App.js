import { HashRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TeamPage from './components/Team';
import DirectoryPage from './components/Directory';
import ObjectiveForm from './components/ObjectiveForm';
import KRForm from './components/KRForm';
import './App.css';

// Load configs
// import { teams } from './fakeData';

// Configs
var teams = [
    {teamName: 'HQ RAiD', slug: 'hq-raid'},
    {teamName: 'PAB', slug: 'pab'},
    {teamName: 'SWiFT', slug: 'swift'},
    {teamName: 'RDO', slug: 'rdo'},
    {teamName: 'CyDef', slug: 'cydef'},
    {teamName: 'SES', slug: 'ses'},
]

// URLs
const txtUrl = 'https://raw.githubusercontent.com/chrischow/project-ace/main/txt/';
const appUrl = 'https://raw.githubusercontent.com/chrischow/project-ace/main/rokr/components/';

// List IDs
const objListId = 'cca0eabc-f2bd-4866-ba60-a3009004066d';
const  krListId = '08572e86-a0aa-4173-ba18-79bab1ee3890';

// List item entity types - use the getListItemEntityType utility;
const objListItemEntityTypeFullName = 'SP.Data.ROKR_x0020_ObjectivesListItem';
const krListItemEntityTypeFullName = 'SP.Data.RokrKeyResultsListItem';

// Routes
const TeamRoutes = (props) => {
    var teams = props.teams;
    const routes = props.teams.map(function(team) {  
        return (
            <Route 
                key={team.slug}
                path={'/' + team.slug}
                render={(props) => <TeamPage
                    team={team}
                    teams={teams}
                    // progressData={teamProgressData[team.teamName]}
                />}
            />
        );
    });

    return <div>{routes}</div>;
}

// Home page
function renderHome(props) {
    return <Home teams={teams} />;
}

function renderObjectiveForm(props) {
    return (
        <ObjectiveForm teams={teams} />
    );
}

function renderKRForm(props) {
    return (
        <KRForm teams={teams} history={props.history} />
    );
}

// App
function App() {
  return (
      <HashRouter>
          <Navbar teams={teams} />
          <div className="container mt-5">
              <Switch>
                  <Route path='/' render={renderHome} exact />
                  <Route path='/directory' component={DirectoryPage} />
                  <Route path='/edit/obj/:id' render={renderObjectiveForm} />
                  <Route path='/edit/kr/:id' render={renderKRForm} />
                  <TeamRoutes teams={teams} />
              </Switch>
          </div>
      </HashRouter>
  )
}

export default App;
