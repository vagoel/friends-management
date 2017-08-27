const _ = require('../bower_components/underscore/underscore');

class UserCollection {
    constructor() {
        this.count = 0;
        this.collection = {};
    }
    exists(key) {
        return this.collection[key] != undefined;
    }
    add(key, value) {
        if (!this.exists(key)) {
            this.collection[key] = value;
            ++this.count;
        }
        return this.count;
    }

    remove(key) {
        if(!this.exists()){
            delete collection[key];
            --this.count;
        }
        return this.count;
    }

    find(key){
        return this.collection[key];
    }

    createFriend(id1,id2){
        
        if(this.exists(id1) && this.exists(id2) && !this.collection[id1].getBlockedUsers().includes(id2)){
            this.collection[id1].addFriend(this.collection[id2].getId());
            this.collection[id2].addFriend(this.collection[id1].getId());
        }
    }

    getFriends(id){
        
        if(this.exists(id)){
            return this.collection[id].getFriends();
        }
    }

    getCommonFriends(id1,id2){
        if(this.exists(id1) && this.exists(id2)){
            let user1Friends=this.collection[id1].getFriends();
            let user2Friends=this.collection[id2].getFriends();
             return _.intersection(user1Friends,user2Friends);
        }
        else{
            return new Error('One of the User Does not Exist');
        }
    }
    
    subscribe(requester,target){
        if(this.exists(requester)&&this.exists(target)){
            this.collection[requester].addSubscribedTo(target);
            this.collection[target].addSubscribedBy(requester);
        }
    }

    block(requester,target){
        if(this.exists(requester)&&this.exists(target)){
            if(this.areFriends(requester,target)){
                this.collection[requester].removeSubscribedTo(target);
            }
            else{
                this.collection[requester].addBlockedUser(target);
            }
        }
    }

    areFriends(id1,id2){
        if(this.exists(id1)&&this.exists(id2)){
            return this.collection[id1].getFriends().includes(id2);
        }
    }

    getEmailAddressForUpdates(sender,text){
        

        let results=[];

        for(let i in this.collection){
            let user=i;
            if(!this.hasBlocked(user,sender) && (this.areFriends(sender,user)||this.hasSubscribedTo(user,sender)||this.isMentionedInUpdate(user,text))){
                results.push(user);
            }
        }

        return results;
    }

    hasSubscribedTo(requester,target){
        return this.collection[requester].getSubscribedTo().includes(target);
    }

    isMentionedInUpdate(requester,text){
        return text.indexOf(requester)==-1?false:true;
    }

    hasBlocked(requester,target){
        return this.collection[requester].getBlockedUsers().includes(target);
    }
}

module.exports=UserCollection;