var config = require('../config'),
	Categories = require('../models/Comment.model'),
	FeedbackServices = require('../services/Feedback.service'),
	UserAccountServices = require('../services/UserAccount.service'),
	helperServices = require('../services/helper.service'),
	Promise = require("bluebird");

exports.postFeedBack = function (req, res) {
	/*console.log("req.query");
	console.log(req.query);
	console.log("req.params");
	console.log(req.params);
	console.log("req.body");
	console.log(req.body.Attachment);*/

	/*		{ FeedbackId: 0,
	  CatId: 0,
	  UserId: 149,
	  FeedBackCategory: 'Home',
	  message: 'gggggggg',
	  Attachment: '',
	  Categories: null }
	*/
	//return res.json({"StatusCode":200,"lstCategories":req.body.Attachment,"ResponseMessage":"Wow!! you are so passionate about your Categories Repository"});
	console.log("post FeedBack");
	var section = "FeedBack";
	var image = (req.body.Attachment) ? req.body.Attachment : false;
	var UserId = (req.query.UserId) ? req.query.UserId : false;
	if (!UserId) {

		return FeedbackServices.postFeedBack(req.body).then(function (result) {
			console.log(result);
			if (result) {
				if (image) {
					FeedBackImage = helperServices.base64toimage(image, result.get("FeedbackId"), section);
				}
				res.json({ "StatusCode": 200, "feedback_": result, "ResponseMessage": "Feedback insert successfully!" });
			}
			else {
				res.json({ "StatusCode": 404, "Message": "An error has occurred." });
			}
		}).catch(function (err) {
			res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
		});
	} else {
		res.json({ "Message": "Please send user Id." });
	}
}