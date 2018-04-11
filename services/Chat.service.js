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
    var messageData = new Chat({
        "FromUserId": (params.FromUserId) ? params.FromUserId : null,
        "ToUserId": (params.ToUserId) ? params.ToUserId : null,
        // "IsViewed": (params.IsViewed) ? params.IsViewed : false,
        "Message": (params.Message) ? params.Message : null,
        "CreateDate": (params.CreateDate) ? params.ChatDate : null,
        "ChatDate": (params.ChatDate) ? params.ChatDate : new Date()
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

exports.sendMessageNew = function (params) {
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

exports.getConversationIdAmongUsersNew = function (FromUserId, ToUserId) {
    // var convQuery = '(SELECT id,c.FromUserId,c.chatDate,c.Message FROM Chat as c WHERE c.FromUserId!=' + FromUserId + ' and  c.ToUserId=' + FromUserId + ' and c.id =(select d.id from Chat as d  where d.FromUserId=c.FromUserId and d.ToUserId=' + FromUserId + ' order by d.ChatDate desc limit 1))UNION(SELECT id,c.ToUserId,c.chatDate,c.Message FROM Chat as c WHERE c.FromUserId=' + FromUserId + ' and  c.ToUserId!=' + FromUserId + ' and c.id =(select d.id from Chat as d  where d.ToUserId=c.ToUserId and d.FromUserId=' + FromUserId + ' order by d.ChatDate desc limit 1)) order by 3 desc';
    /* var convQuery = 'select * from Chat where (FromUserId=' + FromUserId + ' and ToUserId=' + ToUserId + ') or (FromUserId=' + ToUserId + ' and ToUserId=' + FromUserId + ')';
    console.warn('convQuery:', convQuery);
    return orm.knex.raw(convQuery).then(function (chatResults) {
        console.warn('chatResults:', chatResults);
        return chatResults[0];
    }) */

    return Chat.forge().query(function (qb) {
        qb.where({
            'FromUserId': FromUserId,
            'ToUserId': ToUserId
        });
        qb.orWhere({
            'FromUserId': ToUserId,
            'ToUserId': FromUserId
        });

    }).fetchAll().then(function (Messages) {
        return Messages;
    }).catch(function (err) {
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

exports.getRecentConversation = function (UserId) {
    /* Method to get recent conversation of the userid */
    /* return Chat.forge().query(function (qb) {
        qb.where({
            'FromUserId': UserId
        });
        qb.orWhere({
            'ToUserId': UserId
        });

    }).fetchOne().then(function (Messages) {
        console.warn(Messages);
        return Messages;
    }).catch(function (err) {
        return err;
    }); */

    // var convQuery = 'SELECT id,c.FromUserId,c.chatDate,c.Message FROM Chat as c WHERE c.FromUserId<>' + UserId + ' and  c.ToUserId=' + UserId + ' and c.id =(select d.id from Chat as d  where d.FromUserId=c.FromUserId and d.ToUserId=' + UserId + ' order by d.ChatDate desc limit 1)';
    /* var convQuery = 'SELECT c.id,c.FromUserId,c.ToUserId,c.CreateDate,c.Message,\
     fuser.firstname ffirstname,fuser.lastname flastname,fuser.UserImage fuserimage,\
     tuser.firstname tfirstname,tuser.lastname tlastname,tuser.UserImage tuserimage,\
     time_format(time(c.CreateDate),"%h:%i %p")chattime,date_format(date(c.CreateDate),"%d-%m-%Y")chatdate\
      from Chat as c,UserAccount fuser, UserAccount tuser where (c.FromUserId='+ UserId + ' or c.ToUserId=' + UserId + ') \
      and fuser.UserId=c.FromUserId and tuser.UserId=ToUserId order by c.CreateDate desc limit 1'; */
    // console.warn('convQuery:', convQuery);
    var convQuery = 'SELECT c.id,c.FromUserId,c.ToUserId,c.CreateDate,c.Message,\
    fuser.firstname ffirstname,fuser.lastname flastname,fuser.UserImage fuserimage,\
    tuser.firstname tfirstname,tuser.lastname tlastname,tuser.UserImage tuserimage,\
    time_format(time(c.CreateDate),"%h:%i %p")chattime,date_format(date(c.CreateDate),"%d-%m-%Y")chatdate\
     from Chat as c,UserAccount fuser, UserAccount tuser where (c.FromUserId='+ UserId + ' or c.ToUserId='+ UserId + ') \
     and fuser.UserId=c.FromUserId and tuser.UserId=ToUserId and \
     c.id=(select d.id from Chat as d where (d.FromUserId=c.FromUserId or d.ToUserId=c.ToUserId) order by c.createdate desc limit 1)';
    return orm.knex.raw(convQuery).then(function (chatResults) {
        return chatResults[0];
    })

    /*     return Chat.forge().orderBy('Id', 'DESC').query(function (qb) {
            qb.where({
                'FromUserId': UserId
            });
            qb.orWhere({
                'ToUserId': UserId
            });
    
        }).fetchAll().then(function (Messages) {
            var uniqueConversations;
            console.warn('I am here:',Messages);
            if (Messages.length) {
                
                Promise.map(Messages.model, function (msg) {
                    console.log(msg.get('Message'));
                })
            }
            // return Messages;
        }).catch(function (err) {
            return err;
        }); */
}