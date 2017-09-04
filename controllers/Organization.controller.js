var config = require('../config'),
	Organization = require('../models/Organization.model'),
	OrganizationServices = require('../services/Organization.service'),
	helperServices = require('../services/helper.service'),
	fs = require("fs"),
	Promise = require("bluebird");
exports.GetOrganizationById = function (req, res) {
	console.log("GetOrganizationById");
	var OrgId = (req.query.id) ? req.query.id : false;
	console.log(OrgId);
	if (OrgId) {
		OrganizationServices.GetOrganizationById(OrgId, 'OrgId').then(function (result) {
			if (result.length) {
				return Promise.map(result.models, function (org) {
					org.set("OrgImage", config.image_url + org.get("OrgImage"));
					org.set("OrgCoverImage", config.image_url + org.get("OrgCoverImage"));
					console.log(org.get("OrgCoverImage"));
					return org;
				});
			} else {
				return [];

			}
		}).then(function (org) {
			if (org.length)
				res.json({ "StatusCode": 200, "organization": org[0], "ResponseMessage": "Wow!! you are so passionate about your OrganizationRepository" });
			else
				res.json({ "Message": "An error has occurred." });
		}).catch(function (err) {
			res.json({ "StatusCode": err.status, "organization": [], "ResponseMessage": err.messages });
		})
	} else {
		res.json({ "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Organization/GetById'." });
	}
}
exports.GetAllOrganization = function (req, res) {
	console.log("GetAllOrganization");
	OrganizationServices.GetOrganizationById(false, false).then(function (result) {
		if (result.length)
			res.json(result);
		else
			res.json({ "Message": "An error has occurred." });
	}).catch(function (err) {
		res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
	})
}

exports.UpdateOrganizationCover = function (req, res) {
	/* Method to update organization cover photo */
	var OrgId = req.params.OrgId;
	if (req.body.UserImage != '') {
		var min = 100000;
		var max = 999999;
		var name = Math.floor(Math.random() * (max - min + 1)) + min + ".png";
		var filename = config.image_path_global + '/Upload/OrginizationCover/' + name;
		var path = "Upload/OrginizationCover/" + name;
		fs.writeFile(filename, new Buffer(req.body.OrgCoverImage, "base64"), function (err) {
			console.log(err);
			console.log(filename);
		});

		req.body.OrgCoverImage = path;
		req.body.OrgId = OrgId;
	}

	OrganizationServices.GetOrganizationById(OrgId, 'OrgId')
		.then(function (organization) {
			if (organization)
				return OrganizationServices.UpdateCoverPhoto(req.body)
					.then(function (coverPhotoSuccess) {
						res.json({ "StatusCode": 200, "Organization": coverPhotoSuccess, "ResponseMessage": "Organization Cover Updated Successfully!" });
					});
			else
				res.json({ "StatusCode": 200, "ResponseMessage": "Organization Not Found!" });
		})
		.catch(function (err) {
			console.log(err);
		});
}
//get near by organnization
exports.FindNearByOrganization = function (req, res) {
	console.log("FindNearByOrganization");
	var longatitude = (req.query.longatitude) ? req.query.longatitude : false;
	var latitude = (req.query.latitude) ? req.query.latitude : false;
	if (longatitude && latitude) {
		//var originString = latitude+","+longatitude;
		var originString = {
			"latitude": latitude,
			"longitude": longatitude
		}

		//var origins = [originString];
		var origins = originString;
		var allorg = [];
		return OrganizationServices.FindNearByOrganization(req.query).then(function (result) {
			if (result.length) {
				var destinations = [];
				return Promise.map(result.models, function (org) {
					//var destString = org.get("Latitude")+","+org.get("Longitude");
					var destString = {

						"latitude": org.get("Latitude"),
						"longitude": org.get("Longitude")
					};
					console.log(originString);
					console.log(destString);
					var miles = helperServices.getDistance(origins, destString, 2);
					org.set("OrgImage", config.image_url + org.get("OrgImage"));
					org.set("OrgCoverImage", config.image_url + org.get("OrgCoverImage"));
					org.set("Miles", Math.round(miles) + " miles");
					org.set("MilesTEXT", miles);
					return org;
				});
			}
			else {
				return false;
			}
		}).then(function (latlongarray) {
			return latlongarray;
			/*if(latlongarray){
							return new Promise(function(resolve, reject) {  
								var dddd= helperServices.getDistance(req,res,allorg,latlongarray,origins, resolve, reject);
								
								return dddd;
							});
			}else{
				return false;
			}*/
		}).then(function (fres) {
			fres.sort(function (a, b) {
				return parseFloat(a.get('MilesTEXT')) - parseFloat(b.get('MilesTEXT'));
			});
			res.json({ "StatusCode": 200, "lstNearBy": fres, "ResponseMessage": "Wow!! you are so passionate about your Near By Location" });
		}).catch(function (err) {
			res.json({ "StatusCode": err.status, "lstNearBy": [], "ResponseMessage": err.messages });
		})

	} else {
		res.json({ "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/FindNearByOrganization'." });
	}
}
