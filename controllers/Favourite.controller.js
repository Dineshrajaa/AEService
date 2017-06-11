var config         = require('../config'),
	Favourite= require('../models/Favourite.model'),
	FavouriteServices = require('../services/Favourite.service'),
	Promise        = require("bluebird");

//get all favourite organizations 
exports.GetAllFavourites = function(req, res){
	console.log("GetAllFavourites");
	FavouriteServices.GetAllFavourites(false,false).then(function(Favourites){
		if(Favourites.length){
			res.json(Favourites);
		}else{
			res.json({"Message": "An error has occurred."});
		}
	}).catch(function(err){
		res.json({"StatusCode":err.status,"Favourites":[],"ResponseMessage":err.messages});
	});
};

//get all post that belongs to favourites organization using user Id and organization name
exports.SearchRecord = function(req, res){
console.log("SearchRecord");
	var  UserId = (req.query.id)?req.query.id:false;
	if(UserId && req.query.input!=undefined){
		var  OrgNameDes = (req.query.input)?req.query.input:false;
		if(!OrgNameDes)
			req.query.input = false; 
		FavouriteServices.SearchRecord(req.query).then(function(Favourites){
			if(Favourites.length){
				return Promise.map(Favourites,function(org){
					org.set("PostImage",config.image_url+org.get("PostImage"));
					return org;
				});



					//return Favourites;
			}else{
					return [];
			}
			
			
		}).then(function(Favour){
			if(Favour.length)
			res.json({"StatusCode": 200,"lstFavourite":Favour, "ResponseMessage": "Wow!! you are so passionate about your FavouritesRepository"});
			else
			res.json({"StatusCode": 404,"lstFavourite":Favour, "ResponseMessage": "Sorry not in the list."});	
		}).catch(function(err){
			res.json({"StatusCode":err.status,"Favourites":[],"ResponseMessage":err.messages});
		});
	}else{
		res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Favourite/SearchRecord'."});
	}

}; 

//get all post belongs to favourites organization using user Id and country
exports.SearchRecordWithCountry = function(req, res){
	console.log("SearchRecordWithCountry");
	var  UserId = (req.query.id)?req.query.id:false;
	if(UserId && req.query.input!=undefined){
		var  OrgNameDes = (req.query.input)?req.query.input:false;
		if(!OrgNameDes)
			req.query.input = false; 
		data = {
			"id": req.query.id,
			"country":OrgNameDes
		}
		FavouriteServices.SearchRecord(data).then(function(Favourites){
			
			return Favourites;
		}).then(function(Favour){
			res.json({"StatusCode": 200,"lstFavourite":Favour, "ResponseMessage": "Wow!! you are so passionate about your FavouritesRepository"});
		}).catch(function(err){
			res.json({"StatusCode":err.status,"Favourites":[],"ResponseMessage":err.messages});
		});
	}else{
		res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Favourite/SearchRecord'."});
	}
}
exports.GetFavouriteById = function(req, res){
	console.log("GetFavouriteById");
	var  UserId = (req.query.id)?req.query.id:false;
	if(UserId){
		FavouriteServices.SearchRecord(req.query).then(function(Favourites){
			
			return Favourites;
		}).then(function(Favour){
			res.json({"StatusCode": 200,"lstFavourite":Favour, "ResponseMessage": "Wow!! you are so passionate about your FavouritesRepository"});
		}).catch(function(err){
			res.json({"StatusCode":err.status,"Favourites":[],"ResponseMessage":err.messages});
		});
	}else{
		res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Favourite/SearchRecord'."});
	}

}
//add an organization as favourite
exports.addFavourite = function(req, res){
console.log("addFavourite");
console.log(req.body);
	if(req.body.OrgId==undefined || req.body.UserId == undefined){
		res.json({ "Message": "An error has occurred."});
	}else{
		FavouriteServices.addFavourite(req.body).then(function(result){
			res.json({"StatusCode": 200,"favourite_": result,"ResponseMessage": "Favourite insert successfully!"});
		}).catch(function(err){
			res.json({"StatusCode":err.status,"Favourites":[],"ResponseMessage":err.messages});
		});
	}
}

//check an organization is in favourie or not
exports.OrgDuplicate = function(req, res){
	console.log("OrgDuplicate");
	if(req.query.OrgId==undefined || req.query.Userid == undefined || req.query.OrgId.length ==0){
		res.json({ "Message": "Request is invalid."});
	}else{
		FavouriteServices.OrgDuplicate(req.query).then(function(result){
			if(result)
				res.json({"StatusCode": 200,"ResponseMessage": "Record Found!"});
			else
				res.json({"StatusCode": 404,"ResponseMessage": "No Record Found!"});
		}).catch(function(err){
			res.json({"StatusCode":err.status,"Favourites":[],"ResponseMessage":err.messages});
		});
	}
}

//delete favourite organization using userId and orgId
exports.DeleteFavouriteByUser = function(req, res){
	console.log("DeleteFavouriteByUser");
	if(req.query.OrgId==undefined || req.query.Userid == undefined || req.query.OrgId.length ==0 || req.query.Userid.length == 0 ){
		res.json({ "Message": "Request is invalid."});
	}else{
		FavouriteServices.DeleteFavouriteByUser(req.query).then(function(result){
			if(result)
				res.json({"StatusCode": 200,"ResponseMessage": "Record Found!"});
			else
				res.json({"StatusCode": 404,"ResponseMessage": "No Record Found!"});
		}).catch(function(err){
			res.json({"StatusCode":err.status,"Favourites":[],"ResponseMessage":err.messages});
		});
	}
}
