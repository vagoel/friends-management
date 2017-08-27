const _ = require('../bower_components/underscore/underscore');

class User {
    constructor(email) {
        this._id = email;
        this.subscribedTo = [];
        this.subscribedBy = [];
        this.blockedUsers = [];
        this.friends = [];
    }

    getId() {
        return this._id;
    }
    addSubscribedTo(id) {
        this.subscribedTo.push(id);
        return this.subscribedTo.length;
    }
    removeSubscribedTo(id) {
        this.subscribedTo = _.without(this.subscribedTo, this.subscribedTo[_.indexOf(this.subscribedTo, id)]);
        return this.subscribedTo.length;
    }
    getSubscribedTo() {
        return this.subscribedTo;
    }
    addSubscribedBy(id) {
        this.subscribedBy.push(id);
        return this.subscribedBy.length;
    }
    removeSubscribedBy(id) {
        this.subscribedBy = _.without(this.subscribedBy, this.addSubscribedBy[_.indexOf(this.subscribedBy, id)]);
        return this.subscribedBy.length;
    }
    getSubscribedBy() {
        return this.subscribedBy;
    }
    addBlockedUser(id) {
        this.addBlockedUser.push(id);
        return this.addBlockedUser.length;
    }
    removeBlockedUser(id) {
        this.blockedUsers = _.without(this.blockedUsers, this.blockedUsers[_.indexOf(this.blockedUsers, id)]);
        return this.blockedUsers.length;
    }
    getBlockedUsers() {
        return this.blockedUsers;
    }
    addFriend(id) {
        this.friends.push(id);
        return this.friends.length;
    }
    removeFriend(id) {
        this.friends = _.without(this.friends, this.friends[_.indexOf(this.friends, id)]);
        return this.friends.length;
    }
    getFriends() {
        return this.friends;
    }



}


module.exports = User;
