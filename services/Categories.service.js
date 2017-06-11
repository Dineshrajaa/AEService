var Categories = require('../models/Categories.model'),
    Organization = require('../models/Organization.model');

exports.GetAllCategories = function(params) {
  
  /*var fetchParams = {withRelated: [
        'Organization'
      ]};*/
  var  OrgId = (params.id)?params.id:false;
  var  OrgName = (params.input)?params.input:false;
  return Categories.forge().query(function (qb) {
      if(OrgId!=0)
      qb.where({'OrgId' : OrgId});
      if(OrgName){
        query = OrgName;
        qb.where('CatName', 'like', "%"+query+"%");
      }
        
  }).fetchAll().then(function(Categories) {
      return Categories;
  }).catch(function(err){
      return err;
  });
};

exports.GetAllCategoryById = function(CatId){
  console.log("GetAllCategoryById");
    return Categories.forge().query(function (qb) {
      qb.where({'CatId' : CatId});
    }).fetch().then(function(Categories) {
        return Categories;
    }).catch(function(err){
        return err;
    });
};

exports.AddCategory = function(params){
  console.log("AddCategory");
    var Category = new Categories({
                CatName: (params.CatName)?params.CatName:null, 
                CatImage: (params.CatImage)?params.CatImage:null, 
                OrgId: (params.OrgId)?params.OrgId:null
              });
    return Category.save(null).tap(function (model){
      categoryData = model;
      return categoryData;
    }).then(function(categoryData){
      return categoryData;
    }).catch(function(err){
      console.log(err);
    });
}

exports.ItemSearchRecord = function(params){
  console.log("ItemSearchRecord");
    var  CatId = (params.Id)?params.Id:false;
    if(!CatId)
      var  CatId = (params.id)?params.id:false;
    var  CatName = (params.input)?params.input:false;
    return Categories.forge().query(function(qb){
       qb.select('Categories.catId','Categories.CatName','Categories.CatImage', 'SubCategory.SbCatName', 'Item.ItemID as itemId','Item.ItemName','Item.ItemDiscp','Item.ItemImage','Item.ItemPrice','Item.subcatId','Item.ItemQuantity','Item.EstDelivery','Item.Returns','Item. ItemCurrency','Organization.OrgImage','Organization.OrgName');
        qb.join('SubCategory',function(){
            this.on('Categories.CatId', '=', 'SubCategory.CatId')
        });
         qb.join('Organization',function(){
            this.on('Categories.OrgId', '=', 'Organization.OrgId')
        });
        
         qb.join('Item',function(){
            this.on('SubCategory.SubcatId', '=', 'Item.subcatId')
        });
console.log(CatId);
        if(CatId)
        qb.where({'Categories.CatId' : CatId});
        if(CatName)
         qb.where({'Categories.CatName' : "%"+CatId+"%"}); 
    }).fetchAll().then(function(ItemList){
        return ItemList;
    }).catch(function(err){
        return err;
    });
    /*return Categories.forge().query(function (qb) {
        if(OrgId)
        qb.where({'OrgId' : OrgId});
        if(OrgName){
          query = OrgName;
          qb.where('OrgName', 'like', "'%"+query+"%'");
        }
          
    }).fetchAll(fetchParams).then(function(Categories) {
        return Categories;
    }).catch(function(err){
        return err;
    });*/
}

exports.DeleteCategory = function(CatId){
    return Categories.forge().query(function (qb) {
        qb.where({'CatId' : CatId});
        qb.del();
    }).fetch().then(function(result) {
        return result;
    }).catch(function(err){
        return err;
    });
}