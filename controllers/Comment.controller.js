var config         = require('../config'),
	Categories = require('../models/Comment.model'),
	CommentServices = require('../services/Comment.service'),
	UserAccountServices = require('../services/UserAccount.service'),
	helperServices = require('../services/helper.service'),
	Promise        = require("bluebird");

exports.commentGetById = function(req, res){
	console.log("commentGetById");
	var  PostId = (req.query.id)?req.query.id:false;
	if(PostId){
		CommentServices.commentGetById(req.query).then(function(comments){
			return Promise.map(comments.models, function(comm) {
				var DisplayTime = helperServices.getDisplayTime(comm.get('CommentTime'));
					return  { "CommentId": comm.get("CommentId"),
					"PostId": comm.get("PostId"),
					"UserId": comm.get("UserId"),
					"CommentMsg": comm.get("CommentMsg"),
					"CommentImage": config.image_url+comm.get("CommentImage"),
					"UserName": comm.relations.UserAccount.get("FirstName")+" "+comm.relations.UserAccount.get("LastName"),
					"UserImage": config.image_url+comm.relations.UserAccount.get("UserImage"),
					"FirstName": comm.relations.UserAccount.get("FirstName"),
					"LastName": comm.relations.UserAccount.get("LastName"),
					"City": comm.relations.UserAccount.get("City"),
					"Country": comm.relations.UserAccount.get("Country"),
					"PostMessage": comm.relations.UserAccount.get("PostMessage"),
					"ReviewId": comm.relations.UserAccount.get("ReviewId"),
					"ReviewComment": null,
					"ReviewTime": "0001-01-01T00:00:00",
					"ReviewCommentId": 0,
					"CommentCount": 0,
					"PostTime": "0001-01-01T00:00:00",
					"DisplayTime": DisplayTime,
					"CommentTime": comm.get("CommentTime"),
					"CreateDate": null,
					"ModifyDate": null,
					"PostGet": null,
					"UserAccount": null
					}
			});		
		}).then(function(comment){
			res.json({"StatusCode": 200,"lstComment":comment,"ResponseMessage": "Wow!! you are so passionate about your CommentRepository"});
		}).catch(function(err){
			res.json({"StatusCode":err.status,"lstComment":[],"ResponseMessage":err.messages});
		});
	}else{
		res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Comment/GetById'."});
	}

};

exports.CreateComment = function(req, res){
	console.log("CreateComment");
	//var action = "create";
	var section = "comment";
	var image = (req.body.CommentImage)?req.body.CommentImage:false;
	var data1 = {
		"PostId":(req.body.PostId)?req.body.PostId:false,
		"UserId":(req.body.UserId)?req.body.UserId:false,
		"CommentMsg":(req.body.CommentMsg)?req.body.CommentMsg:false
	}
	if(!data1.PostId || !data1.UserId){

		res.json({"StatusCode":404,"Message": "An error has occurred."});
	}else{
		return UserAccountServices.GetUserAccount(data1.UserId).then(function(user){
			if(user){
						return CommentServices.CreateComment(data1).then(function(result){
							if(result){
								if(image){
										data1.CommentImage = helperServices.base64toimage(image,result.get("CommentId"),section);
								}
								res.json({"StatusCode": 200,"comment_": result,"ResponseMessage": "Comment insert successfully!"});
							}
							else{
								res.json({"StatusCode":404,"Message": "An error has occurred."});
							}
						}).catch(function(err){
							res.json({"StatusCode":err.status,"lstComment":[],"ResponseMessage":err.messages});
						})
			}
			else{
				res.json({"StatusCode":404,"Message": "An error has occurred."});
			}
		}).catch(function(err){
			res.json({"StatusCode":err.status,"lstComment":[],"ResponseMessage":err.messages});
		});
		
	}
}

exports.updateComment = function(req, res){
	console.log("updateComment");
	var section = "comment";
	var image = (req.body.CommentImage)?req.body.CommentImage:false;
	if(!req.body.CommentId || !req.body.PostId || !req.body.UserId){
		res.json({"Message": "An error has occurred."});
	}else{
		return UserAccountServices.GetUserAccount(req.body.UserId).then(function(user){
			if(user){
						return CommentServices.updateComment(req.body).then(function(result){
							if(result){
								if(image){
									var CommentImageresponse = helperServices.base64toimage(image,req.body.CommentId,section);
								}
								res.json({"StatusCode": 200,"comment_": result,"ResponseMessage": "Comment insert successfully!"});
							}
							else{
								res.json({"StatusCode":404,"Message": "An error has occurred."});
							}
						}).catch(function(err){
							res.json({"StatusCode":err.status,"lstComment":[],"ResponseMessage":err.messages});
						})
			}
			else{
				res.json({"Message": "An error has occurred."});
			}
		}).catch(function(err){
			res.json({"StatusCode":err.status,"lstComment":[],"ResponseMessage":err.messages});
		});
		
	}
};

exports.DeleteComment = function(req, res){
	console.log("DeleteComment");
 if(!req.query.id){
		res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"Aesthetic/api/Comment/Delete'."});
	}else{
		return CommentServices.delete(req.query.id).then(function(result){
			if(result)
				res.json({"StatusCode": 200,"ResponseMessage": "Deleted Successfully"});
			else
				res.json({"StatusCode":404,"Message": "An error has occurred."});

		}).catch(function(err){
			res.json({"StatusCode":err.status,"lstComment":[],"ResponseMessage":err.messages});
		})
	}
}