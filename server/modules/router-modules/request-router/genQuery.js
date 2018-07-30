const request_Queries = require('./requestQueries');

function genQuery(reqBody){
    let query = {text: '', array: []};

    query = processBody(reqBody, query);



    return query;
}

function processBody(body, query){

}

module.exports = genQuery;