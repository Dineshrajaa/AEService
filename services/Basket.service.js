var config = require('../config'),
    Basket = require('../models/Basket.model'),
    UserAccount = require('../models/UserAccount.model'),
    helperServices = require('../services/helper.service'),
    multer = require('multer'),
    orm = require('../orm'),
    Promise = require("bluebird");



exports.saveToBasket = function (params) {
    // Method to save Basket
    var basketData = new Basket({
        "UserId": (params.UserId) ? params.UserId : null,
        "ItemID": (params.ItemID) ? params.ItemID : null,
        "Quantity": (params.Quantity) ? params.Quantity : null,
        "Status": (params.Status) ? params.Status : null,
        "AddedTime": (params.AddedTime) ? params.AddedTime : new Date()
    });

    return basketData.save(null).tap(function (model) {
        basket = model;
        return basket;
    }).then(function (basketData) {
        return basketData;
    }).catch(function (err) {
        return err;
    });

}

exports.getAllItemsFromBasket = function (userId) {
    return Basket.forge().query(function (qb) {
        qb.select('Basket.BasketId','Basket.Quantity','Basket.Status','Basket.AddedTime','Basket.ItemID','Item.ItemName','Item.ItemPrice','Item.OrgId','Item.ItemImage','Item.ItemCurrency');
        qb.leftJoin('Item', function () {
            this.on('Basket.ItemID', '=', 'Item.ItemID')
        });
        if (userId)
            qb.where({
                'Basket.UserId': userId
            });
        qb.debug(true);
    }).fetchAll().then(function (result) {
        return result;
    }).catch(function (err) {
        console.log(err);
    })
};



