// Configs
var fakeDataTeams = [
    {teamName: 'HQ RAiD', slug: 'hq-raid'},
    {teamName: 'PAB', slug: 'pab'},
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

function generateData(teams){
    // var freqs = ['annual', 'quarterly', 'monthly'];
    var freqs = ['annual'];
    var counter = 1;
    var objs = [];
    var objName;
    var endDate;
    
    for (var t=0; t < teams.length; t++) {
        for (var f=0; f < freqs.length; f++) {
            for (var i=0; i < 3; i++) {
                objName = teams[t].teamName + ' O' + (i+1) + ' ' + freqs[f];

                if (freqs[f] === 'annual'){
                    endDate = '2023-03-31';
                } else if (freqs[f] === 'quarterly') {
                    endDate = '2022-06-30';
                } else {
                    endDate = '2022-04-30';
                }

                objs.push({
                    objectiveId: counter,
                    objectiveTitle: objName,
                    objectiveDescription: objName + ' description',
                    objectiveStartDate: '2022-04-01',
                    objectiveEndDate: endDate,
                    team: teams[t].teamName,
                    frequency: freqs[f]
                });
                counter++;
            }
        }
    }

    var staff = {};
    var currTeam;

    for (var t=0; t<teams.length; t++) {
        currTeam = teams[t].teamName;
        staff = {
            ...staff,
            [currTeam]: []
        };

        for (var s=0; s<4; s++) {
            staff[currTeam].push(currTeam + ' Staff ' + (s+1));
        }
    }

    var maxs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    var krs = [];
    var krName;
    counter = 1;
    var randIdx;
    var randMax;
    var randIdxStaff;
    var randStaff;

    for (var i=0; i<objs.length; i++) {
        for (var kr=0; kr < 3; kr++){
            krName = objs[i].objectiveTitle + ' KR ' + (kr+1);
            randIdx = Math.floor(Math.random() * maxs.length);
            randMax = maxs[randIdx];
            randIdxStaff = Math.floor(Math.random() * 4);
            randStaff = staff[objs[i].team][randIdxStaff];

            if (freqs[f] === 'annual'){
                endDate = '2023-03-31';
            } else if (freqs[f] === 'quarterly') {
                endDate = '2022-06-30';
            } else {
                endDate = '2022-04-30';
            }
            
            krs.push({
                krId: counter,
                krTitle: krName,
                krDescription: krName + ' description',
                krStartDate: '2022-04-01',
                krEndDate: endDate,
                minValue: 0,
                maxValue: randMax,
                currentValue: Math.random() > 0.6 ? Math.floor(Math.random() * randMax) : randMax,
                parentObjectiveId: objs[i].objectiveId,
                parentObjectiveTeam: objs[i].team,
                owner: randStaff
            });
            counter ++;
        }
    }

    var updates = [];
    const updateTexts = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Mauris blandit metus eget urna blandit, vitae malesuada dui euismod.",
        "Pellentesque vulputate diam sit amet lectus ultricies efficitur.",
        "Aenean congue nulla nec sapien finibus tristique.",
        "Phasellus sit amet sapien venenatis, euismod nisl eu, venenatis tellus.",
        "Nulla euismod libero quis velit fringilla accumsan.",
        "Nulla nec ipsum sodales, scelerisque nibh at, semper lorem.",
        "Pellentesque sit amet orci pulvinar metus bibendum elementum vel nec ex.",
        "Sed finibus risus condimentum orci pulvinar volutpat.",
        "Vivamus vehicula lacus eu nunc sagittis porta.",
        "Nullam scelerisque mi vitae ante mollis fermentum.",
        "Pellentesque ultricies ante et blandit bibendum.",
        "In bibendum tortor quis commodo pharetra.",
        "Duis pretium augue id luctus porttitor.",
        "Vivamus viverra diam ut tempor aliquam.",
        "Aenean pretium lacus sagittis finibus molestie.",
        "Proin vel nisl in urna vehicula dapibus vel id mauris.",
        "Proin mollis lacus hendrerit felis euismod consequat.",
        "Etiam volutpat sapien quis lectus fringilla fermentum.",
        "Donec dignissim justo eu ante rutrum dictum.",
        "Morbi accumsan eros ut efficitur iaculis.",
        "In feugiat nunc a dolor vestibulum, a varius urna interdum.",
        "Nunc in lectus eu turpis fermentum egestas.",
        "Vivamus cursus dolor nec mauris ornare tempus.",
        "Curabitur quis mauris ullamcorper, aliquet tortor id, aliquet augue.",
        "Etiam tempor arcu vitae aliquam auctor.",
        "Nullam ut sapien posuere, suscipit ante ultricies, semper lectus.",
        "Vestibulum sed augue placerat, pretium sem a, interdum tellus.",
        "In et diam facilisis, suscipit justo quis, molestie felis.",
        "Pellentesque nec erat pharetra, bibendum justo quis, cursus nulla.",
        "Morbi ornare augue quis lorem maximus, quis placerat metus venenatis.",
        "Donec ac lorem nec nunc faucibus dictum eu sed lorem.",
        "Phasellus ultrices neque ac dolor tempus, vel tempus risus elementum.",
        "Nunc id nulla vel ex viverra tempus.",
        "Mauris hendrerit sapien ut ante fermentum, eu interdum libero dictum.",
        "Vestibulum cursus leo vitae aliquet pulvinar.",
        "Curabitur tincidunt neque sit amet mi porttitor, nec mattis orci ultricies.",
        "Praesent tempor enim efficitur tincidunt mollis."
    ];

    const dates = [
        '2022-01-01', '2022-01-03', '2022-01-05', '2022-01-07', '2022-01-09',
        '2022-01-11', '2022-01-13', '2022-01-15', '2022-01-17', '2022-01-19',
        '2022-01-21', '2022-01-23', '2022-01-25', '2022-01-27', '2022-01-29',
        '2022-02-01', '2022-02-03', '2022-02-05', '2022-02-07', '2022-02-09',
        '2022-02-11', '2022-02-13', '2022-02-15', '2022-02-17', '2022-02-19',
        '2022-02-21', '2022-02-23', '2022-02-25', '2022-02-27',
        '2022-03-01', '2022-03-03', '2022-03-05', '2022-03-07', '2022-03-09',
        '2022-03-11', '2022-03-13', '2022-03-15', '2022-03-17'
        
    ]


    counter = 1
    for (i=0; i < krs.length; i++) {
        for (var j=0; j < 20; j++) {
            randIdx = Math.floor(Math.random() * updateTexts.length);
            updates.push({
                updateId: counter,
                updateText: krs[i].krTitle + ' ' + updateTexts[randIdx],
                updateDate: dates[Math.floor(Math.random() * dates.length)],
                parentKrId: krs[i].krId
            });
            counter++
        }
    }


    return { 'objectives': objs, 'keyResults': krs, 'updates': updates };
}

