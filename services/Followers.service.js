var config = require('../config'),
    Followers = require('../models/Followers.model'),
    Organization = require('../models/Organization.model'),
    UserAccount = require('../models/UserAccount.model'),
    helperServices = require('../services/helper.service');

exports.GetAllFollowers = function (value, field) {
    return Followers.forge().query(function (qb) {
        qb.select('UserAccount.FirstName', 'UserAccount.LastName', 'UserAccount.DOB',
        'Favourite.FavouriteId','Favourite.OrgId','Favourite.UserId');
        qb.join('UserAccount', function () {
            this.on('Favourite.UserId', '=', 'UserAccount.UserId')
        })
        if (field) {
            field = 'Favourite.' + field;
            qb.where(field, value);
        }

    }).fetchAll().then(function (result) {
        return result;
    }).catch(function (err) {
        console.log(err);
        res.json({
            "StatusCode": err.status,
            "Followers": [],
            "ResponseMessage": err.messages
        });
    })
}