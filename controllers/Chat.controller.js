var config = require('../config'),
    UserAccount = require('../models/UserAccount.model'),
    ChatServices = require('../services/Chat.service');

exports.GetConversation = function (req, res) {
    console.log("GetAllConversations");
    var UserId = (req.params.UserId) ? req.params.UserId : false;
    var MyUserId = (req.params.MyUserId) ? req.params.MyUserId : false;
    ChatServices.GetConversation(UserId, MyUserId).then(function (Conversation) {
        if (Conversation.length) {
            res.json(Conversation);
        } else {
            res.json({
                "Message": "An error has occurred."
            });
        }
    }).catch(function (err) {
        res.json({
            "StatusCode": err.status,
            "Conversations": [],
            "ResponseMessage": err.messages
        });
    });
};