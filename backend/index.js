const express = require('express');
const app = express();
const port = 5000;

app.get('/signup', (req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})