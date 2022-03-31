import { HashRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TeamPage from './components/Team';
import './App.css';

// Load configs
import { teams } from './fakeData';


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

  return (
      <div>
      {routes}
      </div>
  );
}

// Home page
function renderHome(props) {
        
    return (
        <Home
            teams={teams}
            // overallProgressData={overallProgressData}
            // teamProgressData={teamProgressData}
        />
    );
}

// App
function App() {
  return (
      <HashRouter>
          <Navbar teams={teams} />
          <div className="container mt-5">
              <Switch>
                  <Route 
                      path='/'
                      render={renderHome}
                      exact
                  />
                  <TeamRoutes teams={teams} />
              </Switch>
          </div>
      </HashRouter>
  )
}

export default App;
