var config = require('../config'),
    Chat = require('../models/Chat.model'),
    UserAccount = require('../models/UserAccount.model'),
    helperServices = require('../services/helper.service');

exports.GetConversation = function (UserId, MyUserId) {
    return Chat.forge().query(function (qb) {
        
    }).fetchAll().then(function (result) {
        return result;
    }).catch(function (err) {
        console.log(err);
        res.json({
            "StatusCode": err.status,
            "Messages": [],
            "ResponseMessage": err.messages
        });
    })
}