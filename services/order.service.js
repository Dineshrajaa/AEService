var Categories = require('../models/Categories.model'),
    Organization = require('../models/Organization.model'),
    Order = require('../models/Order.model'),
    Basket = require('../models/Basket.model'),
    orm = require('../orm'),
    OrderDetail = require('../models/OrderDetail.model'),
    Item = require('../models/Item.model'),
    Promise = require("bluebird");

exports.getAllOrders = function (OrgId) {
    var fetchParams = {
        withRelated: [
            'UserAccount'
        ]
    };
    return Order.forge().query(function (qb) {
        qb.select('Order.*', 'OrderDetail.*', 'OrderDetail.OtherChargeID as OtherChargesId', 'OrderDetail.OtherChargeAmount as OtherChargesAmount');
        qb.join('OrderDetail', function () {
            this.on('Order.OrderId', '=', 'OrderDetail.OrderId')
        });
        if (OrgId)
            qb.where("OrgId", OrgId);
    }).fetchAll(fetchParams).then(function (result) {
        return result;
    }).catch(function (err) {
        res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
    });
};

exports.getAllOrdersofUser = function (UserId) {

    return Order.forge().query(function (qb) {
        
        qb.select('Order.*','Organization.*');
        qb.join('Organization', function () {
            this.on('Order.OrgId', '=', 'Organization.OrgId')
        });
        /*qb.join('OrderDetail', function () {
            this.on('Order.OrderId', '=', 'OrderDetail.OrderId')
        });
         qb.join('Item', function () {
            this.on('Item.ItemId', '=', 'OrderDetail.ItemId')
        }); */
        if (UserId)
            qb.where("Order.UserId", UserId);
    }).fetchAll().then(function (result) {
        // return result;
        console.log('result:', result.length);
        if (result.length) {
            console.log('Hello')
            return Promise.map(result.models, function (order) {

                return OrderDetail.forge().query(function (qb) {
                    qb.where('OrderId', order.get('OrderId'))
                }).fetch().then(function (orderDetails) {
                    console.log('orderDetails:',orderDetails);
                    order.set('OrdDEtaild', orderDetails.get('OrdDEtaild'));
                    order.set('ItemId', orderDetails.get('ItemId'));
                    return Item.forge().query(function (qb) {
                        qb.where('ItemId', orderDetails.get('ItemId'))
                    }).fetch().then(function (fetchedItem) {
                        order.set('ItemName', fetchedItem.get('ItemName'));
                        order.set('ItemDiscp', fetchedItem.get('ItemDiscp'));
                        order.set('ItemImage', fetchedItem.get('ItemImage'));
                        order.set('ItemCurrency', fetchedItem.get('ItemCurrency'));
                        return order;
                    }).catch(function (err) {
                        console.log("error in comment");
                        console.log(err);
                    });
                    return order;
                }).catch(function (err) {
                    console.log("error in comment");
                    console.log(err);
                });
            })
        }
    }).catch(function (err) {
        return err;
    });
};

exports.getAllOrdersReceived = function (OrgId) {

    return Order.forge().query(function (qb) {
        qb.select('Order.*', 'UserAccount.*');
        qb.join('UserAccount', function () {
            this.on('Order.UserId', '=', 'UserAccount.UserId')
        });
        /*
         qb.join('Item', function () {
            this.on('Item.ItemId', '=', 'OrderDetail.ItemId')
        }); */
        if (OrgId)
            qb.where("Order.OrgId", OrgId);
    }).fetchAll().then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

exports.getOrderDetail = function (OrderId) {

    return Order.forge().query(function (qb) {
        qb.select('Order.*', 'OrderDetail.*');
        qb.join('OrderDetail', function () {
            this.on('Order.OrderId', '=', 'OrderDetail.OrderId')
        });
        /*
         qb.join('Item', function () {
            this.on('Item.ItemId', '=', 'OrderDetail.ItemId')
        }); */
        if (OrderId)
            qb.where("Order.OrderId", OrderId);
    }).fetchAll().then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

exports.placeOrder = function (params) {
    /* Method to place order */
    console.warn(params);
    createOrder(params).then(function (orderId) {
        console.warn('orderId:', orderId);
        if (orderId) {
            params.OrderId = orderId;
        }

    }).catch(function (err) {
        console.log('Err1:', err);
        return err;
    });
}

exports.saveItems = function (params) {
    /**
     * Method to save items
     */
    var orderTobeSaved = [];

    // console.warn('params:',params);
    for (var i = 0; i < params.items.length; i++) {
        var item = params.items[i];
        var itemObj = {};
        itemObj.ItemId = item.ItemId;
        itemObj.ItemQuantity = item.ItemQuantity;
        itemObj.ItemRate = item.ItemRate;
        itemObj.Amount = item.ItemQuantity * item.ItemRate;
        itemObj.ItemCurrency = item.ItemCurrency;
        itemObj.OrdDetailStatus = (item.OrdDetailStatus) ? item.OrdDetailStatus : 'P';
        itemObj.OrderId = params.OrderId;
        console.warn('itemObj:', itemObj);
        orderTobeSaved.push(itemObj);
    }
    console.warn('orderTobeSaved:', orderTobeSaved);

    var OrderDetailCollection = orm.bookshelf.Collection.extend({
        model: OrderDetail
    });
    return OrderDetailCollection.forge(orderTobeSaved).invokeThen('save').then(function (orderSuccess) {
        // console.log('orderSuccess:', orderSuccess);
        return orderSuccess;
    })
}

exports.removeItemsFromBasket = function (params) {
    console.log('params:', params.items);
    var basketItemsToBeRemoved = [];
    for (var i = 0; i < params.items.length; i++) {
        var item = params.items[i];
        basketItemsToBeRemoved.push(item.BasketId);
    }
    console.log('basketItemsToBeRemoved', basketItemsToBeRemoved);
    return Basket.forge().query(function (qb) {
        qb.whereIn("BasketId", basketItemsToBeRemoved).del();
    }).fetch().then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
}

exports.createOrder = function (params) {
    /* Method to create order */
    var order = new Order({
        OrderDate: (params.OrderDate) ? params.OrderDate : new Date(),
        UserId: params.UserId,
        OrderStatus: (params.OrderStatus) ? params.OrderStatus : 'P',
        TotalAmount: (params.TotalAmount) ? params.TotalAmount : 0.00
    });
    return order.save(null).tap(function (model) {
        OrderData = model;
        return OrderData.get('OrderId');
    }).then(function (OrderData) {
        return OrderData.get('OrderId');
    }).catch(function (err) {
        console.log('Err2:', err);
        return err;
    });
}