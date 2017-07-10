var config = require('../config'),
    UserAccount = require('../models/UserAccount.model'),
    ChatServices = require('../services/Chat.service'),
    helperServices = require('../services/helper.service');

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
}

exports.sendMessage = function (req, res) {
    console.log("Send Message");
    var section = "chat";
    var image = (req.body.picture) ? req.body.picture : false;
    ChatServices.sendMessage(req.body).then(function (chatSuccess) {
        if (chatSuccess) {
            if (image) {
                helperServices.base64toimage(image, chatSuccess.get("Id"), section);
            }
            res.json({ "StatusCode": 200, "chat": chatSuccess, "ResponseMessage": "Message sent successfully!" });
        } else {
            res.json({ "StatusCode": 404, "Message": "An error has occurred." });
        }
    }).catch(function (err) {
        res.json({ "StatusCode": err.status, "chat": [], "ResponseMessage": err.messages });
    });
}