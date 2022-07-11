var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = process.env.privateKey;
var certificate = process.env.certificate;

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

const { Pool } = require('pg')
// pools will use environment variables
// for connection information
const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
});
/*
with ua as (
    select users.email, users.first_name, users.last_name, auth.passhash
    from users inner join auth on (users.email=auth.email)
), iss as (
    select sessions.email, sessions.games, sessions.first_name, sessions.last_name, sessions.timeslot
    from sessions full outer join interests on (sessions.email=interests.email)
)
select iss.email, iss.first_name, iss.last_name, iss.timeslot, ua.passhash, iss.games
from iss inner join ua on(ua.email=iss.email)
*/

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8000);
httpsServer.listen(8443);
const port = 5000;

app.post('/signup', (req, res) => {
    res.json({val:"nice"});
})

app.get('/login', (req,res) => {
    pool.query(`select users.email, users.first_name, users.last_name, auth.passhash
    from users inner join auth on (users.email=auth.email)
    where users.email=${req.query.email} and auth.passhash=${req.query.passhash}`, 
        (err, result) => {
        if (err) {
            res.sendStatus(404);
            return console.error('Error executing query', err.stack)
        }
        res.json(result.rows[0])
    })
});

app.get('/user', (req,res) => {
    res.json({
        email: "michael@playhoboken.com",
        first_name: "Mike",
        last_name: "Sanchez"
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
