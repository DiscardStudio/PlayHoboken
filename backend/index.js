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
/*  postgresql
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
        email varchar(32) not null,
        first_name varchar(32) not null,
        last_name varchar(32) not null,
        session_date varchar(10) not null,
        session_time varchar(5) not null,
        game varchar(16) not null,
        active boolean not null
    );
    
    create table interests (
        email varchar(32) primary key,
        games text[] not null
    );

    //For testing creation of database. Will output nothing except columns until users begin to create sessions.
    with ua as (
        select users.email, users.first_name, users.last_name, auth.passhash
        from users inner join auth on (users.email=auth.email)
    ), iss as (
        select sessions.email, sessions.game, sessions.first_name, sessions.last_name, sessions.session_date, sessions.session_time
        from sessions full outer join interests on (sessions.email=interests.email)
    )
    select iss.email, iss.first_name, iss.last_name, iss.session_time,iss.session_date, ua.passhash, iss.game
    from iss inner join ua on(ua.email=iss.email)
*/

const callQuery = sql => {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
}

app.use(express.json());

app.get('/', (req, res) => res.status(200));

app.post('/signup', async (req, res) => {
    const result = await callQuery(`select email from auth where email='${req.body.email}'`)
    if(result.stack) {
        await res.status(404);
        return console.error('Error executing query\n', err.stack);
    } else if (result && result.rows && result.rows.length > 0) {
        await res.status(500);
        return console.error('User already exists');
    } else {
        const result2 = await callQuery(`
        insert into auth(email,passhash)
        values('${req.body.email}','${req.body.passhash}');
        insert into users(email, first_name, last_name)
        values ('${req.body.email}','${req.body.first_name}','${req.body.last_name}');
        insert into interests(email, interests)
        values ('${req.body.email}','{}');`)
        if (result2.stack) {
            await res.status(403);
            return console.error('Error executing query', result2.stack);
        } else {
            await res.json({
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name
            });
            return console.log("Success");
        }
    }
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

/*  notification template via email for /create-session
        pool.query(`
            select users.email, users.first_name
            from users, interests
            where users.email=interests.email and '${req.body.game}'=any(interests.games)`, 
            (err, result2) => {
            if (err) {
                res.status(403);
                return console.error(err.stack);
            } else{
                for(var x=0;x<result2.rows.length; x++) {
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
                return console.log("Success");
            }
        });*/
app.put('/create-session', async (req, res) => {
    const date = new Date();
    var today = date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear();
    var time = '';
    if(date.getHours() > 16)
        time += date.getHours() - 16;
    else
        time += date.getHours() - 4;
    time+=":"
    if(date.getMinutes() < 10)
        time += 0;
    time+=date.getMinutes();
    const result = await callQuery(`
    insert into sessions(
        email,
        first_name,
        last_name,
        session_date,
        session_time,
        game,
        active)
    values (
        '${req.body.email}',
        '${req.body.first_name}',
        '${req.body.last_name}',
        '${today}',
        '${time}',
        '${req.body.game}',
        TRUE);`);
        if (result && result.rows) {
            await res.status(403);
            return console.error('Session already exists');
        } else {
            const checkInterest = await callQuery(`
                select games
                from interests
                where interests.email='${req.body.email}';
            `);
            if(checkInterest.rows !== undefined){
                var interestExists=false;
                for(var x=0;x<checkInterest.rows.games.length; x++) {
                    if(checkInterest.rows.games[x] === req.body.game){
                        interestExists=true;
                        break;
                    }
                }
                if(!interestExists)
                    await callQuery(`
                        update interests
                        set games = '{${req.body.passhash} ${checkInterest.rows.games.map(x=> `, {${x}}`)}}'
                        where email = '${req.body.email}';
                    `);
            }
            await res.status(200);
        }
});

app.get('/find-session', async (req, res) => {
    const date = new Date();
    var today = date.getMonth()+"/"+date.getDay()+"/"+date.getFullYear();
    const result = await callQuery(`
                select first_name, last_name, session_time, game
                from sessions
                where sessions.session_date='${today}' and sessions.active=TRUE
                order by session_time desc
                `)
    if (result.stack) {
        await res.status(403);
        return console.error('Error finding sessions');
    } else if (result.rows.length > 0) {
        await res.json({rows: result.rows});
        return console.log('Sent Sessions');
    } else {
        await res.json({});
        return console.log("Not found");
    }
});

app.post('/my-sessions', async (req, res) => {
    const result = await callQuery(`
                select first_name, last_name, session_time, game
                from sessions
                where sessions.email = '${req.body.email}'
                order by session_time desc
                `)
    if (result.stack) {
        await res.status(403);
        return console.error('Error finding sessions');
    } else if (result.rows.length > 0) {
        await result.rows.map(x=>console.table(x));
        await res.json({rows: result.rows});
        return console.log('Sent Sessions');
    } else {
        await res.json({});
        return console.log("Not found");
    }
});

app.post('/login', async (req,res) => {
    const result = await callQuery(`select users.email, users.first_name, users.last_name
    from users inner join auth on (users.email=auth.email)
    where users.email='${req.body.email}' and auth.passhash='${req.body.passhash}'`);
    if(result.stack || result===undefined) {
        await res.status(404);
        return console.error('Error executing query', result.stack);
    } else {
        await res.json(result.rows[0]);
        return console.log(result.rows[0]);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});