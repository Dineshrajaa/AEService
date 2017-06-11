var Treatment = require('../models/Treatment.model'),
Categories = require('../models/Categories.model'),
Item = require('../models/Item.model'),
SubCategory = require('../models/SubCategory.model'),
Organization = require('../models/Organization.model');
 
exports.treatmentGetByOrgId = function(params){
    var fetchParams ={};
    var OrgId = (params.OrgId)?params.OrgId:false;
    return Treatment.forge().query(function(qb){
        if(OrgId)
            qb.where("OrgId",OrgId);
    }).fetchAll(fetchParams).then(function(result){
        return result;
    }).catch(function(err){
        return err;
    });
}
