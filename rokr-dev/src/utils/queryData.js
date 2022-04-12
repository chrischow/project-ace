// UTILS FOR QUERYING DATA
import $ from 'jquery';

const apiUrl = "youknowwhatitis/rokr/_api/";

export function getDate(date) {
    const rawDate = new Date(date);
    const z = rawDate.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(rawDate - z);
    const localDateISO = localDate.toISOString().slice(0, 10);
    return localDateISO;
}

export function checkDate(date) {
    var dateIsValid = false;
    try {
        var checkDate = new Date(date);
        if (!checkDate.getDate()) {
            throw new Error('Not a proper date.');
        }
        dateIsValid = /\d{4}-\d{2}-\d{2}/.test(date) ? true : false;
    } catch(err){
        dateIsValid = false;
    }
    return dateIsValid;
}

function getListItemEntityTypeFullName(listId) {
    $.ajax({
        url: apiUrl + "web/Lists(guid'" + listId + "')?$select=ListItemEntityTypeFullName",
        method: 'GET',
        headers: {
            'Accept': 'application/json; odata=verbose'
        },
        success: function(data) {
            console.log('Use the value below:');
            console.log(data.d.ListItemEntityTypeFullName);
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

function getXRequestDigestValue() {
    var reqDigest = $.ajax({
        url: apiUrl + 'contextinfo',
        method: 'POST',
        async: false,
        headers: {
            'Accept': 'application/json; odata=verbose'
        },
        success: function(data) {
            return data;
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });

    return reqDigest.responseJSON.d.GetContextWebInformation.FormDigestValue;
}

// -------- READ --------
function getObjectiveData(listId, team, callback) {
    const queryColumns = '$select=Id,Title,objectiveDescription,objectiveStartDate,objectiveStartDate,objectiveEndDate,frequency,team';
    var queryFilter = '';
    if (team !== 'all') {
        queryFilter = "&$filter=team eq '" + team + "'";
    }

    $.ajax({
        url: apiUrl + "web/Lists(guid'" +
            listId + "')/items?" + queryColumns + (queryFilter ? '&' : '') + queryFilter,
        method: 'GET',
        headers: {
            'Accept': 'application/json; odata=verbose'
        },
        async: true,
        success: function(data) {
            var rawData = data.d.reuslts;
            rawData = rawData.map(function(entry) {
                return {
                    objectiveId: entry.Id,
                    objectiveTitle: entry.Title,
                    objectiveDescription: entry.objectiveDescription,
                    objectiveStartDate: getDate(entry.objectiveStartDate),
                    objectiveEndDate: getDate(entry.objectiveEndDate),
                    frequency: entry.frequency,
                    team: entry.team
                };
            });
            callback(rawData);
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

function getKRData(listId, team, callback) {
    const queryColumns = '$select=Id,Title,krDescription,krStartDate,krEndDate,minValue,maxValue,currentValue,owner,parentObjective/Id,parentObjective/team&$expand=parentObjective';
    var queryFilter = '';

    if (team !== 'all') {
        queryFilter = "&$filter=parentObjective/team eq '" + team + "'";
    }

    $.ajax({
        url: apiUrl + "web/Lists(guid'" +
            listId + "')/items?" + queryColumns + (queryFilter ? '&' : '') + queryFilter,
        method: 'GET',
        headers: {
            'Accept': 'application/json; odata=verbose'
        },
        async: true,
        success: function(data) {
            var rawData = data.d.results;
            rawData = rawData.map(function(entry) {
                return {
                    krId: entry.Id,
                    krTitle: entry.Title,
                    krDescription: entry.krDescription,
                    krStartDate: getDate(entry.krStartDate),
                    krEndDate: getDate(entry.krEndDate),
                    minValue: entry.minValue,
                    maxValue: entry.maxValue,
                    currentValue: entry.currentValue,
                    owner: entry.owner,
                    parentObjectiveId: entry.parentObjective.Id,
                    parentObjectiveTeam: entry.parentObjective.team
                };
            });
            callback(rawData);
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

function getUpdateData(listId, krId, callback) {
    var queryColumns = '$select=Id,updateDate,updateText,parentKrId';
    var queryFilter = "&$filter=parentKrId eq '" + krId + "'";

    $.ajax({
        url: apiUrl + "web/Lists(guid'" + listId + "')itmes?" + 
            queryColumns + queryFilter,
        method: 'GET',
        headers: {
            'Accept': 'application/json; odata=verbose'
        },
        async: true,
        success: function(data) {
            var rawData = data.d.results;
            rawData = rawData.map(function(entry) {
                return {
                    updateId: entry.Id,
                    updateDate: getDate(entry.updateDate),
                    updateText: entry.updateText,
                    parentKrId: entry.parentKrId
                };
            });
            callback(rawData);
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

// -------- GET ONE --------
function getOneObjective(listId, objectiveId, callback) {
    const queryColumns = '$select=Id,Title,objectiveDescription,objectiveStartDate,objectiveStartDate,objectiveEndDate,frequency,team';
    var queryFilter = "&$filter=Id eq '" + objectiveId + "'";

    $.ajax({
        url: apiUrl + "web/Lists(guid'" +
            listId + "')/items?" + queryColumns + queryFilter,
        method: 'GET',
        headers: {
            'Accept': 'application/json; odata=verbose'
        },
        async: true,
        success: function(data) {
            var rawData = data.d.reuslts;
            rawData = rawData.map(function(entry) {
                return {
                    objectiveId: entry.Id,
                    objectiveTitle: entry.Title,
                    objectiveDescription: entry.objectiveDescription,
                    objectiveStartDate: getDate(entry.objectiveStartDate),
                    objectiveEndDate: getDate(entry.objectiveEndDate),
                    frequency: entry.frequency,
                    team: entry.team
                };
            });
            callback(rawData[0]);
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

function getOneKR(listId, krId, callback) {
    const queryColumns = '$select=Id,Title,krDescription,krStartDate,krEndDate,minValue,maxValue,currentValue,owner,parentObjective/Id,parentObjective/team&$expand=parentObjective';
    var queryFilter = "&$filter=Id eq '" + krId + "'";

    $.ajax({
        url: apiUrl + "web/Lists(guid'" + listId + "')/items?" + 
            queryColumns + queryFilter,
        method: 'GET',
        headers: {
            'Accept': 'application/json; odata=verbose'
        },
        async: true,
        success: function(data) {
            var rawData = data.d.results;
            rawData = rawData.map(function(entry) {
                return {
                    krId: entry.Id,
                    krTitle: entry.Title,
                    krDescription: entry.krDescription,
                    krStartDate: getDate(entry.krStartDate),
                    krEndDate: getDate(entry.krEndDate),
                    minValue: entry.minValue,
                    maxValue: entry.maxValue,
                    currentValue: entry.currentValue,
                    owner: entry.owner,
                    parentObjectiveId: entry.parentObjective.Id,
                    parentObjectiveTeam: entry.parentObjective.team
                };
            });
            callback(rawData[0]);
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

// -------- UPDATE --------
function updateObjective(listId, objectiveId, payload, reqDigest, listItemEntityTypeFullName, callback) {
    $.ajax({
        url: apiUrl + "web/Lists(guid'" + listId + "')/items" + '(' + objectiveId + ')',
        method: 'POST',
        headers: {
            'Accept': 'application/json; odata=verbose',
            'content-type': 'application/json; odata=verbose',
            'X-RequestDigest': reqDigest,
            'IF-MATCH': '*',
            'X-HTTP-METHOD': 'MERGE'
        },
        data: JSON.stringify({
            '__metadata': {
                'type': listItemEntityTypeFullName
            },
            'Title': payload.objectiveTitle,
            'objectiveDescription': payload.objectiveDescription,
            'objectiveStartDate': payload.objectiveStartDate,
            'objectiveEndDate': payload.objectiveEndDate,
            'team': payload.team,
            'frequency': payload.frequency
        }),
        success: function(data) {
            callback();
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

function updateKeyResult(listId, krId, payload, reqDigest, listItemEntityTypeFullName, callback) {
    $.ajax({
        url: apiUrl + "web/Lists(guid'" + listId + "')/items" + '(' + krId + ')',
        method: 'POST',
        headers: {
            'Accept': 'application/json; odata=verbose',
            'content-type': 'application/json; odata=verbose',
            'X-RequestDigest': reqDigest,
            'IF-MATCH': '*',
            'X-HTTP-METHOD': 'MERGE'
        },
        data: JSON.stringify({
            '__metadata': {
                'type': listItemEntityTypeFullName
            },
            'Title': payload.krTitle,
            'krDescription': payload.krDescription,
            'krStartDate': payload.krStartDate,
            'krEndDate': payload.krEndDate,
            'minValue': payload.minValue,
            'maxValue': payload.maxValue,
            'currentValue': payload.currentValue,
            'owner': payload.owner,
            'parentObjectiveId': payload.parentObjectiveId,
            'parentObjectiveTeam': payload.parentObjectiveTeam
        }),
        success: function(data) {
            callback();
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

function updateUpdate(listId, updateId, payload, reqDigest, listItemEntityTypeFullName, callback) {
    $.ajax({
        url: apiUrl + "web/Lists(guid'" + listId + "')/items" + '(' + updateId + ')',
        method: 'POST',
        headers: {
            'Accept': 'application/json; odata=verbose',
            'content-type': 'application/json; odata=verbose',
            'X-RequestDigest': reqDigest,
            'IF-MATCH': '*',
            'X-HTTP-METHOD': 'MERGE'
        },
        data: JSON.stringify({
            '__metadata': {
                'type': listItemEntityTypeFullName
            },
            'Title': '',
            'updateDate': payload.updateDate,
            'updateText': payload.updateText,
            'parentKrId': payload.parentKrId
        }),
        success: function(data) {
            callback();
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

// -------- CREATE --------
function addObjective(listId, payload, reqDigest, listItemEntityTypeFullName, callback) {
    $.ajax({
        url: apiUrl + "web/Lists(guid'" + listId + "')/items",
        method: 'POST',
        async: true,
        headers: {
            'Accept': 'application/json; odata=verbose',
            'content-type': 'application/json; odata=verbose',
            'X-RequestDigest': reqDigest
        },
        data: JSON.stringify({
            '__metadata': {
                'type': listItemEntityTypeFullName
            },
            'Title': payload.objectiveTitle,
            'objectiveDescription': payload.objectiveDescription,
            'objectiveStartDate': payload.objectiveStartDate,
            'objectiveEndDate': payload.objectiveEndDate,
            'team': payload.team,
            'frequency': payload.frequency
        }),
        success: function(data) {
            callback();
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

function addKeyResult(listId, payload, reqDigest, listItemEntityTypeFullName, callback) {
    $.ajax({
        url: apiUrl + "web/Lists(guid'" + listId + "')/items",
        method: 'POST',
        async: true,
        headers: {
            'Accept': 'application/json; odata=verbose',
            'content-type': 'application/json; odata=verbose',
            'X-RequestDigest': reqDigest
        },
        data: JSON.stringify({
            '__metadata': {
                'type': listItemEntityTypeFullName
            },
            'Title': payload.krTitle,
            'krDescription': payload.krDescription,
            'krStartDate': payload.krStartDate,
            'krEndDate': payload.krEndDate,
            'minValue': payload.minValue,
            'maxValue': payload.maxValue,
            'currentValue': payload.currentValue,
            'owner': payload.owner,
            'parentObjectiveId': payload.parentObjectiveId,
            'parentObjectiveTeam': payload.parentObjectiveTeam
        }),
        success: function(data) {
            callback();
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

function createUpdate(listId, payload, reqDigest, listItemEntityTypeFullName, callback) {
    $.ajax({
        url: apiUrl + "web/Lists(guid'" + listId + "')/items",
        method: 'POST',
        async: true,
        headers: {
            'Accept': 'application/json; odata=verbose',
            'content-type': 'application/json; odata=verbose',
            'X-RequestDigest': reqDigest
        },
        data: JSON.stringify({
            '__metadata': {
                'type': listItemEntityTypeFullName
            },
            'Title': '',
            'updateDate': payload.updateDate,
            'updateText': payload.updateText,
            'parentKrId': payload.parentKrId
        }),
        success: function(data) {
            callback();
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

// -------- DELETE --------
function deleteUpdate(listId, updateId, reqDigest, listItemEntityTypeFullName, callback) {
    $.ajax({
        url: apiUrl + "web/Lists(guid'" + listId + "')/items" + '(' + updateId + ')',
        method: 'POST',
        headers: {
            'Accept': 'application/json; odata=verbose',
            'content-type': 'application/json; odata=verbose',
            'X-RequestDigest': reqDigest,
            'IF-MATCH': '*',
            'X-HTTP-METHOD': 'DELETE'
        },
        success: function(data) {
            callback();
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });
}

// -------- INDEXEDDB FUNCTIONS --------
export function getAllIDB(objectStore, callback) {
    // window.indexedDB = window.indexedDB || window.mozIndexexedDB || 
    //     window.webkitIndexedDB || window.msIndexedDB;
    
    let request = window.indexedDB.open('rokr', 1),
        db,
        tx,
        store,
        data;
    
    request.onsuccess = function(e) {
        db = request.result;

        // Load Objectives
        tx = db.transaction(objectStore, 'readonly');
        store = tx.objectStore(objectStore);

        data = store.getAll();

        tx.oncomplete = function() {
            data = data.result;
            callback(data);
            console.log('Retrieved all entries from ' + objectStore + '. Closing connection to DB.')
            db.close()
        }
    }

    return data;
}

export function getTeamObjectiveDataIBD(teamName, callback){
    let request = window.indexedDB.open('rokr', 1);
    request.onerror = function(e) {
        console.log('Error in query. Error code:', e.target.errorCode);
    };

    request.onsuccess = function(e) {
        var db = request.result;

        // Load team Objectives
        var tx = db.transaction('ObjectivesStore', 'readonly');
        var store = tx.objectStore('ObjectivesStore');
        var teamIndex = store.index(['teamIndex']);
        
        var data = teamIndex.getAll(teamName);

        tx.oncomplete = function() {
            data = data.result;
            callback(data);
            console.log('Retrieved team Objectives. Closing connection to DB.')
            db.close()
        };

        tx.onerror = function(e) {
            console.log('Error in query. Error code:', e.target.errorCode);
        };
    };
}

export function getTeamKeyResultDataIBD(teamName, callback){
    let request = window.indexedDB.open('rokr', 1);
    
    request.onsuccess = function(e) {
        var db = request.result;

        // Load team Key Results
        var tx = db.transaction('KeyResultsStore', 'readonly');
        var store = tx.objectStore('KeyResultsStore');
        var teamIndex = store.index('teamIndex');

        var data = teamIndex.getAll(teamName);

        tx.oncomplete = function() {
            data = data.result;
            callback(data);
            console.log('Retrieved team Key Results. Closing connection to DB.')
            db.close()
        }
    }
}

export function getTeamUpdatesDataIBD(krId, callback){
    let request = window.indexedDB.open('rokr', 1);
    
    request.onsuccess = function(e) {
        var db = request.result;

        // Load team Key Results
        var tx = db.transaction('UpdatesStore', 'readonly');
        var store = tx.objectStore('UpdatesStore');
        var parentKrIdIndex = store.index('parentKrIdIndex');

        var data = parentKrIdIndex.getAll(krId);

        tx.oncomplete = function() {
            data = data.result;
            callback(data);
            console.log('Retrieved team Updates. Closing connection to DB.')
            db.close()
        }
    }
}

export function getOneIBD(objectStore, id, callback) {
    let request = window.indexedDB.open('rokr', 1);
    
    request.onsuccess = function(e) {
        var db = request.result;

        // Load team Key Results
        var tx = db.transaction(objectStore, 'readonly');
        var store = tx.objectStore(objectStore);

        var data = store.get(id);

        tx.oncomplete = function() {
            data = data.result;
            callback(data);
            console.log('Retrieved 1 entry from ' + objectStore + '. Closing connection to DB.')
            db.close()
        }
    }
}

export function putIBD(objectStore, data, callback) {
    let request = window.indexedDB.open('rokr', 1);
    request.onsuccess = function(e) {
        var db = request.result;
        var tx = db.transaction(objectStore, 'readwrite');
        var store = tx.objectStore(objectStore);
        store.put(data);
        tx.oncomplete = function() {
            if (callback) {
                callback();
            }
            console.log('Put 1 entry for ' + objectStore + '. Closing connection to DB.');
            db.close();
        }
    }
}

export function deleteIBD(objectStore, key, callback) {
    let request = window.indexedDB.open('rokr', 1);
    request.onsuccess = function(e) {
        var db = request.result;
        var tx = db.transaction(objectStore, 'readwrite');
        var store = tx.objectStore(objectStore);
        store.delete(key);
        tx.oncomplete = function() {
            if (callback) {
                callback();
            }
            console.log('Deleted 1 entry for ' + objectStore + '. Closing connection to DB.');
            db.close();
        }
    }
}

