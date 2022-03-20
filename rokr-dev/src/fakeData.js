// Configs
var teams = [
    {teamName: 'HQ RAiD', slug: 'hq-raid'},
    {teamName: 'SWiFT', slug: 'swift'},
    {teamName: 'RDO', slug: 'rdo'},
    {teamName: 'CyDef', slug: 'cydef'},
    {teamName: 'SES', slug: 'ses'}
];

// #FAKEDATA
const overallProgressData = {
    objectiveCompletion: { completed: 11, total: 15 },
    keyResultCompletion: { completed: 33, total: 45 }
};

const teamProgressData = [
    {
        progress: Math.random(),
        objectiveCompletion: { completed: 11, total: 15 },
        keyResultCompletion: { completed: 33, total: 45 }
    },
    {
        progress: Math.random(),
        objectiveCompletion: { completed: 11, total: 15 },
        keyResultCompletion: { completed: 33, total: 45 }
    },
    {
        progress: Math.random(),
        objectiveCompletion: { completed: 11, total: 15 },
        keyResultCompletion: { completed: 33, total: 45 }
    },
    {
        progress: Math.random(),
        objectiveCompletion: { completed: 11, total: 15 },
        keyResultCompletion: { completed: 33, total: 45 }
    },
    {
        progress: Math.random(),
        objectiveCompletion: { completed: 11, total: 15 },
        keyResultCompletion: { completed: 33, total: 45 }
    },
];

module.exports = {
    teams,
    overallProgressData,
    teamProgressData
};