var Mailer = require('nodemailer');
var express = require('express');
var app = express();
// pools will use environment variables
// for connection information
const port = process.env.PORT || 5000;
const { Client } = require('pg');
require('dotenv').config();
const pool = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
    requestCert: true
  }
});

pool.connect();
/*
    create table users (
    email varchar(32) primary key,
    first_name varchar(32) not null,
    last_name varchar(32) not null
    );
    
    create table auth (
    email varchar(32) primary key,
    passhash varchar(32) not null
    );
    
    create table sessions (
    email varchar(32) primary key,
    first_name varchar(32) not null,
    last_name varchar(32) not null,
    session_date char(8) not null,
    session_time char(5) not null,
    game varchar(4) not null
    );
    
    create table interests (
    email varchar(32) primary key,
    games text[] not null
    );
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

app.use(express.json());

app.post('/signup', (req, res) => {
    console.log(req.body);
    pool.query(`select email from auth where email='${req.body.email}'`, 
        (err, result) => {
        if(err) {
            res.status(404);
            return console.error('Error executing query\n', err.stack);
        }
        if (result && result.rows && result.rows.length > 0) {
            res.status(500);
            return console.error('User already exists');
        }
        pool.query(`insert into auth(email,passhash) values('${req.body.email}','${req.body.passhash}'); insert into users(email, first_name, last_name) values ('${req.body.email}','${req.body.first_name}','${req.body.last_name}')`, 
            (err, result) => {
            if (err) {
                res.status(403);
                return console.error('Error executing query', err.stack);
            }
            res.status(200);
        });
    });
});
var transporter = Mailer.createTransport({
    service: 'smtp',
    host: 'playhoboken.com',
    port: 465,

    auth: {
    user: 'noreply@playhoboken.com', 
    pass: process.env.NRPASSWORD,   
    },
});

app.post('/create-session', (req, res) => {
    pool.query(`insert into sessions(email, first_name, last_name, session_date, session_time, game) values ('${req.body.email}','${req.body.first_name}','${req.body.last_name}',${date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear()},${date.getHours()%12+":"+date.getMinutes()},'${req.body.game}')`, 
        (err, result) => {
        if (result && result.rows && result.rows.length > 0) {
            res.status(403);
            return console.error('Session already exists');
        }
        pool.query(`
            select users.email, users.first_name
            from users, interests
            where users.email=interests.email and '${req.body.game}'=any interests.games`, 
            (err, result2) => {
            if (err) {
                res.status(403);
                return console.error('Error');
            }
            else
                res.status(200);
        });
    });
    for(var x=0;x<result.rows.length; x++) {
        var mailOptions = {
            from: 'noreply@playhoboken.com',
            to: result.rows[x].email,
            subject: `${req.body.first_name} is playing one of your favorite games!`,
            text: `Dear ${result2.rows[x].first_name},\n Come by today right now to play your favorite game with ${req.body.first_name}!\n\n Note: This is an automated message, please direct any questions you have to https://playhoboken.com`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200);
            }
        });
    }
});

app.get('/find-session', (req, res) => {
    pool.query(`select first_name, last_name, session_time, game
                from sessions
                where sessions.session_date = '${date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear()}'
                order by session_time
                `, 
        (err, result) => {
        if (err) {
            res.status(403);
            return console.error('Error finding sessions');
        }
        if (result.rows.length > 0) {
            res.status(200);
            res.json({rows:result.rows});
            return console.write('Sent Sessions');
        }
        res.status(404);
        return console.write('No Sessions Found');
        
    });
});

app.get('/my-sessions', (req, res) => {
    pool.query(`select first_name, last_name, session_time, game
                from sessions
                where sessions.email = '${req.email}'
                order by session_time
                `, 
        (err, result) => {
        if (err) {
            res.status(403);
            return console.error('Error finding sessions');
        }
        if (result.rows.length > 0) {
            res.status(200);
            res.json({rows:result.rows});
            return console.write('Sent Sessions');
        }
        res.status(404);
        return console.write('No Sessions Found');
        
    });
});

app.post('/login', (req,res) => {
    pool.query(`select users.email, users.first_name, users.last_name, auth.passhash
    from users inner join auth on (users.email=auth.email)
    where users.email='${req.body.email}' and auth.passhash='${req.body.passhash}'`, 
        (err, result) => {
        if (err) {
            res.status(404);
            return console.error('Error executing query', err.stack);
        }
        res.status(200);
        res.json({email:result.rows[0].email,first_name:result.rows[0].first_name,last_name:result.rows[0].last_name});
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});