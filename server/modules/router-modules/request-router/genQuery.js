function genQuery(reqBody){
    let query = {text: '', array: []};
    let body = reqBody;
    body = sanitizeBody(body);
    query = processBody(body, query);
    return query;
}

function processBody(body, query){

}

let recursion = 0;

// Recursive function for sanitizing user inputs in request body
function sanitizeBody(body){

    recursion += 1;

    let sanBody = body;

    console.log(`sanBody recursion ${recursion}`);

    for(let object in sanBody){

        console.log(sanBody[object]);

        if(typeof(sanBody[object]) === 'string'){

            let sanString = sanBody[object];

            sanString = sanitizeString(sanString);


            sanBody[object] = sanString;

        }else if(Array.isArray(sanBody[object])) {

            console.log("In array type");

            for(let i = 0; i < sanBody[object].length; i++){

                console.log("Index of array: ", i);

                if(typeof(object[i]) === 'object'){

                    console.log("nested object: ", sanBody[object][i]);

                    sanitizeBody(sanBody[object][i]);

                } else if(Array.isArray(sanBody[object][i])){

                    console.log("nested array: ", sanBody[object][i]);

                    sanitizeBody(sanBody[object][i]);

                } else {

                    if(typeof(object[i]) === 'string'){

                        console.log("nested string: ", sanBody[object][i]);

                        sanBody[object][i] = sanitizeString(sanBody[object][i]);

                        console.log(object[i]);

                    }
                }
            }
        } else if(typeof(sanBody[object]) == 'object'){
            console.log("In object type");
            sanitizeBody(sanBody[object]);
            // for(let prop in object){
            //     console.log("object type property: ", object[prop]);
            //     if(typeof(object[prop]) == 'object'){
            //         console.log("object: ", object[prop]);
            //         sanitizeBody(object[prop]);
            //     } else {
            //         if(typeof(object[prop]) == 'string'){
            //             console.log("string: ", object[prop]);
            //             object[prop] = sanitizeString(object[prop]);
            //             console.log("sanString: ",  object[prop]);
            //         }
            //     }
            // }
        }
    }
    return sanBody;
}

function sanitizeString(string){
    console.log("Sanitize String");
    let sanString = string;
    console.log(string);
    for(let i = 0; i < sanString.length; i++){
        if(sanString[i] === '"'){
            console.log("doublequote found!: ", sanString[i]);
            sanString.replace(/\"/g,'\\"');
            console.log(sanString);
        } else if(sanString[i] === "'"){
            console.log("singlequote found!: ", sanString[i]);
            console.log(sanString.replace(/\'/g,"\\'"));
            console.log(sanString);
        }
    }
    return sanString;
}


const testObject = {
    num: 0,
    string1: "'Hello",
    string2: 'Goodbye"',
    array: ['sup"', {string3: 'nestedObject"'}, 0],
    object: {nestedObject: { num: 10 }, string4: '"string'}
}
console.log(testObject);
console.log(sanitizeBody(testObject));
console.log("iterations: ", recursion);

module.exports = genQuery;