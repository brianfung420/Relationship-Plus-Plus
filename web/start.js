const express = require('express');
const app = express(); 
const path = require('path');
var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '')));
app.get('/', function (req, res) { 
	console.log("Get file");
    res.sendfile(__dirname + '/game/dist/index.html'); 
});

app.listen(port, function() {
    console.log("Listening on Port 8080");
});