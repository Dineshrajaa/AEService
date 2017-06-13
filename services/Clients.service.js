var Clients = require('../models/Clients.model');
var Consumers = require('../models/UserAccount.model');
exports.AddClient = function (params) {
    console.log("AddClient");
    var Client = new Clients({
        FirstName: (params.FirstName) ? params.FirstName : null,
        Gender: (params.Gender) ? params.Gender : null,
        DOB: (params.DOB) ? params.DOB : null,
        Address: (params.Address) ? params.Address : null,
        Town: (params.Town) ? params.Town : null,
        PostCode: (params.PostCode) ? params.PostCode : null,
        Profile: (params.Profile) ? params.Profile : null,
        AddedBy: (params.AddedBy) ? params.AddedBy : null,
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

exports.GetAllClients = function (userId) {
    console.log("Get all clients");
    // var userId = (params.UserId) ? params.UserId : 0;
    console.log("serviceUserId:", userId);
    return Clients.forge().query(function (qb) {
        if (userId != 0)
            qb.where({
                'AddedBy': userId
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