const Pool = require('pg').Pool;

const pg_conn = new Pool (
    {
        user: 'ltrrflfblpeuev',
        host: 'ec2-3-225-204-194.compute-1.amazonaws.com',
        database: 'db41pt58oeq3s3',
        password: '8568019745c1de166b6404f8de722000ee3ac0f2a113f0c7bc136294a130256a',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
          },
    });

module.exports = pg_conn;