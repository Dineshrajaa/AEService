var Categories = require('../models/Categories.model'),
    Organization = require('../models/Organization.model'),
    Order = require('../models/Order.model'),
    orm = require('../orm'),
    OrderDetail = require('../models/OrderDetail.model');

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

exports.placeOrder = function (params) {
    /* Method to place order */
    console.warn(params);
    exports.createOrder(params).then(function (orderId) {
        console.warn('orderId:', orderId);
        if (orderId) {
            params.OrderId = orderId;
        }
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
            itemObj.OrderId = orderId;
            console.warn('itemObj:', itemObj);
            orderTobeSaved.push(itemObj);
        }
        console.warn('orderTobeSaved:', orderTobeSaved);

        var OrderDetailCollection = orm.bookshelf.Collection.extend({
            model: OrderDetail
        });
        return OrderDetailCollection.forge(orderTobeSaved).invokeThen('save').then(function (orderSuccess) {
            return orderSuccess;
        })
    }).catch(function (err) {
        console.log('Err1:', err);
        return err;
    });
}

exports.createOrder = function (params) {
    /* Method to create order */
    var order = new Order({
        OrderDate: (params.OrderDate) ? params.OrderDate : new Date(),
        UserId: params.UserId,
        OrderStatus: (params.OrderStatus) ? params.OrderStatus : 'P'
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