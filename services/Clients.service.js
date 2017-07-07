var Clients = require('../models/Clients.model');
var Consumers = require('../models/UserAccount.model');
exports.AddClient = function (params) {
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
        DOB: (params.DOB) ? params.DOB : null
        // TBD Add Address fields
    });
    return Client.save(null).tap(function (model) {
        clientData = model;
        return clientData;
    }).then(function (clientData) {
        return clientData;
    }).catch(function (err) {
        console.log(err);
    });
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