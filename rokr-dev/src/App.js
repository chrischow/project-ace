import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TeamPage from './components/Team';
import './App.css';

import { teams, overallProgressData, teamProgressData } from './fakeData';


// Routes
const TeamRoutes = (props) => {
  const routes = props.teams.map(function(team) {
      
      return (
          <Route 
              key={team.slug}
              path={'/' + team.slug}
              render={(props) => <TeamPage team={team} />}
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
          overallData={overallProgressData}
          teamProgressData={teamProgressData}
      />
  );
}

// App
function App() {
  return (
      <HashRouter>
          <Navbar teams={teams} />
          <div className="container mt-5">
              <Routes>
                  <Route 
                      path='/'
                      render={renderHome}
                      exact
                  />

                  <TeamRoutes teams={teams} />
              </Routes>
          </div>
      </HashRouter>
  )
}

export default App;
