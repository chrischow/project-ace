import { HashRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import TeamPage from './components/Team';
import './App.css';

import { teams, allData } from './fakeData';

// Data processing
// console.log(allData);

// Join data
// var mergedData = [];
// var tempObj;
// var tempKRs = [];
// var tempOKR;

// for (var i = 0; i < allData.objectives.length; i++) {
//     tempObj = allData.objectives[i];

//     // Get objectives
//     tempKRs = allData.keyResults.filter(kr => {
//         return tempObj.objectiveId === kr.parentObjectiveId;
//     });

//     for (var j=0; j<tempKRs.length; j++) {
//         tempOKR = {
//             ...tempObj,
//             ...tempKRs[j]
//         };
//         mergedData.push(tempOKR);
//     }
// }

// // Sort data
// function sortData(a, b) {
//     if (a.objectiveId < b.objectiveId) {
//         return -1
//     } else if (a.objectiveId > b.objectiveId) {
//         return 1
//     } else {
//         if (a.krId < b.krId) {
//             return -1
//         } else if (a. krId > b.krId) {
//             return 1
//         }
//         return 0
//     }
//     return 0
// }

// mergedData.sort(sortData);

// console.log(mergedData);

// Complete KR completion
function computeKrCompletion(data) {
    
    var krCompleted = data.map(function(entry) {
        var pct = entry.currentValue / entry.maxValue;
        return pct == 1.0 ? 1 : 0;
    }).reduce((prev, next) => prev + next, 0);
    
    return {
        completed: krCompleted,
        total: data.length
    };
}

function computeObjCompletion(objectives, keyResults) {
    var objCounts = {};
    var total = objectives.length;
    var completed = 0;
    var filteredKRs;
    var completedKRs;
    var numKRs;
    var pctCompletion;
    var avgCompletion = 0;
    for (var i=0; i<objectives.length; i++) {
        
        // Filter KRs for each objective
        filteredKRs = keyResults.filter(function(kr) {
            return kr.parentObjectiveId === objectives[i].objectiveId;
        });
        numKRs = filteredKRs.length;

        // Compute average completion
        pctCompletion = filteredKRs.map(function(kr) {
            return kr.currentValue / kr.maxValue;
        })
        avgCompletion += pctCompletion.reduce(function(a, b) { return a + b }, 0) / numKRs;
        completedKRs = filteredKRs.filter(function(kr) {
            return kr.currentValue === kr.maxValue;
        });

        if (numKRs === completedKRs.length) {
            completed ++;
        }
    }

    avgCompletion /= total;

    return { completed, total, avgCompletion };
}

var annualObjectives = allData.objectives.filter(function(obj) {
    return obj.frequency === 'annual';
});

var annualKRs = allData.keyResults.filter(function(kr) {
    var objs = annualObjectives.filter(function(obj) {
        return obj.objectiveId === kr.parentObjectiveId;
    });
    return objs.length > 0;
})

var tempObjCompletion = computeObjCompletion(annualObjectives, annualKRs);

var overallProgressData = {
    avgCompletion: tempObjCompletion.avgCompletion,
    keyResultCompletion: computeKrCompletion(annualKRs),
    objectiveCompletion: {
        completed: tempObjCompletion.completed,
        total: tempObjCompletion.total,
    }
};

// Split data
function prepareTeamData() {
    var output = {};
    var freqs = ['annual', 'quarterly', 'monthly'];
    var tempObj;
    var parentObj;
    var tempKR;
    var tempData;
    var tempObjCompletion;
    for (var t=0; t < teams.length; t++) {
        output[teams[t].teamName] = {};
        for (var f=0; f < freqs.length; f++) {
            tempData = {};
            tempObj = allData.objectives.filter(function(entry) {
                return (entry.team === teams[t].teamName) && (entry.frequency === freqs[f]);
            })
            tempKR = allData.keyResults.filter(function(entry) {
                var parentObj = allData.objectives.filter(obj => obj.objectiveId === entry.parentObjectiveId)[0];
                return (entry.parentObjectiveTeam === teams[t].teamName) && (
                    parentObj.frequency === freqs[f]
                );
            })
            tempObjCompletion = computeObjCompletion(tempObj, tempKR);
            output[teams[t].teamName][freqs[f]] = {
                avgCompletion: tempObjCompletion.avgCompletion,
                keyResultCompletion: computeKrCompletion(tempKR),
                objectiveCompletion: {
                    completed: tempObjCompletion.completed,
                    total: tempObjCompletion.total,
                },
                objectives: tempObj,
                keyResults: tempKR
            };
        }
    }
    return output;
}

var teamProgressData = prepareTeamData();

// Routes
const TeamRoutes = (props) => {
  const routes = props.teams.map(function(team) {
      
      return (
          <Route 
                key={team.slug}
                path={'/' + team.slug}
                render={(props) => <TeamPage
                    team={team}
                    progressData={teamProgressData[team.teamName]}
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
