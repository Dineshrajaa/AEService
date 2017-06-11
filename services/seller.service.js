var Seller = require('../models/Seller.model'),
Categories = require('../models/Categories.model'),
Item = require('../models/Item.model'),
SubCategory = require('../models/SubCategory.model'),
Organization = require('../models/Organization.model')
 
exports.GetAllSeller = function(ItemID) {
 var fetchParameters = {};
    return Seller.forge().query(function(qb){
        qb.select('Seller.SellerID','Seller.Name','Seller.ItemID','Seller.Status','Item.ItemID as itemId','Item.ItemName','Item.ItemDiscp','Item.ItemImage','Item.ItemPrice','Item.subcatId','Item.ItemQuantity','Item.EstDelivery','Item.Returns','Item.ItemCurrency','SubCategory.SubcatId','SubCategory.SbCatName','SubCategory.CatId','Categories.catId','Categories.CatName','Categories.CatImage','Categories.OrgId','Organization.OrgName','Organization.OrgImage');
        qb.leftJoin('Item',function(){
            this.on('Seller.ItemID', '=', 'Item.ItemID')
        });
        qb.leftJoin('SubCategory',function(){
            this.on('Item.subcatId', '=', 'SubCategory.SubcatId')
        });
        qb.leftJoin('Categories',function(){
            this.on('SubCategory.CatId', '=', 'Categories.CatId')
        });
        qb.leftJoin('Organization',function(){
            this.on('Categories.OrgId', '=', 'Organization.OrgId')
        });
        if(ItemID)
        qb.where('Item.ItemID', '=', ItemID);
    }).fetchAll().then(function(SellerList){
        return SellerList;
    }).catch(function(err){
        console.log(err);
    });
};
