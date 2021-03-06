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
function generateData(teams){
    var freqs = ['annual', 'quarterly', 'monthly'];
    // var freqs = ['annual'];
    var counter = 1;
    var objs = [];
    var objName;
    var endDate;
    
    for (var t=0; t < teams.length; t++) {
        for (var f=0; f < freqs.length; f++) {
            for (var i=0; i < 3; i++) {
                if (freqs[f] === 'monthly') {
                    for (var s=0; s < 3; s++) {
                        objName = teams[t].teamName + ' Staff ' + (3-s) + ' O' + (i+1);
                        endDate = '2022-04-30';
        
                        objs.push({
                            objectiveId: counter,
                            objectiveTitle: objName,
                            objectiveDescription: objName + ' description',
                            objectiveStartDate: '2022-04-01',
                            objectiveEndDate: endDate,
                            team: teams[t].teamName,
                            owner: 'Staff ' + (3-s),
                            frequency: freqs[f]
                        });
                        counter++;
                    }
                } else {
                    objName = teams[t].teamName + ' O' + (i+1) + ' ' + freqs[f];
                    endDate = freqs[f] === 'annual' ? '2023-03-31': '2022-06-30';
    
                    objs.push({
                        objectiveId: counter,
                        objectiveTitle: objName,
                        objectiveDescription: objName + ' description',
                        objectiveStartDate: '2022-04-01',
                        objectiveEndDate: endDate,
                        team: teams[t].teamName,
                        owner: '',
                        frequency: freqs[f]
                    });
                    counter++;
                }
            }
        }
    }

    var maxs = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    var krs = [];
    var krTitle;
    counter = 1;
    var randIdx;
    var randMax;
    var freq;

    for (i=0; i<objs.length; i++) {
        freq = objs[i].frequency;

        for (var kr=0; kr < 3; kr++){
            krTitle = objs[i].objectiveTitle + ' KR' + (kr+1);
            randIdx = Math.floor(Math.random() * maxs.length);
            randMax = maxs[randIdx];

            if (freq === 'annual'){
                endDate = '2023-03-31';
            } else if (freq === 'quarterly') {
                endDate = '2022-06-30';
            } else {
                endDate = '2022-04-30';
            }
            
            krs.push({
                krId: counter,
                krTitle: krTitle,
                krDescription: krTitle + ' description',
                krStartDate: '2022-04-01',
                krEndDate: endDate,
                minValue: 0,
                maxValue: randMax,
                currentValue: Math.random() > 0.6 ? Math.floor(Math.random() * randMax) : randMax,
                parentObjectiveId: objs[i].objectiveId,
                parentObjectiveTeam: objs[i].team
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
        '2022-03-11', '2022-03-13', '2022-03-15', '2022-03-17', '2022-03-19',
        '2022-03-21', '2022-03-23', '2022-03-25', '2022-03-27', '2022-03-29',
        '2022-04-01', '2022-04-04', '2022-04-05', '2022-04-07', '2022-04-09',
        '2022-04-11', '2022-04-13', '2022-04-15', '2022-04-17', '2022-04-19',
        '2022-04-21', '2022-04-23', '2022-04-25',
        // '2022-04-27', '2022-04-29',
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
    // window.indexedDB = window.indexedDB || window.mozIndexexedDB || 
    //     window.webkitIndexedDB || window.msIndexedDB;
    
    let request = window.indexedDB.open('rokr', 1),
        db,
        store,
        index,
        tx;
    
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
        store.createIndex('krIdIndex', 'krId', {unique: true});
        store.createIndex('teamIndex', 'parentObjectiveTeam', {unique: false});

        // Create Updates object store
        store = db.createObjectStore('UpdatesStore', {
            keyPath: 'updateId', autoIncrement: true
        });
        store.createIndex('updateIdIndex', 'updateId', {unique: true});
        store.createIndex('updateDateIndex', 'updateDate', {unique: false});
        store.createIndex('parentKrIdIndex', 'parentKrId', {unique: false});

        e.target.transaction.oncomplete = function() {
            // Run the code below for the FIRST TIME only
            console.log('Initialisation of database: loading data.')
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
            
            for (i=0; i < allData.keyResults.length; i++) {
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

            for (i=0; i < allData.updates.length; i++) {
                var {objectiveId, ...newData} = allData.updates[i];
                store.put(newData);
            }

            tx.oncomplete = function() {
                console.log('Loaded Updates.')
                console.log('Closing connection to DB.')
                db.close()
            }
        };
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
    allData,
    setupDB
};

