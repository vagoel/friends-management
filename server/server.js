const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const livereload = require('livereload');

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/../index.html'));
});
app.use("/bower_components", express.static(__dirname + '/../bower_components'));
app.use("/app", express.static(__dirname + '/../app'));

var server = app.listen(3000, function () {
	console.log('App listening on port 3000!');
});

module.exports = server;
