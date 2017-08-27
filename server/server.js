const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const livereload = require('livereload');
const _ = require('../bower_components/underscore/underscore');

const bodyParser = require('body-parser');

var userCollection = require('./mockusers');



app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
});
app.use(bodyParser.json()); // for parsing application/json
app.use("/bower_components", express.static(__dirname + '/../bower_components'));
app.use("/app", express.static(__dirname + '/../app'));


// create a friend connection
app.post('/createConnection/', function (req, res) {
    let users = req.body.friends;
    userCollection.createFriend(users[0], users[1]);
    res.send({ success: true });
});

// Get all friends
app.post('/getFriends', function (req, res) {
    let email = req.body.email;
    let friends = userCollection.getFriends(email);
    res.send({
        success: true,
        friends: friends,
        count: friends.length
    });
});

//Get Common Friends
app.post('/getCommonFriends', function (req, res) {
    let [user1, user2] = req.body.friends;
    let friends = userCollection.getCommonFriends(user1, user2);
    res.send({
        success: true,
        friends: friends,
        count: friends.length
    });

});

//Subscribe To Updates
app.post('/subscribe', function (req, res) {
    let requester = req.body.requester;
    let target= req.body.target;

    userCollection.subscribe(requester,target);
    res.send({
        success: true
    });

});

//Block User
app.post('/blockUpdates', function (req, res) {
    let requester = req.body.requester;
    let target= req.body.target;

    userCollection.block(requester,target);
    res.send({
        success: true
    });

});

// retrieve all email addresses that can receive updates from an email address
app.post('/getEmailAddressForUpdates', function (req, res) {
    let sender = req.body.sender;
    let text= req.body.text;
    let recipients=userCollection.getEmailAddressForUpdates(sender,text);

    res.send({
        success: true,
        recipients:recipients
    });

});

var server = app.listen(3000, function () {
    console.log('App listening on port 3000!');
});

module.exports = server;

