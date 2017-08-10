var config = require('../config'),
	Treatment = require('../models/Treatment.model'),
	TreatmentServices = require('../services/Treatment.service'),
	Promise = require("bluebird");
exports.treatmentGetByOrgId = function (req, res) {
	console.log("treatmentGetByOrgId");
	console.log(req.query);
	var OrgId = (req.query.OrgId) ? req.query.OrgId : false;
	if (OrgId) {
		return TreatmentServices.treatmentGetByOrgId(req.query).then(function (result) {
			if (result.length)
				res.json({ "StatusCode": 200, "lstTreatment": result, "ResponseMessage": "Wow!! you are so passionate about your TraetmentRepository" });
			else
				res.json({ "StatusCode": 200, "lstTreatment": result, "ResponseMessage": "No treatment available" });
		}).catch(function (err) {
			res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
		});

	} else {
		res.json({ "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Treatment/GetByOrgId'." });
	}
}

exports.addNewTreatment = function (req, res) {
	/**
	 * Method to add new treatments
	 */
	var OrgId = (req.body.OrgId) ? req.body.OrgId : false;
	if (OrgId) {
		TreatmentServices.AddTreatment(req.body).then(function (result) {
			res.json({
				"StatusCode": 200,
				"data": result,
				"ResponseMessage": "Added Treatment successfully!"
			});
		}).catch(function (err) {
			res.json({
				"StatusCode": err.status,
				"data": [],
				"ResponseMessage": err.messages
			});
		});
	} else {
		res.json({
			"Message": "An error has occurred."
		});
	}
}