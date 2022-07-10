var fs = require('fs');
var http = require('http');
var https = require('https');
//var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
//var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

//var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

// your express configuration here

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
//httpsServer.listen(8443);
const port = 5000;

app.post('/signup', (req, res) => {
    res.sendStatus(200);
})

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