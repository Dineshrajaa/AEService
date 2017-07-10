var config = require('../config'),
    Chat = require('../models/Chat.model'),
    UserAccount = require('../models/UserAccount.model'),
    helperServices = require('../services/helper.service'),
    multer = require('multer');

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
    console.log(params);
    var chatData = new Chat({
        "FromUserId": (params.FromUserId) ? params.FromUserId : null,
        "ToUserId": (params.ToUserId) ? params.ToUserId : null,
        "IsViewed": (params.IsViewed) ? params.IsViewed : false,
        "Message": (params.Message) ? params.Message : null,
    });
    return chatData.save(null).tap(function (model) {
        chatData = model;
        return chatData;
    }).then(function (chatData) {
        return chatData;
    }).catch(function (err) {
        return err;
    });
    /*if (typeof messagePayload.picture !== 'undefined') {

        var fs = require('fs');
        var data = messagePayload.picture.replace(/^data:image\/\w+;base64,/, "");
        console.warn(data);
        var buf = new Buffer(data, 'base64');
        fs.writeFile('image.png', buf);
    }*/
}