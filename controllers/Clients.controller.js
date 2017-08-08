var config = require('../config'),
    Clients = require('../models/Clients.model'),
    Consumers = require('../models/UserAccount.model'),
    ClientsServices = require('../services/Clients.service'),
    orm = require('../orm');

/* exports.AddClient = function (req, res) {
    console.log("AddClient");
    ClientsServices.AddClient(req.body).then(function (result) {
        if (result)
            res.json({
                "StatusCode": 200,
                "client_": result,
                "ResponseMessage": "Added Client Successfully!"
            });
        else
            res.json({
                "StatusCode": 404,
                "client_": result,
                "ResponseMessage": "error"
            });
    }).catch(function (err) {
        res.json({
            "StatusCode": err.status,
            "lstCategories": [],
            "ResponseMessage": err.messages
        });
    });
}; */
exports.AddClient = function (req, res) {
    console.log("AddClient");
    ClientsServices.getSelectedConsumer(req.body.UserId).then(function (result) {
        if (result) {
            console.warn(result.get('UserImage'));
            req.body.FirstName = result.get('FirstName');
            req.body.LastName = result.get('LastName');
            req.body.DOB = result.get('DOB');
            req.body.PostCode = result.get('PostCode');
            req.body.Address = result.get('Address');
            req.body.Town = result.get('Town');
            req.body.UserImage = (result.get('UserImage')) ? result.get('UserImage') : 'Upload/user/UserDefault.png';
            ClientsServices.AddClient(req.body).then(function (result) {
                if (typeof result == 'undefined')
                    res.json({
                        "StatusCode": 200,
                        "client_": result,
                        "ResponseMessage": "Client already exist!"
                    });
                else {
                    // exports.markFavouriteAsClient(result.get('FavouriteId'));
                    res.json({
                        "StatusCode": 200,
                        "client_": result,
                        "ResponseMessage": "Added Client Successfully!"
                    });
                }
            })
        }
        /* res.json({
            "StatusCode": 200,
            "client_": result,
            "ResponseMessage": "Added Client Successfully!"
        }); */
        else
            res.json({
                "StatusCode": 404,
                "client_": result,
                "ResponseMessage": "error"
            });
    }).catch(function (err) {
        res.json({
            "StatusCode": err.status,
            "lstCategories": [],
            "ResponseMessage": err.messages
        });
    });
};
exports.markFavouriteAsClient = function (FavouriteId) {
    /**
     * Method to mark this client as favourite
     */
    console.log('Here 1');
    return orm.bookshelf.transaction(function (trx) {
        return ClientsServices.getFollowerById(FavouriteId, trx)
            .then(function (follower) {
                console.warn('follower:', follower);
                if (follower)
                    return ClientsServices.UpdateFollowerStatus(FavouriteId, trx);
                else
                    return false;
            })
            .catch(function (err) {
                console.log(err);
            });
    })
}
exports.DeleteClient = function (req, res) {
    console.log("DeleteClient");
    console.log("req.params.ClientId:", req.params.ClientId);
    var ClientId = (req.params.ClientId) ? req.params.ClientId : false;
    if (ClientId) {
        ClientsServices.DeleteClient(ClientId).then(function (result) {
            if (result)
                res.json({
                    "StatusCode": 200,
                    "ResponseMessage": "Deleted Client Successfully"
                });
            else
                res.json({
                    "Message": "An error has occurred."
                });
        }).catch(function (err) {
            res.json({
                "StatusCode": err.status,
                "deleteclients": [],
                "ResponseMessage": err.messages
            });
        });

    } else {
        res.json({
            "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Categories/Delete'."
        });
    }
};
exports.GetAllClients = function (req, res) {
    console.log("List clients");
    var OrgId = (req.params.OrgId) ? req.params.OrgId : false;
    console.log("OrgId:", OrgId);
    if ((OrgId != undefined)) {

        ClientsServices.GetAllClients(OrgId).then(function (result) {
            if (result) {
                console.log("1");
                return result;
                /*return Promise.map(result.models, function (clients) {
                    return clients;
                });*/

            } else {
                console.log("2");
                return [];
            }
        }).then(function (result) {
            console.log("3");
            if (result.length)
                res.json({
                    "StatusCode": 200,
                    "clientlist": result,
                    "ResponseMessage": "Wow!! you are so passionate about your Clients"
                });
            else
                res.json({
                    "StatusCode": 200,
                    "clientlist": result,
                    "ResponseMessage": "Sorry no client found."
                });
        }).catch(function (err) {
            console.log("4:", JSON.stringify(err));
            res.json({
                "StatusCode": err.status,
                "clientlist": [],
                "ResponseMessage": err.messages
            });
        });
    } else {
        res.json({
            "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/GetAllCategories'."
        });
    }
};




exports.GetAllConsumers = function (req, res) {
    console.log("List consumers");

    ClientsServices.GetAllConsumers().then(function (result) {
        if (result) {
            return result;
            /*return Promise.map(result.models, function (clients) {
                return clients;
            });*/

        } else {
            console.log("2");
            return [];
        }
    }).then(function (result) {
        console.log("3");
        if (result.length)
            res.json({
                "StatusCode": 200,
                "consumerlist": result,
                "ResponseMessage": "Wow!! you are so passionate about your Consumers"
            });
        else
            res.json({
                "StatusCode": 404,
                "clientlist": result,
                "ResponseMessage": "Sorry no Consumer found."
            });
    }).catch(function (err) {
        console.log("4:", JSON.stringify(err));
        res.json({
            "StatusCode": err.status,
            "consumerlist": [],
            "ResponseMessage": err.messages
        });
    });

};