var Categories = require('../models/Categories.model'),
    Organization = require('../models/Organization.model'),
    Order = require('../models/Order.model'),
    OrderDetail = require('../models/OrderDetail.model'),
    helperServices = require('../services/helper.service'),
    Promise  = require("bluebird");
 //get organization by Id   
exports.GetOrganizationById = function(value, field){
    var fetchParams={};
    return Organization.forge().query(function(qb){
        if(field)
            qb.where(field,value);
    }).fetchAll(fetchParams).then(function(result){
        return result;
    }).catch(function(err){
        res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
    })
}

//get nearby organiztion
exports.FindNearByOrganization = function(origins){
    var fetchParams={};
    return Organization.forge().fetchAll(fetchParams).then(function(result){
     return result;
      

    }).catch(function(err){
        return err;
    })
}
