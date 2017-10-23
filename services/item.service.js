var Categories = require('../models/Categories.model'),
    Organization = require('../models/Organization.model'),
    Item = require('../models/Item.model');

exports.GetAllItems = function (value, fieldname,orgId) {
    return Item.forge().query(function (qb) {
        qb.select('Item.ItemID as itemId', 'Item.OrgId as ItemOrgId', 'Item.ItemOfferPrice','Item.OfferValidTill','Item.ItemName', 'Item.ItemDiscp', 'Item.ItemImage', 'Item.ItemPrice', 'Item.subcatId', 'Item.ItemQuantity', 'Item.EstDelivery', 'Item.Returns', 'Item.ItemCurrency', 'SubCategory.SubcatId', 'SubCategory.SbCatName', 'SubCategory.CatId', 'Categories.catId', 'Categories.CatName', 'Categories.CatImage', 'Categories.OrgId', 'Organization.OrgName', 'Organization.OrgImage');
        /* qb.leftJoin('Item',function(){
             this.on('Seller.ItemID', '=', 'Item.ItemID')
         });*/
        qb.join('SubCategory', function () {
            this.on('Item.subcatId', '=', 'SubCategory.SubcatId')
        });
        qb.join('Categories', function () {
            this.on('SubCategory.CatId', '=', 'Categories.CatId')
        });
        qb.join('Organization', function () {
            this.on('Item.OrgId', '=', 'Organization.OrgId')
        });
        if (fieldname) {
            qb.where("Item." + fieldname, value);
        }
        if(orgId){
            qb.where("Item.OrgId","<>",orgId);
        }
    }).fetchAll().then(function (SellerList) {
        return SellerList;
    }).catch(function (err) {
        console.log(err);
    });
}

exports.AddItem = function (params) {
    console.log("AddItem");
    var ItemToAdd = new Item({
        ItemName: (params.ItemName) ? params.ItemName : null,
        ItemDiscp: (params.ItemDiscp) ? params.ItemDiscp : null,
        ItemPrice: (params.ItemPrice) ? params.ItemPrice : null,
        subcatId: (params.subcatId) ? params.subcatId : new Date(),
        ItemQuantity: (params.ItemQuantity) ? params.ItemQuantity : null,
        EstDelivery: (params.EstDelivery) ? params.EstDelivery : null,
        ItemCurrency: (params.ItemCurrency) ? params.ItemCurrency : null,
        ItemOfferPrice: (params.ItemOfferPrice) ? params.ItemOfferPrice : null,
        OfferValidTill: (params.OfferValidTill) ? params.OfferValidTill : null,
        Returns: (params.Returns) ? params.Returns : 'Accepted',
        OrgId: (params.OrgId) ? params.OrgId : null,
    });
    return ItemToAdd.save(null).tap(function (model) {
        itemData = model;
        return itemData;
    }).then(function (itemData) {
        return itemData;
    }).catch(function (err) {
        console.log(err);
    });
};

exports.UpdateItem = function (params) {
    console.log("Update Item");
    var ItemId = params.ItemID;
    var ItemToUpdate = {
        ItemName: (params.ItemName) ? params.ItemName : null,
        ItemDiscp: (params.ItemDiscp) ? params.ItemDiscp : null,
        ItemPrice: (params.ItemPrice) ? params.ItemPrice : null,
        subcatId: (params.subcatId) ? params.subcatId : new Date(),
        ItemQuantity: (params.ItemQuantity) ? params.ItemQuantity : null,
        EstDelivery: (params.EstDelivery) ? params.EstDelivery : null,
        ItemCurrency: (params.ItemCurrency) ? params.ItemCurrency : null,
        ItemOfferPrice: (params.ItemOfferPrice) ? params.ItemOfferPrice : null,
        OfferValidTill: (params.OfferValidTill) ? params.OfferValidTill : null,
        Returns: (params.Returns) ? params.Returns : 'Accepted',
        OrgId: (params.OrgId) ? params.OrgId : null,
    };
    return new Item().where({ 'ItemID': ItemId }).save(ItemToUpdate, {
        patch: true
    }).then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

exports.DeleteItem = function (ItemId) {
    return Item.forge().query(function (qb) {
        qb.where({
            'ItemID': ItemId
        });
        qb.del();
    }).fetch().then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

exports.uploadImage = function (data, ItemID) {

    var authUpdateParams = {
        patch: true
    };
    var authFetchParams = {};
    return Item.forge().query(function (qb) {
        if (ItemID)
            qb.where({ 'ItemID': ItemID });
    }).fetch().then(function (ItemPicture) {
        return ItemPicture.save(data, authUpdateParams);
    });
}

exports.getMyItems = function (OrgId) {
    return Item.forge().query(function (qb) {
        if (OrgId)
            qb.where({ 'OrgId': OrgId });
    }).fetchAll().then(function (Item) {
        return Item;
    }).catch(function (err) {
        return err;
    });
}

