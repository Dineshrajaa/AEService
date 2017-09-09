var config         = require('../config'),
	Review = require('../models/Review.model'),
	ReviewComment = require('../models/ReviewComment.model'),
	ReviewServices = require('../services/Review.service'),
	 helperServices = require('../services/helper.service'),
	Promise        = require("bluebird");
//get reviewcomment by review id
exports.GetReviewCommentById = function(req, res){
	console.log("GetReviewCommentById");
	var ReviewId = (req.query.id)?req.query.id:false;
	if(ReviewId){
		return ReviewServices.GetReviewCommentById(req.query,"comments").then(function(comments){
			if(comments.length){
				return Promise.map(comments.models,function(comment){
					var DisplayTime = helperServices.getDisplayTime(comment.get('ReviewCommentTime'));
					return  {
							"ReviewCommentId": comment.get('ReviewCommentId'),
							"ReviewId": comment.get('ReviewId'),
							"UserId": comment.get('UserId'),
							"Review": comment.get('Review'),
							"ReviewCommentMsg": comment.get('ReviewCommentMsg'),
							"ReviewCommentImage": comment.get('ReviewCommentImage'),
							"ReviewCommentTime": comment.get('ReviewCommentTime'),
							"ReviewCreateDate": comment.get('ReviewCreateDate'),
							"ReviewModifyDate": comment.get('ReviewModifyDate'),
							"UserImage": comment.relations.UserAccount.get('UserImage'),
							"FirstName": comment.relations.UserAccount.get('FirstName'),
							"LastName": comment.relations.UserAccount.get('LastName'),
							"FullName": comment.relations.UserAccount.get('FirstName')+' '+comment.relations.UserAccount.get('LastName'),
							"DisplayTime": DisplayTime
    						}
					});
			}else{
				return [];
			}
		}).then(function(comm){
			if(comm.length)
				res.json({"StatusCode": 200,"lstReviewComment":comm,"ResponseMessage": "Wow!! you are so passionate about your lstReviewCommentRepository"});
			else
			res.json({"StatusCode": 404,"lstReview":[],"ResponseMessage": "No comments yet" });	
		}).catch(function(err){
			console.log(err);
				res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
		});
	}else{
  		res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Review/GetReviewByOrgId'."});
	}
}

exports.ReviewComment = function(req, res){
	console.log("ReviewComment");
	res.json({"StatusCode": 404,"lstReview":[],"ResponseMessage": "No comments yet" });	
}

exports.CreateReviewComment = function(req, res){
	console.log("CreateReviewComment");
	var image = (req.body.ReviewCommentImage)?req.body.ReviewCommentImage:false;
	var section = "ReviewComment";
	var data = {
		"ReviewId":(req.body.ReviewId)?req.body.ReviewId:false,
		"UserId":(req.body.UserId)?req.body.UserId:false,
		"ReviewCommentMsg":(req.body.ReviewCommentMsg)?req.body.ReviewCommentMsg:false,
	}
	if(!data.ReviewId || !data.UserId){
		res.json({"StatusCode":404,"Message": "An error has occurred."});
	}else{
		return ReviewServices.CreateReviewComment(data).then(function(reviews){
			if(reviews){
				if(image){
					var ReviewCommentImageresponse = helperServices.base64toimage(image,reviews.get('ReviewCommentId'),section);
				}
				res.json({"StatusCode": 200,"reviewComment_": {},"ResponseMessage": "Review Comment added successfully!"});
			}
			else{
				res.json({"StatusCode":404,"Message": "An error has occurred."});
			}
		}).catch(function(err){
			res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
		});
	}
}

//get review using organization id
exports.GetReviewByOrgId = function(req, res){
	console.log("GetReviewByOrgId");
	var OrgId = (req.query.id)?req.query.id:false;
	if(OrgId){
		return ReviewServices.GetReviewByOrgId(req.query,false).then(function(reviews){
			if(reviews.length){
				return Promise.map(reviews.models,function(review){
					var DisplayTime = helperServices.getDisplayTime(review.get('ReviewTime'));
					return  {
						      "ReviewId": review.get("ReviewId"),
						      "UserId": review.get("UserId"),
						      "OrgId": review.get("OrgId"),
						      "ReviewComment": review.get("ReviewComment"),
						      "ReviewTime": review.get("ReviewTime"),
						      "CreateDate": review.get("CreateDate"),
						      "ModifyDate": review.get("ModifyDate"),
						      "Attachment": review.get("Attachment"),
						      "UserAccount": null,
						      "OrgImage": null,
						      "OrgName": null,
						      "address": review.relations.UserAccount.get("City")+', '+review.relations.UserAccount.get("Town"),
						      "UserImage": review.relations.UserAccount.get("UserImage"),
						      "FirstName": review.relations.UserAccount.get("FirstName"),
						      "LastName": review.relations.UserAccount.get("LastName"),
						      "CommentOfCount": review.relations.ReviewComment.length,
						      "Fullname": review.relations.UserAccount.get("FirstName")+ ' '+review.relations.UserAccount.get("LastName"),
						      "DisplayTime": DisplayTime
    						}
					});
			}else{
				return [];
			}
		}).then(function(fresult){
			if(fresult.length)
				res.json({"StatusCode": 200,"lstReview":fresult,"ResponseMessage": "Wow!! you are so passionate about your ReviewRepository" });
			else
			res.json({"StatusCode": 404,"lstReview":[],"ResponseMessage": "No reviews yet" });
		}).catch(function(err){
			res.json({"StatusCode":err.status,"lstCategories":[],"ResponseMessage":err.messages});
		})
	}else{
  		res.json({"Message": "No HTTP resource was found that matches the request URI '"+config.webUri+"/Aesthetic/api/Review/GetReviewByOrgId'."});
	}
	
}

exports.PostReview = function(req, res){
	console.log("PostReview");
	var image = (req.body.Attachment)?req.body.Attachment:false;
	var section = "review";
	var data1 = {
		"UserId":(req.body.UserId)?req.body.UserId:false,
		"OrgId":(req.body.OrgId)?req.body.OrgId:false,
		"ReviewComment":(req.body.ReviewComment)?req.body.ReviewComment:false
	}
	if(!data1.UserId || !data1.OrgId){
		res.json({"StatusCode":404,"Message": "An error has occurred."});
	}else{
		return ReviewServices.PostReview(data1).then(function(reviews){
			if(reviews){
				if(image){
					var Attachmentresponse = helperServices.base64toimage(image,reviews.get('ReviewId'),section);
				}
				res.json({"StatusCode": 200,"review_": reviews,"ResponseMessage": "Review insert successfully!"});
			}
			else{
				res.json({"StatusCode":404,"Message": "An error has occurred."});
			}
		}).catch(function(err){
			res.json({"StatusCode":err.status,"review_":[],"ResponseMessage":err.messages});
		});
		
	}	
}