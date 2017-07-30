var config = require('../config'),
    Followers = require('../models/Followers.model'),
    Organization = require('../models/Organization.model'),
    UserAccount = require('../models/UserAccount.model'),
    Clients = require('../models/Clients.model'),
    helperServices = require('../services/helper.service');

exports.GetAllFollowers = function (value, field) {
    return Followers.forge().query(function (qb) {
        debugger;
        qb.select('UserAccount.FirstName', 'UserAccount.LastName', 'UserAccount.DOB', 'UserAccount.UserImage', 'UserAccount.City',
            'Favourite.FavouriteId', 'Favourite.OrgId', 'Favourite.UserId');
        qb.join('UserAccount', function () {
            this.on('Favourite.UserId', '=', 'UserAccount.UserId')
        })
         qb.select('Clients.ClientId as isClient')
        qb.leftJoin('Clients', function () {
            this.on('Favourite.FavouriteId', '=', 'Clients.FavouriteId')
                .andOn('Favourite.UserId', '=', 'Clients.UserId')
        }) 
        if (field) {
            field = 'Favourite.' + field;
            qb.where(field, value)

        }
        /* qb.count('* as iamclient')
        qb.orderBy("iamclient", "desc"); */

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