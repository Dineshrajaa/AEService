var Gallery = require('../models/Gallery.model'),
Organization = require('../models/Organization.model')
 
exports.GetGallery = function(params,action) {
    var OrgId = (params.Id)?params.Id:false;
    var fetchParams = {};
    return Gallery.forge().query(function(qb){
        if(OrgId)
            qb.where('OrgId',OrgId);
    }).fetchAll(fetchParams).then(function(result){
        return result;
    }).catch(function(err){
        return err;
    });
    
};
