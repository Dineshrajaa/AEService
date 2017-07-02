var config = require('../config'),
    Followers = require('../models/Followers.model'),
    Organization = require('../models/Organization.model'),
    User = require('../models/UserAccount.model'),
    helperServices = require('../services/helper.service');

exports.GetAllFollowers = function (value, field) {
    return Followers.forge().query(function (qb) {
        if (field)
            qb.where(field, value);
    }).fetchAll().then(function (result) {
        return result;
    }).catch(function (err) {
        res.json({
            "StatusCode": err.status,
            "Followers": [],
            "ResponseMessage": err.messages
        });
    })
}