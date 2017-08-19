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
    var image = (req.body.Picture) ? req.body.Picture : false;
    ChatServices.sendMessage(req.body).then(function (chatSuccess) {
        if (chatSuccess) {
            if (image) {
                helperServices.base64toimage(image, chatSuccess.get("MessageId"), section);
            }
            res.json({ "StatusCode": 200, "chat": chatSuccess, "ResponseMessage": "Message sent successfully!" });
        } else {
            res.json({ "StatusCode": 404, "Message": "An error has occurred." });
        }
    }).catch(function (err) {
        res.json({ "StatusCode": err.status, "chat": [], "ResponseMessage": err.messages });
    });
}

exports.getConversation = function (req, res) {
    /* Method to list conversation where both the sender and receiver are involved */
    var FromUserId = req.params.From;
    var ToUserId = req.params.To;
    ChatServices.getConversationIdAmongUsers(FromUserId, ToUserId).then(function (conv) {
        console.log('conv:', conv);
        if (conv == 0) {
            // This is a new conversation so register it and send conversation details
            ChatServices.registerConversation().then(function (savedConv) {
                if (savedConv) {
                    // Created new conversation update the paricipant table

                    ChatServices.linkParticipants(FromUserId, ToUserId, savedConv.get('ConversationId')).then(function (participantSuccess) {
                        if (participantSuccess) {
                            res.json({
                                "StatusCode": 200, "data":
                                {
                                    'type': 'New Conversation',
                                    'ConversationId': savedConv.get('ConversationId'),
                                    'Messages': []
                                }
                            });
                        }
                    })
                } else {
                    res.json({ "StatusCode": 404, "Message": "An error has occurred." });
                }
            })
        } else {
            // This is an old conversation and so conversation can be listed
            ChatServices.listAllMessages(conv).then(function (messages) {
                if (messages) {
                    res.json({
                        "StatusCode": 200, "data":
                        {
                            'type': 'Old Conversation',
                            'ConversationId': conv,
                            'Messages': messages
                        }
                    });
                }
                else {
                    res.json({ "StatusCode": 404, "Message": "An error has occurred." });
                }
            })
        }
    })
}