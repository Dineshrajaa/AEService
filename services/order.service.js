var Categories = require('../models/Categories.model'),
    Organization = require('../models/Organization.model'),
    Order = require('../models/Order.model'),
    OrderDetail = require('../models/OrderDetail.model');

exports.getAllOrders = function(){
    var fetchParams = {withRelated: [
        'UserAccount'
      ]};
    return Order.forge().query(function(qb){
        qb.select('Order.*','OrderDetail.*','OrderDetail.OtherChargeID as OtherChargesId','OrderDetail.OtherChargeAmount as OtherChargesAmount' );
        qb.join('OrderDetail',function(){
            this.on('Order.OrderId', '=', 'OrderDetail.OrderId')
        });
    }).fetchAll(fetchParams).then(function(result){
        return result;
    }).catch(function(err){
        res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
    });
};