const allData = generateData(fakeDataTeams);

// IndexedDB functions
function setupDB(allData) {
    window.indexedDB = window.indexedDB || window.mozIndexexedDB || 
        window.webkitIndexedDB || window.msIndexedDB;
    
    let request = window.indexedDB.open('rokr', 1),
        db,
        tx,
        store,
        index;
    
    request.onupgradeneeded = function(e) {
        let db = request.result;
        
        db.onerror = function() {
            console.log('Error creating database. Error code: ', e.target.errorCode);
        }

        // Create Objectives object store
        var store = db.createObjectStore('ObjectivesStore', {
            keyPath: 'objectiveId', autoIncrement: true
        });
        var index = store.createIndex('objectiveIdIndex', 'objectiveId', {unique: true});
        index = store.createIndex('teamIndex', 'team', {unique: false});

        // Create KeyResults object store
        store = db.createObjectStore('KeyResultsStore', {
            keyPath: 'krId', autoIncrement: true
        });
        index = store.createIndex('krIdIndex', 'krId', {unique: true});
        index = store.createIndex('teamIndex', 'parentObjectiveTeam', {unique: false});

        // Create Updates object store
        store = db.createObjectStore('UpdatesStore', {
            keyPath: 'updateId', autoIncrement: true
        });
        index = store.createIndex('updateIdIndex', 'updateId', {unique: true});

        // Load Objectives
        tx = db.transaction('ObjectivesStore', 'readwrite');
        store = tx.objectStore('ObjectivesStore');
        store.clear();

        for (var i=0; i < allData.objectives.length; i++) {
            var {objectiveId, ...newData} = allData.objectives[i];
            store.put(newData);
        }

        tx.oncomplete = function() {
            console.log('Loaded Objectives.');
        }

        // Load Key Results
        tx = db.transaction('KeyResultsStore', 'readwrite');
        store = tx.objectStore('KeyResultsStore');
        store.clear();

        for (var i=0; i < allData.keyResults.length; i++) {
            var {krId, ...newData} = allData.keyResults[i];
            store.put(newData);
        }

        tx.oncomplete = function() {
            console.log('Loaded Key Results.')
        }

        // Load Updates
        tx = db.transaction('UpdatesStore', 'readwrite');
        store = tx.objectStore('UpdatesStore');
        store.clear();

        for (var i=0; i < allData.updates.length; i++) {
            var {objectiveId, ...newData} = allData.updates[i];
            store.put(newData);
        }

        tx.oncomplete = function() {
            console.log('Loaded Updates.')
            console.log('Closing connection to DB.')
            db.close()
        }

    }
    
    request.onerror = function(e) {
        console.log('Error opening database. Error code: ', e.target.errorCode);
    };
    
    request.onsuccess = function(e) {
        db = request.result;
        console.log('Database ok.');
    }
}


module.exports = {
    fakeDataTeams,
    overallProgressData,
    teamProgressData,
    teamData,
    allData,
    setupDB
};