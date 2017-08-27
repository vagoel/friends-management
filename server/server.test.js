var expect = require('chai').expect;
var request = require('supertest');


describe('API Call Works', function () {
    var server, userCollection;
    beforeEach(function () {
        server = require('./server');
        userCollection = require('./mockusers');
    });
    afterEach(function () {
        server.close();
    });
    it('should work', function () {
        expect(true).to.be.true;
    });
    it('responds to /', function (done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
    it('should create a friend connection between two ', function (done) {
        request(server)
            .post('/createConnection')
            .send({
                friends: ["andy@example.com", "john@example.com"]
            })
            .expect(200)
            .expect(function (res) {
                expect(res.body.success).to.be.true;
            })
            .end(done);
    });
    it('should get all friends', function (done) {
        request(server)
            .post('/getFriends/')
            .send({
                email: "andy@example.com"
            })
            .expect(200)
            .expect(function (res) {
                let friends = userCollection.getFriends('andy@example.com');
                expect(res.body.success).to.be.true;
                expect(res.body.friends).to.have.lengthOf(friends.length);
            })
            .end(done);
    });
    it('should get all common friends', function (done) {
        request(server)
            .post('/getCommonFriends/')
            .send({
                friends: ["andy@example.com", "john@example.com"]
            })
            .expect(200)
            .expect(function (res) {
                let commonFriends = userCollection.getCommonFriends('andy@example.com', 'john@example.com');
                expect(res.body.success).to.be.true;
                expect(res.body.friends).to.have.lengthOf(commonFriends.length);
            })
            .end(done);
    });
    it('should subscribe to updates', function (done) {
        request(server)
            .post('/subscribe/')
            .send({
                "requestor": "lisa@example.com",
                "target": "john@example.com"
            })
            .expect(200)
            .expect(function (res) {
                expect(res.body.success).to.be.true;
            })
            .end(done);
    });
    it('should block to updates', function (done) {
        request(server)
            .post('/blockUpdates/')
            .send({
                "requestor": "andy@example.com",
                "target": "john@example.com"
            })
            .expect(200)
            .expect(function (res) {
                expect(res.body.success).to.be.true;
            })
            .end(done);
    });
    it('should retrieve all email addresses that can receive updates from an email address', function (done) {
        request(server)
            .post('/getEmailAddressForUpdates/')
            .send({
                "sender": "john@example.com",
                "text": "Hello World! kate@example.com"
            })
            .expect(200)
            .expect(function (res) {
                expect(res.body.success).to.be.true;
                expect(res.body.recipients).to.have.lengthOf(2);
            })
            .end(done);
    });
    it('404 everything else', function testPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done);
    });

})