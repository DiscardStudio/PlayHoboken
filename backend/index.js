var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = process.env.privateKey;
var certificate = process.env.certificate;

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();
require('dotenv').config();
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
    pool.query(`select email from auth on where email=${req.query.email}`, 
        (err, result) => {
        if (result && result.rows && result.rows.length > 0) {
            res.sendStatus(500);
            return console.error('User already exists');
        }
        pool.query(`insert into auth(email,passhash) values(${req.query.email},${req.query.passhash}); insert into users(email, first_name, last_name) values (${req.query.email},${req.query.first_name},${req.query.last_name})`, 
            (err, result) => {
            if (err) {
                res.sendStatus(403);
                return console.error('Error executing query', err.stack);
            }
            res.sendStatus(200);
        });
    });
});

/*var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com',
    pass: 'yourpassword'
  }
});

var mailOptions = {
  from: 'youremail@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

*/

app.post('/create-session', (req, res) => {
    pool.query(`insert into sessions(email, first_name, last_name, timeslot, game) values (${req.query.email},${req.query.first_name},${req.query.last_name},${new Date(date.getTime() + (-300)*60*1000)},${req.query.game})`, 
        (err, result) => {
        if (result && result.rows && result.rows.length > 0) {
            res.sendStatus(403);
            return console.error('Session already exists');
        }
    });
    /*
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    */
});

app.get('/login', (req,res) => {
    pool.query(`select users.email, users.first_name, users.last_name, auth.passhash
    from users inner join auth on (users.email=auth.email)
    where users.email=${req.query.email} and auth.passhash=${req.query.passhash}`, 
        (err, result) => {
        if (err) {
            res.sendStatus(404);
            return console.error('Error executing query', err.stack);
        }
        res.json(result.rows[0]);
    });
});

app.get('/user', (req,res) => {
    pool.query(`select email, first_name, last_name
    from users
    where email=${req.query.email}`, 
        (err, result) => {
        if (err) {
            res.sendStatus(404);
            return console.error('Error executing query', err.stack);
        }
        res.json(result.rows[0]);
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});