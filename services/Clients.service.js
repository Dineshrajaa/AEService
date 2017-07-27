var Clients = require('../models/Clients.model');
var Consumers = require('../models/UserAccount.model');
 exports.AddClient = function (params) {
    console.log("AddClient");
    var Client = new Clients({
        OrgId: (params.OrgId) ? params.OrgId : null,
        UserId: (params.UserId) ? params.UserId : null,
        FavouriteId: (params.FavouriteId) ? params.FavouriteId : null,
        CreateDate: (params.CreateDate) ? params.CreateDate : new Date(),
        CreatedBy: (params.CreatedBy) ? params.OrgId : null,
        IsActive: (params.IsActive) ? params.IsActive : true,
        ModifiedDate: (params.ModifiedDate) ? params.ModifiedDate : new Date(),
        ModifiedBy: (params.ModifiedBy) ? params.OrgId : null,
        FirstName: (params.FirstName) ? params.FirstName : null,
        LastName: (params.LastName) ? params.LastName : null,
        DOB: (params.DOB) ? params.DOB : null,
        Address: (params.Address) ? params.Address : null,
        PostCode: (params.PostCode) ? params.PostCode : null,
        Town: (params.Town) ? params.Town : null,
        // Profile: (params.Profile) ? params.Profile : null
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

/* exports.AddClient = function (params) {
    getSelectedConsumer(params.UserId).then(function (consumer) {
        var Client = new Clients({
            OrgId: (params.OrgId) ? params.OrgId : null,
            UserId: (params.UserId) ? params.UserId : null,
            FavouriteId: (params.FavouriteId) ? params.FavouriteId : null,
            CreateDate: (params.CreateDate) ? params.CreateDate : new Date(),
            CreatedBy: (params.OrgId) ? params.OrgId : null,
            IsActive: (params.IsActive) ? params.IsActive : true,
            ModifiedDate: (params.ModifiedDate) ? params.ModifiedDate : new Date(),
            ModifiedBy: (params.OrgId) ? params.OrgId : null,
            FirstName: (consumer.get('FirstName')) ? consumer.get('FirstName') : null,
            LastName: (consumer.get('LastName')) ? consumer.get('LastName') : null,
            DOB: (consumer.get('DOB')) ? consumer.get('DOB') : null,
            Address: (consumer.get('Address')) ? consumer.get('Address') : null,
            PostCode: (consumer.get('PostCode')) ? consumer.get('PostCode') : null,
            Town: (consumer.get('Town')) ? consumer.get('Town') : null,
            // Profile: (consumer.Profile) ? consumer.Profile : null,
            UserImage: (consumer.get('UserImage')) ? consumer.get('UserImage') : 'Upload/user/UserDefault.png'
        });
        return Client.save(null).tap(function (model) {

            clientData = model;
            return clientData;
        }).then(function (clientData) {
            console.warn('clientData', clientData);
            return clientData;
        }).catch(function (err) {
            console.log(err);
        });
    })


}; */
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
    console.warn('consumerId:',consumerId);
    var fetchParams = {};
    return Consumers.forge().query(function (qb) {
        if (consumerId)
            qb.where({
                'UserId': consumerId
            });
    }).fetch().then(function (Consumer) {
        return Consumer;
    }).catch(function (err) {
        return err;
    });
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