// UTILS FOR QUERYING DATA
import $ from 'jquery';

export function getDate(date) {
    const rawDate = new Date(date);
    const z = rawDate.getTimezoneOffset() * 60 * 1000;
    const localDate = new Date(rawDate - z);
    const localDateISO = localDate.toISOString().slice(0, 10);
    return localDateISO;
}

function getObjectiveData(listId, team) {
    const queryColumns = '$select=Id,Title,objectiveDescription,objectiveStartDate,objectiveStartDate,objectiveEndDate,frequency,team';
    var queryFilter = '';
    if (team !== 'all') {
        queryFilter = "&$filter=team eq '" + team + "'";
    }

    var rawData = $.ajax({
        url: "https://portal.mis.defence.gov.sg/rsaf/RDO/private_api/web/Lists(guid'" +
            listId + "')/items?" + queryColumns + (queryFilter ? '&' : '') + queryFilter,
        method: 'GET',
        headers: {
            'Accept': 'application/json; odata=verbose'
        },
        async: false,
        success: function(data) {
            return data;
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });

    rawData = rawData.responseJSON.d.results;

    const output = rawData.map(function(entry) {
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

    return output
}

function getKRData(listId, team) {
    const queryColumns = '$select=Id,Title,krDescription,krStartDate,krEndDate,minValue,maxValue,currentValue,parentObjective/Id,parentObjective/team&$expand=parentObjective';
    var queryFilter = '';

    if (team !== 'all') {
        queryFilter = "&$filter=parentObjective/team eq '" + team + "'";
    }

    var rawData = $.ajax({
        url: "https://portal.mis.defence.gov.sg/rsaf/RDO/private/_api/web/Lists(guid'" +
            listId + "')/items?" + queryColumns + (queryFilter ? '&' : '') + queryFilter,
        method: 'GET',
        headers: {
            'Accept': 'application/json; odata=verbose'
        },
        async: false,
        success: function(data) {
            return data;
        },
        error: function(error) {
            console.log(JSON.stringify(error));
        }
    });

    const output = rawData.map(function(entry) {
        return {
            krId: entry.Id,
            krTitle: entry.title,
            krDescription: entry.krDescription,
            krStartDate: getDate(entry.krStartDate),
            krEndDate: getDate(entry.krEndDate),
            minValue: entry.minValue,
            maxValue: entry.maxValue,
            currentValue: entry.currentValue,
            parentObjectiveId: entry.parentObjective.Id,
            parentObjectiveTeam: entry.parentObjective.team
        };
    });

    return output;
}