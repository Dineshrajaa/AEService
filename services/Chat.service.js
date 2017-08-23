var config = require('../config'),
    Chat = require('../models/Chat.model'),
    UserAccount = require('../models/UserAccount.model'),
    helperServices = require('../services/helper.service'),
    multer = require('multer'),
    Conversation = require('../models/Conversation.model'),
    Messages = require('../models/Messages.model'),
    Participants = require('../models/Participants.model'),
    orm = require('../orm'),
    UserAccount = require('../models/UserAccount.model'),
    Promise = require("bluebird")
    ;

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

exports.sendMessage = function (params) {
    // Method to save message
    var messageData = new Messages({
        "FromId": (params.FromId) ? params.FromId : null,
        "IsViewed": (params.IsViewed) ? params.IsViewed : false,
        "Message": (params.Message) ? params.Message : null,
        "ConversationId": (params.ConversationId) ? params.ConversationId : null,
        "SentTime": (params.SentTime) ? params.SentTime : new Date()
    });

    return messageData.save(null).tap(function (model) {
        message = model;
        return message;
    }).then(function (chatData) {
        return chatData;
    }).catch(function (err) {
        return err;
    });

}

exports.getAllConversationsOfUser = function (userId) {
    return Participants.forge().query(function (qb) {
        if (userId != 0)
            qb.where({
                'UserId': userId
            });

    }).fetchAll().then(function (Participants) {
        console.log('Participants:', Participants.toJSON());
        return Participants.toJSON();
    }).catch(function (err) {
        return err;
    });
};

exports.listAllMessages = function (convId) {
    /* Method to list all the conversations based on ConversationId */
    return Messages.forge().query(function (qb) {
        if (convId != 0)
            qb.where({
                'ConversationId': convId
            });

    }).fetchAll().then(function (messages) {
        console.log('messages.length:', messages.length);
        if (messages.length) {
            return Promise.map(messages.models, function (msg) {
                console.log('msg:', msg.get('FromId'));
                return UserAccount.forge().query(function (qb) {
                    qb.where('UserId', msg.get('FromId'))
                }).fetch().then(function (user) {
                    msg.set('UserImage', user.get('UserImage'));
                    msg.set('FirstName', user.get('FirstName'));
                    msg.set('LastName', user.get('LastName'));
                    return msg;
                }).catch(function (err) {
                    console.log("error in comment");
                    console.log(err);
                });
            })
        }
        // return messages;
    }).catch(function (err) {
        return err;
    });
};

exports.linkParticipants = function (from, to, convId) {
    /* Method to link participants */
    var participant = orm.bookshelf.Collection.extend({
        model: Participants
    });
    return participant.forge([
        { 'UserId': from, 'ConversationId': convId },
        { 'UserId': to, 'ConversationId': convId }
    ]).invokeThen('save').then(function (participantSuccess) {
        return participantSuccess;
    })
}

exports.getConversationIdAmongUsers = function (FromUserId, ToUserId) {
    return Participants.forge().query(function (qb) {

        qb.whereIn('UserId', [FromUserId, ToUserId]);

    }).fetchAll().then(function (Participants) {
        var ParticipantsArray = Participants.toJSON();
        var fromUserconversations = ParticipantsArray.filter(function (participant) {
            if (participant.UserId == FromUserId)
                return participant.ConversationId;
        })
        var toUserconversations = ParticipantsArray.filter(function (participant) {
            if (participant.UserId == ToUserId)
                return participant.ConversationId;
        })
        var commonConversation = 0;
        for (var i = 0; i < fromUserconversations.length; i++) {
            for (var j = 0; j < toUserconversations.length; j++) {
                if (fromUserconversations[i].ConversationId == toUserconversations[j].ConversationId) {
                    commonConversation = fromUserconversations[i].ConversationId;
                }
            }
        }

        console.log('commonConversation:', commonConversation);
        return commonConversation;
    }).catch(function (err) {
        console.log(err)
        return err;
    });
}

exports.registerConversation = function () {
    return new Conversation({ 'ConversationTime': new Date() }).save(null).tap(function (model) {

        return model;
    }).then(function (conversationData) {
        return conversationData;
    }).catch(function (err) {
        return err;
    });
}
exports.uploadImage = function (data, ChatId) {

    console.log(data);
    console.log(ChatId);
    var authUpdateParams = {
        patch: true
    };
    var authFetchParams = {};
    return Messages.forge().query(function (qb) {
        if (ChatId)
            qb.where({ 'MessageId': ChatId });
    }).fetch().then(function (Chat) {
        return Chat.save(data, authUpdateParams);
    });
}