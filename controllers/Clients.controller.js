var config = require('../config'),
    Clients = require('../models/Clients.model'),
    ClientsServices = require('../services/Clients.service')

exports.AddClient = function (req, res) {
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
};

exports.DeleteClient = function(req, res){
	console.log("DeleteClient");
    console.log("req.params.ClientId:",req.params.ClientId);
	var ClientId = (req.params.ClientId)?req.params.ClientId:false;
  		if(ClientId){
  			ClientsServices.DeleteClient(ClientId).then(function(result){
  				if(result)
  				res.json({"StatusCode": 200,"ResponseMessage": "Deleted Client Successfully"});
  				else
  				res.json({"Message": "An error has occurred."});	
  			}).catch(function(err){
  				res.json({"StatusCode":err.status,"deleteclients":[],"ResponseMessage":err.messages});
  			});
			
  		}else{
  			res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Categories/Delete'."});
  		}
};
exports.GetAllClients = function (req, res) {
    console.log("List clients");
    var userId = (req.query.UserId) ? req.query.UserId : false;
    console.log("userId:",userId);
    if ((userId != undefined)) {

        ClientsServices.GetAllClients(userId).then(function (result) {
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
                    "StatusCode": 404,
                    "clientlist": result,
                    "ResponseMessage": "Sorry no client found."
                });
        }).catch(function (err) {
            console.log("4:",JSON.stringify(err));
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