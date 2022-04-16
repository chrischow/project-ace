import { useEffect, useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TeamPage from "./components/Team";
import DirectoryPage from "./components/Directory";
import ObjectiveForm from "./components/ObjectiveForm";
import KRForm from "./components/KRForm";
import UpdatesForm from "./components/UpdatesForm";
import Intro from "./components/Intro";
import "./App.css";

// Simulated data
import { setupDB, allData } from "./utils/fakeData";
// FOR TESTING ONLY: Set up database
setupDB(allData);

// Configs
var teams = [
  { teamName: "HQ RAiD", slug: "hq-raid" },
  { teamName: "PAB", slug: "pab" },
  { teamName: "SWiFT", slug: "swift" },
  { teamName: "RDO", slug: "rdo" },
  { teamName: "CyDef", slug: "cydef" },
  { teamName: "SES", slug: "ses" },
];

// URLs
// const txtUrl = 'https://raw.githubusercontent.com/chrischow/project-ace/main/txt/';
// const appUrl = 'https://raw.githubusercontent.com/chrischow/project-ace/main/rokr/components/';

// List IDs
// const objListId = 'cd390128-de73-48b9-a9d7-3ff22ccc0500';
// const  krListId = '5d1e2b07-552b-4fc2-9e7a-a96a7484dcf7';
// const updateListId = 'b4500e7e-e671-40ac-9898-60815ab388d9';

// List item entity types - use the getListItemEntityType utility;
// const objListItemEntityTypeFullName = 'SP.Data.ROKRObjectivesListItem';
// const krListItemEntityTypeFullName = 'SP.Data.ROKRKeyResultsListItem';
// const updateListItemEntityTypeFullName = 'SP.Data.ROKRUpdatesListItem';

// Set debug mode
const debugMode = false;

if (debugMode) {
  function handleError(event) {
    if (event.message) {
      alert(
        "Error: " +
          event.message +
          " at line " +
          event.lineno +
          " in " +
          event.filename
      );
    } else {
      alert(
        "Error: " +
          event.type +
          " from element: " +
          (event.srcElement || event.target)
      );
    }
  }
  window.addEventListener("error", handleError, true);
}

// Routes
const TeamRoutes = (props) => {
  var teams = props.teams;
  const routes = props.teams.map(function (team) {
    return (
      <Route
        key={team.slug}
        path={"/" + team.slug}
        render={(props) => (
          <TeamPage
            team={team}
            teams={teams}
          />
        )}
      />
    );
  });

  return <div>{routes}</div>;
};

// Home page
function renderHome(props) {
  return <Home teams={teams} {...props} />;
}

function renderUpdatesForm(props) {
  return <UpdatesForm teams={teams} />;
}

// App
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(function() {
    setTimeout( () => setLoading(false), 6000);
  }, []);

  return (
    <HashRouter>
      <Navbar teams={teams} />
      <div className="container mt-5 mb-5">
        <Switch>
          <Route
            path="/"
            render={() => (
              <Home teams={teams} loading={loading} />
            )}
            exact
          />
          <Route path="/intro" component={Intro} />
          <Route path="/directory" component={DirectoryPage} />
          <Route
            path="/new/obj"
            render={() => <ObjectiveForm teams={teams} mode="new" />}
          />
          <Route
            path="/new/kr"
            render={() => <KRForm teams={teams} mode="new" />}
          />
          <Route
            path="/edit/obj/:id"
            render={() => <ObjectiveForm teams={teams} mode="edit" />}
          />
          <Route
            path="/edit/kr/:id"
            render={() => <KRForm teams={teams} mode="edit" />}
          />
          <Route path="/edit/update/:id" render={renderUpdatesForm} />
          <TeamRoutes teams={teams} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
