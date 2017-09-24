var config = require('../config'),
    Basket = require('../models/Basket.model'),
    BasketServices = require('../services/Basket.service'),
    Promise = require("bluebird"),
    fs = require("fs"),
    helperServices = require('../services/helper.service');


exports.AddToBasket = function (req, res) {
    /**
     * Method to Add Items to Basket
     */
    BasketServices.saveToBasket(req.body).then(function (basketSuccess) {
        if (basketSuccess) {

            res.json({ "StatusCode": 200, "basket": basketSuccess, "ResponseMessage": "Added to Basket successfully!" });
        } else {
            res.json({ "StatusCode": 404, "Message": "An error has occurred." });
        }
    }).catch(function (err) {
        res.json({ "StatusCode": err.status, "basket": [], "ResponseMessage": err.messages });
    });
}

exports.GetItemsFromMyBasket = function (req, res) {
    /**
     * Method to List Items from Basket
     */
    var UserId = req.params.UserId;
    BasketServices.getAllItemsFromBasket(UserId).then(function (result) {
        if (result.length) {
            return Promise.map(result.models, function (appo) {
                // console.warn('result.models:',result.models);
                return {
                    "ItemID": appo.get('ItemID'),
                    "ItemName": appo.get('ItemName'),                    
                    "ItemImage": appo.get('ItemImage'),
                    "ItemPrice": appo.get('ItemPrice'),                    
                    "ItemCurrency": appo.get('ItemCurrency'),
                    "Quantity": appo.get('Quantity'),
                    "AddedTime": appo.get('AddedTime'),
                    "BasketId": appo.get('BasketId'),
                    "Status": appo.get('Status'),                    
                    "OrgId": appo.get('ItemOrgId'),
                }

            });
        } else {
            return null;
        }
    }).then(function (finalResult) {
        if (finalResult)
            res.json({ "StatusCode": 200, "data": finalResult, "ResponseMessage": "Wow!! you are so passionate about your ItemRepository" });
        else
            res.json({ "StatusCode": 200, "data": finalResult, "ResponseMessage": "Sorry! No GetItemRepository data found!!!" });
    }).catch(function (err) {
        res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
    });
}

exports.RemoveFromMyBasket=function(req,res){
    /**
     * Method to remove item from cart
     */
    var BasketId = (req.params.BasketId) ? req.params.BasketId : false;
    if (BasketId) {
        BasketServices.DeleteFromBasket(BasketId).then(function (result) {
            if (result)
                res.json({ "StatusCode": 200, "ResponseMessage": "Deleted Item Successfully" });
            else
                res.json({ "Message": "An error has occurred." });
        }).catch(function (err) {
            res.json({ "StatusCode": err.status, "ResponseMessage": err.messages });
        });

    } else {
        res.json({ "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Categories/Delete'." });
    }
}