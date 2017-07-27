var Clients = require('../models/Clients.model');
var Consumers = require('../models/UserAccount.model');
/* exports.AddClient = function (params) {
    console.log("AddClient");
    var Client = new Clients({
        OrgId: (params.OrgId) ? params.OrgId : null,
        UserId: (params.UserId) ? params.UserId : null,
        FavouriteId: (params.FavouriteId) ? params.FavouriteId : null,
        CreateDate: (params.CreateDate) ? params.CreateDate : null,
        CreatedBy: (params.CreatedBy) ? params.CreatedBy : null,
        IsActive: (params.IsActive) ? params.IsActive : true,
        ModifiedDate: (params.ModifiedDate) ? params.ModifiedDate : null,
        ModifiedBy: (params.ModifiedBy) ? params.ModifiedBy : null,
        FirstName: (params.FirstName) ? params.FirstName : null,
        LastName: (params.LastName) ? params.LastName : null,
        DOB: (params.DOB) ? params.DOB : null,
        Address: (params.Address) ? params.Address : null,
        PostCode: (params.PostCode) ? params.PostCode : null,
        Town: (params.Town) ? params.Town : null,
        Profile: (params.Profile) ? params.Profile : null
    });
    return Client.save(null).tap(function (model) {
        clientData = model;
        return clientData;
    }).then(function (clientData) {
        return clientData;
    }).catch(function (err) {
        console.log(err);
    });
}; */

exports.AddClient = function (params) {
    /**
     * Method to Add a client
     */
    exports.getSelectedConsumer(params.UserId).then(function (consumer) {
        var Client = new Clients({
            OrgId: (params.OrgId) ? params.OrgId : null,
            UserId: (params.UserId) ? params.UserId : null,
            FavouriteId: (params.FavouriteId) ? params.FavouriteId : null,
            CreateDate: (params.CreateDate) ? params.CreateDate : new Date(),
            CreatedBy: (params.OrgId) ? params.OrgId : null,
            IsActive: (params.IsActive) ? params.IsActive : true,
            ModifiedDate: (params.ModifiedDate) ? params.ModifiedDate : new Date(),
            ModifiedBy: (params.OrgId) ? params.OrgId : null,
            FirstName: (consumer.FirstName) ? consumer.FirstName : null,
            LastName: (consumer.LastName) ? consumer.LastName : null,
            DOB: (consumer.DOB) ? consumer.DOB : null,
            Address: (consumer.Address) ? consumer.Address : null,
            PostCode: (consumer.PostCode) ? consumer.PostCode : null,
            Town: (consumer.Town) ? consumer.Town : null,
            Profile: (consumer.Profile) ? consumer.Profile : null,
            UserImage: (consumer.UserImage) ? consumer.UserImage : 'Upload/user/UserDefault.png'
        });
        return Client.save(null).tap(function (model) {
            clientData = model;
            return clientData;
        }).then(function (clientData) {
            return clientData;
        }).catch(function (err) {
            console.log(err);
        });
    })


};
exports.GetAllClients = function (OrgId) {
    console.log("Get all clients");
    return Clients.forge().query(function (qb) {
        if (OrgId != 0)
            qb.where({
                'OrgId': OrgId
            });

    }).fetchAll().then(function (Clients) {
        return Clients;
    }).catch(function (err) {
        return err;
    });
};

exports.GetAllConsumers = function () {
    console.log("Get all Consumers");
    return Consumers.forge().query(function (qb) {

        qb.where({
            'Role': 'User'
        });

    }).fetchAll().then(function (Consumers) {
        return Consumers;
    }).catch(function (err) {
        return err;
    });
};

exports.getSelectedConsumer = function (consumerId) {
    /**
     * Method to get the selected User details
     */
    var fetchParams = {};
    return UserAccount.forge().query(function (qb) {
        if (UserId)
            qb.where({
                'UserId': UserId
            });
    }).fetch(fetchParams);
}
exports.DeleteClient = function (ClientId) {
    return Clients.forge().query(function (qb) {
        qb.where({
            'ClientId': ClientId
        });
        qb.del();
    }).fetch().then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};