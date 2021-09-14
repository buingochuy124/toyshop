var pg_conn = require('./pg_config');

async function authen(user, pass)
{   
    var authenticated = false;
    const acc_query = 
    {
        text: 'SELECT * FROM account WHERE account_name = $1 AND account_pass=$2',
        values: [user, pass]
    };
    var query_data = await pg_conn.query(acc_query);
    if (query_data.rows.length==1)
    {
        authenticated = true;
    }
    console.log(authenticated);
    return authenticated;
}

module.exports = authen;