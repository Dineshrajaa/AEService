var config         = require('../config'),
	PostGet = require('../models/PostGet.model'),
	PostGetServices = require('../services/PostGet.service'),
	moment = require('moment'),
	Promise        = require("bluebird");

exports.getAllPost = function(req, res){
	console.log("getAllPost");
	console.log(req);
}

exports.SearchRecord = function(req, res){
	console.log("SearchRecord in postget");

	console.log(req.query);
	var  UserId = (req.query.id)?req.query.id:false;
	if(UserId && req.query.input!=undefined){
		var  OrgNameDes = (req.query.input)?req.query.input:false;
		if(!OrgNameDes)
			req.query.input = false; 
		PostGetServices.SearchRecord(req.query,false).then(function(Allpost){
			//return Allpost;
			console.log("Allpost");
			console.log(Allpost);
			if(Allpost.length){
				return Allpost;
			}else{
				return [];
			}
		}).then(function(post){
			if(post.length)
			res.json({"StatusCode": 200,"lstPostGet":post, "ResponseMessage": "Wow!! you are so passionate about your PostGetRepository"});
			else
			res.json({"StatusCode": 404,"lstPostGet":post, "ResponseMessage": "Sorry not in the list."});
		}).catch(function(err){
			res.json({"StatusCode":err.status,"lstPostGet":[],"ResponseMessage":err.messages});
		});
	}else{
		res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/PostGet/SearchRecord'."});
	}
	//res.json({"StatusCode":200,"lstPostGet":{}});
}

//search post using country
exports.SearchRecordWithCountry = function(req, res){
	console.log("SearchRecordWithCountry in postget");
	var  UserId = (req.query.id)?req.query.id:false;
	console.log(UserId);
	if(UserId && req.query.input!=undefined){
		var  OrgNameDes = (req.query.input)?req.query.input:false;
		if(!OrgNameDes)
			req.query.input = false; 
		PostGetServices.SearchRecord(req.query,"country").then(function(Allpost){
			
			return Allpost;
		}).then(function(post){
			console.log(post.length);
			res.json({"StatusCode": 200,"lstPostGet":post, "ResponseMessage": "Wow!! you are so passionate about your PostGetRepository"});
		}).catch(function(err){
			res.json({"StatusCode":err.status,"lstPostGet":[],"ResponseMessage":err.messages});
		});
	}else{
		res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/PostGet/SearchRecordWithCountry'."});
	}
}
//get all post accordig to organization id
exports.GetByOrgId = function(req, res){
	console.log("GetByOrgId in postget");
	var OrgId = (req.query.Id)?req.query.Id:false;
	if(OrgId){
		PostGetServices.SearchRecordbyOrganization(req.query,"organization").then(function(Allpost){
			//return Allpost;
			if(Allpost.length){
				return Allpost;
			/*var now = moment



			TimeSpan span = DateTime.Now - dt;
            if (span.Days > 365)
            {
                int years = (span.Days / 365);
                if (span.Days % 365 != 0)
                    years += 1;
                return String.Format(" {0} {1} ",
                years, years == 1 ? "year" : "years");
            }
            if (span.Days > 30)
            {
                int months = (span.Days / 30);
                if (span.Days % 31 != 0)
                    months += 1;
                return String.Format(" {0} {1} ",
                months, months == 1 ? "month" : "months");
            }
            if (span.Days > 0)
                return String.Format(" {0} {1} ",
                span.Days, span.Days == 1 ? "day" : "days");
            if (span.Hours > 0)
                return String.Format(" {0} {1} ",
                span.Hours, span.Hours == 1 ? "hour" : "hours");
            if (span.Minutes > 0)
                return String.Format(" {0} {1} ",
                span.Minutes, span.Minutes == 1 ? "minute" : "minutes");
            if (span.Seconds > 5)
                return String.Format(" {0} seconds ", span.Seconds);
            if (span.Seconds <= 5)
                return "just now";
            return string.Empty;*/

			}else{
				return [];
			}
		}).then(function(post){	
			res.json({"StatusCode": 200,"lstPostGet":post,"ResponseMessage": "Wow!! you are so passionate about your PostGetRepository"});
	
		}).catch(function(err){
			res.json({"StatusCode":err.status,"lstPostGet":[],"ResponseMessage":err.messages});
		});
	}else{
		res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/PostGet/GetByOrgId'."});
	}
	
}
