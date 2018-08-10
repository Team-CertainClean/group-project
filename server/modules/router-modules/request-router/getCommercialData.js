const pool = require('../../pool');

function getCommercialData(){
    return new Promise((resolve, reject) => {
        try{
            const queryText = `
            select 
                json_build_object('id', request.id, 'location_type', request.location_type_id, 'status', request.status) as request_info,
                json_build_object('first_name', contact.first_name, 'last_name', contact.last_name, 'email', contact.email, 'phone_number', contact.phone_number, 'location_address', contact.location_address) as contact_info
            from request
            join contact on request.id = contact.request_id
            where location_type_id = 2
            order by request.id desc;`;

            pool.query(queryText)
                .then(result => result.rows)
                .catch(error => console.log('Error in getCommercialData: ', error));

        }catch(error){
            throw error.response || error;
        }
    });
}

module.exports = getCommercialData;