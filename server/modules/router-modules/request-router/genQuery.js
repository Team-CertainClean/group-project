function genQuery(requestData){
    let queryArray = [];


    queryArray.unshift('Begin;');
    queryArray.push('Commit;');
    let queryText = queryArray.join(' ');
    return queryText;
}

module.exports = genQuery;