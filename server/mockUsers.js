const UserCollection =require('./collection');
const User =require('./user');


/**
 * Add User Ids here for testing.In real world application
 * existing users will be sourced from database or from any other external source.
 */

var mockUsers=[
    "andy@example.com",
    "john@example.com",
    "lisa@example.com",
    "kate@example.com",
    "rose@example.com",
    "celia@example.com",
    "lee@example.com",
    "gabriel@example.com",
    "chan@example.com",
    "valrie@example.com"
];

var userCollection=new UserCollection();

for(let i of mockUsers){
    let user=new User(i);
    userCollection.add(i,user);
}

module.exports=userCollection;