var Categories = require('../models/Categories.model'),
    Organization = require('../models/Organization.model'),
    SubCategory = require('../models/SubCategory.model');
  //get all sub categories using category id
  exports.GetSubCategoryByCategoryId = function(CatId){
    /*  {
    "SubcatId"
    "SbCatName"
    "CatId"
    "CatName"
    "Categories"
}*/
    var fetchParams = {withRelated: [
        'Category'
      ]};
    var  CatId = (CatId)?CatId:false;
    return SubCategory.forge().query(function (qb) {
      if(CatId)
      qb.where({'CatId' : CatId});

    }).fetchAll(fetchParams).then(function(SubCategories) {
      return SubCategories;
    }).catch(function(err){
      return err;
    });
  }
