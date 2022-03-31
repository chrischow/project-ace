// Complete KR completion
export function computeKrCompletion(data) {
    
    var krCompleted = data.map(function(entry) {
        var pct = entry.currentValue / entry.maxValue;
        return pct === 1.0 ? 1 : 0;
    }).reduce((prev, next) => prev + next, 0);
    
    return {
        completed: krCompleted,
        total: data.length
    };
}

// Compute Objective completion
export function computeObjCompletion(objectives, keyResults) {
    
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


// Compute overall annual metrics
export function computeAnnualMetrics(objectives, keyResults) {

    const annualObjectives = objectives.filter(function(obj) {
        return obj.frequency === 'annual';
    });
    
    const annualKRs = keyResults.filter(function(kr) {
        const objs = annualObjectives.filter(function(obj) {
            return obj.objectiveId === kr.parentObjectiveId;
        });
        return objs.length > 0;
    });

    const tempObjCompletion = computeObjCompletion(annualObjectives, annualKRs);
    const output = {
        avgCompletion: tempObjCompletion.avgCompletion,
        keyResultCompletion: computeKrCompletion(annualKRs),
        objectiveCompletion: {
            completed: tempObjCompletion.completed,
            total: tempObjCompletion.total,
        }
    };

    return output;
}


// Prepare data for teams
export function computeTeamsAnnualMetrics(teams, objectives, keyResults) {
    var output = {};
    var tempObj;
    var parentObj;
    var tempKR;
    var tempObjCompletion;
    for (var t=0; t < teams.length; t++) {
        output[teams[t].teamName] = {};
        tempObj = objectives.filter(function(entry) {
            return (entry.team === teams[t].teamName) && (entry.frequency === 'annual');
        })
        tempKR = keyResults.filter(function(entry) {
            parentObj = objectives.filter(obj => obj.objectiveId === entry.parentObjectiveId)[0];
            return (entry.parentObjectiveTeam === teams[t].teamName) && (
                parentObj.frequency === 'annual'
            );
        })
        tempObjCompletion = computeObjCompletion(tempObj, tempKR);
        output[teams[t].teamName] = {
            avgCompletion: tempObjCompletion.avgCompletion,
            keyResultCompletion: computeKrCompletion(tempKR),
            objectiveCompletion: {
                completed: tempObjCompletion.completed,
                total: tempObjCompletion.total,
            }
        };
    }
    return output;
}

export function prepareTeamData(team, objectives, keyResults) {
    var output = {};
    var freqs = ['annual', 'quarterly', 'monthly'];
    var tempObj;
    var parentObj;
    var tempKR;
    var tempObjCompletion;
    for (var f=0; f < freqs.length; f++) {
        tempObj = objectives.filter(function(entry) {
            return (entry.team === team) && (entry.frequency === freqs[f]);
        })

        tempKR = keyResults.filter(function(entry) {
            parentObj = objectives.filter(obj => obj.objectiveId === entry.parentObjectiveId)[0];
            return (entry.parentObjectiveTeam === team) && (
                parentObj.frequency === freqs[f]
            );
        })
        
        tempObjCompletion = computeObjCompletion(tempObj, tempKR);

        output[freqs[f]] = {
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

    return output;
}