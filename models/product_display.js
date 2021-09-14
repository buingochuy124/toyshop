
var pg_conn = require('./pg_config');


async function display_table()
{
    var product_query = 'SELECT * FROM product';
    var data = await pg_conn.query(product_query);
    var results_string = `
    <h2>Display Data using Node.js & PostgreSQL</h2>
        <table border="1">
        <tr>`;
    let num_fiels = data.fields.length;
    let num_rows = data.rows.length;
    const list_fields = [];
    // Display table header (list of field names)
    for (let i=0; i<num_fiels; i++)
    {
        let field_name = data.fields[i].name;
        list_fields.push(field_name);
        results_string += `<th>${field_name}</th>`;
    }
    results_string += `</tr>`;
    // Display all rows
    for (let i=0; i<num_rows; i++)
    {
        results_string += `<tr>`;
        // display every fields
        for (let j=0; j<num_fiels; j++)
        {
            let cell = data.rows[i][list_fields[j]];
            results_string += `<td>${cell}</td>`;
        }
        results_string += `</tr>`;
    }
    results_string += `</tabel>`;
    return results_string;
};

module.exports = display_table;