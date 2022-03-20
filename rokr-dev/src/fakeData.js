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

const annualOkrs = [
    {
        objectiveId: 1, title: 'Annual O1', description: 'Annual O1 description', progress: 0.12,
        keyResults: [
            {id: 1, title: 'Annual O1 KR1', description: 'Annual O1 KR1 description', progress: 0.11},
            {id: 2, title: 'Annual O1 KR2', description: 'Annual O1 KR2 description', progress: 0.12},
            {id: 3, title: 'Annual O1 KR3', description: 'Annual O1 KR3 description', progress: 0.13},
        ]
    },
    {
        objectiveId: 2, title: 'Annual O2 - w/ empty description', description: '', progress: 0.22,
        keyResults: [
            {id: 4,title: 'Annual O2 KR1', description: 'Annual O2 KR1 description', progress: 0.21},
            {id: 5,title: 'Annual O2 KR2', description: 'Annual O2 KR2 description', progress: 0.22},
            {id: 6,title: 'Annual O2 KR3', description: 'Annual O2 KR3 description', progress: 0.23},
        ]
    },
    {
        objectiveId: 3, title: 'Annual O3 - w/ no description at all', progress: 0.32,
        keyResults: [
            {id: 7, title: 'Annual O3 KR1', description: 'Annual O3 KR1 description', progress: 0.31},
            {id: 8, title: 'Annual O3 KR2', description: 'Annual O3 KR2 description', progress: 0.32},
            {id: 9, title: 'Annual O3 KR3', description: 'Annual O3 KR3 description', progress: 0.33},
        ]
    },
];

const quarterlyOkrs = [
    {
        objectiveId: 4, title: 'Quarterly O1', description: 'Quarterly O1 description', progress: 0.42,
        keyResults: [
            {id: 10, title: 'Quarterly O1 KR1', description: 'Quarterly O1 KR1 description', progress: 0.41},
            {id: 11, title: 'Quarterly O1 KR2', description: 'Quarterly O1 KR2 description', progress: 0.42},
            {id: 12, title: 'Quarterly O1 KR3', description: 'Quarterly O1 KR3 description', progress: 0.43},
        ]
    },
    {
        objectiveId: 5, title: 'Quarterly O2', description: 'Quarterly O2 description', progress: 0.52,
        keyResults: [
            {id: 13, title: 'Quarterly O2 KR1', description: 'Quarterly O2 KR1 description', progress: 0.51},
            {id: 14, title: 'Quarterly O2 KR2', description: 'Quarterly O2 KR2 description', progress: 0.52},
            {id: 15, title: 'Quarterly O2 KR3', description: 'Quarterly O2 KR3 description', progress: 0.53},
        ]
    },
    {
        objectiveId: 6, title: 'Quarterly O3', description: 'Quarterly O3 description', progress: 0.62,
        keyResults: [
            {id: 16, title: 'Quarterly O3 KR1', description: 'Quarterly O3 KR1 description', progress: 0.61},
            {id: 17, title: 'Quarterly O3 KR2', description: 'Quarterly O3 KR2 description', progress: 0.62},
            {id: 18, title: 'Quarterly O3 KR3', description: 'Quarterly O3 KR3 description', progress: 0.63},
        ]
    },
];

const monthlyOkrs = [
    {
        objectiveId: 7, title: 'Monthly O1', description: 'Monthly O1 description', progress: 0.72,
        keyResults: [
            {id: 19, title: 'Monthly O1 KR1', description: 'Monthly O1 KR1 description', progress: 0.71},
            {id: 20, title: 'Monthly O1 KR2', description: 'Monthly O1 KR2 description', progress: 0.72},
            {id: 21, title: 'Monthly O1 KR3', description: 'Monthly O1 KR3 description', progress: 0.73},
        ]
    },
    {
        objectiveId: 8, title: 'Monthly O2', description: 'Monthly O2 description', progress: 0.82,
        keyResults: [
            {id: 22, title: 'Monthly O2 KR1', description: 'Monthly O2 KR1 description', progress: 0.81},
            {id: 23, title: 'Monthly O2 KR2', description: 'Monthly O2 KR2 description', progress: 0.82},
            {id: 24, title: 'Monthly O2 KR3', description: 'Monthly O2 KR3 description', progress: 0.83},
        ]
    },
    {
        objectiveId: 9, title: 'Monthly O3', description: 'Monthly O3 description', progress: 0.92,
        keyResults: [
            {id: 25, title: 'Monthly O3 KR1', description: 'Monthly O3 KR1 description', progress: 0.91},
            {id: 26, title: 'Monthly O3 KR2', description: 'Monthly O3 KR2 description', progress: 0.92},
            {id: 27, title: 'Monthly O3 KR3', description: 'Monthly O3 KR3 description', progress: 0.93},
        ]
    },
];

const teamData = {
    annual: {
        objectiveCompletion: {completed: 1, total: 3},
        keyResultCompletion: {completed: 3, total: 9},
        avgCompletion: 0.22,
        okrs: annualOkrs
    },
    quarterly: {
        objectiveCompletion: {completed: 2, total: 6},
        keyResultCompletion: {completed: 6, total: 18},
        avgCompletion: 0.52,
        okrs: quarterlyOkrs
    },
    monthly: {
        objectiveCompletion: {completed: 3, total: 9},
        keyResultCompletion: {completed: 9, total: 27},
        avgCompletion: 0.82,
        okrs: monthlyOkrs
    }
    
};

module.exports = {
    teams,
    overallProgressData,
    teamProgressData,
    teamData
};