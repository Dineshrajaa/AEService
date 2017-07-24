var config = require('../config'),
    Followers = require('../models/Followers.model'),
    Consumers = require('../models/UserAccount.model'),
    FollowersServices = require('../services/Followers.service');

exports.GetAllFollowers = function (req, res) {
    console.log("GetAllFollowers");
    var OrgId=(req.params.OrgId)?req.params.OrgId:false;
    FollowersServices.GetAllFollowers(OrgId, 'OrgId').then(function (Followers) {
        if (Followers.length) {
            res.json({"data":Followers});
        } else {
            res.json({
                "Message": "An error has occurred."
            });
        }
    }).catch(function (err) {
        res.json({
            "StatusCode": err.status,
            "Followers": [],
            "ResponseMessage": err.messages
        });
    });
};