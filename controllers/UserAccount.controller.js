var config = require('../config'),
	UserAccount = require('../models/UserAccount.model'),
	UserAccountServices = require('../services/UserAccount.service'),
	helperServices = require('../services/helper.service'),
	moment = require('moment'),
	fs = require("fs"),
	Promise = require("bluebird"),
	orm = require('../orm');
/*Get all categories*/
exports.registerUser = function (req, res) {
	console.log("registerUser");
	var _this=this;
	password = helperServices.encryption(req.body.Password, req.body.EmailId);
	req.body.Password = password;

	UserAccountServices.getUserByEmail(req.body.EmailId).then(function (result) {

		if (result == 0) {
			var OrgId = null;
			if (req.body.Role === 'business') {
				// This is a business app request so register organization and save it to request
				UserAccountServices.registerOrganization(req.body).then(function (result) {
					req.body.OrgId = result;
					exports.saveUser(req,res);
					
				}).catch(function (err) {
					res.json({
						"StatusCode": err.status,
						"Organization": [],
						"ResponseMessage": err.messages
					});
				});
			} else exports.saveUser(req,res);
		} else {
			res.json({
				"StatusCode": 302,
				"user": [],
				"ResponseMessage": "User Alredy Exist!!"
			});
		}

	}).catch(function (err) {
		res.json({
			"StatusCode": err.status,
			"Favourites": [],
			"ResponseMessage": err.messages
		});
	});
}
// save user
exports.saveUser = function (req,res) {
	req.body.Fullname = req.body.FirstName + ' ' + req.body.LastName;
	req.body.ModifyDate = moment().format('YYYY-MM-DD HH:mm:ss');
	req.body.CreateDate = moment().format('YYYY-MM-DD HH:mm:ss');
	return UserAccountServices.registerUser(req.body).then(function (result1) {
		res.json({
			"StatusCode": 200,
			"user": result1,
			"ResponseMessage": "New user created successfully!"
		});
	}).catch(function (err) {
		res.json({
			"StatusCode": err.status,
			"user": [],
			"ResponseMessage": err.messages
		});
	});
}

//get all users
exports.getAllUsers = function (req, res) {
	console.log("getAllUsers");
	UserAccountServices.getAllUsers().then(function (result) {
		res.json(result);
	}).catch(function (err) {
		res.json({
			"StatusCode": err.status,
			"Favourites": [],
			"ResponseMessage": err.messages
		});
	});
}

//get user by id
exports.GetUserAccount = function (req, res) {
	console.log("GetUserAccount");
	var UserId = (req.query.id) ? req.query.id : false;
	UserAccountServices.GetUserAccount(UserId).then(function (result) {

		if (!result)
			res.json({
				"Message": "An error has occurred."
			});
		else
			res.json(result);
	}).catch(function (err) {
		res.json({
			"StatusCode": err.status,
			"Favourites": [],
			"ResponseMessage": err.messages
		});
	});
}

//get user by id with proper response
exports.GetUserAccountById = function (req, res) {
	console.log("GetUserAccountById");
	var UserId = (req.query.id) ? req.query.id : false;
	console.log(UserId);
	if (UserId) {
		UserAccountServices.GetUserAccount(UserId).then(function (result) {
			console.log(result.get("DOB"));
			if (!result) {
				return res.json({
					"Message": "An error has occurred."
				});
			} else {

				result.set("UserImage", config.image_url + result.get("UserImage"));
				return result;
			}
		}).then(function (fresult) {
			res.json({
				"StatusCode": 200,
				"userAccount": fresult,
				"ResponseMessage": "Wow!! you are so passionate about your UserAccountRepository"
			});
		}).catch(function (err) {
			res.json({
				"StatusCode": err.status,
				"Favourites": [],
				"ResponseMessage": err.messages
			});
		});
	} else {
		res.json({
			"Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Users/GetById'."
		});
	}

}

//update user profile
/*exports.updateUserProfile = function(req, res){
	var UserId = (req.body.UserId)?req.body.UserId:false;
	user.FirstName = userAccount.FirstName;
    userAccount.LastName = userAccount.LastName;
    user.Gender = userAccount.Gender;
    user.DOB = userAccount.DOB;   
    user.Address = userAccount.Address;
    user.Town = userAccount.Town;
    user.PostCode = userAccount.PostCode;
    user.Profile = userAccount.Profile;
}*/
exports.updateUserProfile = function (req, res) {
	console.log("updateUserProfile");
	if (req.body.UserImage) {
		var min = 100000;
		var max = 999999;
		var name = Math.floor(Math.random() * (max - min + 1)) + min + ".png";
		var filename = config.image_path + name;
		var path = "Upload/User/" + name;
		fs.writeFile(filename, new Buffer(req.body.UserImage, "base64"), function (err) {
			console.log(err);
			console.log(filename);
		});

		req.body.UserImage = path;
	}

	return orm.bookshelf.transaction(function (trx) {
			return UserAccountServices.GetUserAccount(req.body.UserId, trx)
				.then(function (user) {
					if (user)
						return UserAccountServices.UpdateUserAccount(req.body, trx);
					else
						return false;
				})
				.catch(function (err) {
					console.log(err);
				});
		})
		.then(function (results) {
			if (!results)
				res.json({
					"StatusCode": 417,
					"ResponseMessage": "Object reference not set to an instance of an object."
				});
			else
				res.json({
					"StatusCode": 200,
					"ResponseMessage": "Updated Successfully!!!"
				});
		})
		.catch(function (err) {
			res.json({
				"StatusCode": err.status,
				"Favourites": [],
				"ResponseMessage": err.messages
			});
		});
}

exports.GetUsersImageById = function (req, res) {
	console.log("GetUsersImageById");
	var UserId = (req.query.Id) ? req.query.Id : false;
	if (UserId) {
		UserAccountServices.GetUsersImageById(UserId).then(function (result) {
			if (!result.length) {
				return [];
			} else {
				return Promise.map(result.models, function (user) {
					user.set("UserImage", config.image_url + user.get("UserImage"));
					return user;
				})

			}
		}).then(function (fresult) {
			console.log(fresult);
			if (fresult.length) {
				res.json({
					"StatusCode": 200,
					"lstUser": fresult,
					"ResponseMessage": "Wow!! you are so passionate about your UserImageRepository"
				});
			} else {
				res.json({
					"Message": "An error has occurred."
				});
			}

		}).catch(function (err) {
			res.json({
				"StatusCode": err.status,
				"lstUser": [],
				"ResponseMessage": err.messages
			});
		});
	} else {
		res.json({
			"Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Users/GetUsersImageById'."
		});
	}
}

exports.ChangePassword = function (req, res) {
	console.log("ChangePassword");
	console.log(req.body);
	var data1 = {
		"oldPassword": (req.body.oldPassword) ? req.body.oldPassword : false,
		"Newpassword": (req.body.Newpassword) ? req.body.Newpassword : false,
		"UserId": (req.body.UserId) ? req.body.UserId : false,
	}
	if (!data1.UserId || !data1.oldPassword || !data1.Newpassword) {
		/*return UserAccountServices.ChangePassword(data).then(function(result){
			if(result)
				res.json({"StatusCode": 200,"ResponseMessage": "Updated Successfully!!!"});
			else
				res.json({"StatusCode": 417,"ResponseMessage": "Object reference not set to an instance of an object."});
		}).catch(function(){
			res.json({"StatusCode":err.status,"Favourites":[],"ResponseMessage":err.messages});
		})*/

		res.json({
			"StatusCode": 417,
			"ResponseMessage": "Object reference not set to an instance of an object."
		});




	} else {
		return UserAccountServices.GetUserAccount(data1.UserId).then(function (result) {
			if (!result) {
				res.json({
					"Message": "An error has occurred."
				});
			} else {
				password = helperServices.encryption(data1.oldPassword, result.get('EmailId'));
				if (password == result.get('Password')) {
					newpassword = helperServices.encryption(data1.Newpassword, result.get('EmailId'));
					var data = {};
					data.Password = newpassword;
					data.oldpassword = password;
					data.Newpassword = newpassword;
					data.UserId = data1.UserId;
					return UserAccountServices.UpdateUserAccount(data).then(function (result) {

						if (result) {
							res.json({
								"StatusCode": 200,
								"ResponseMessage": "Updated Successfully!!!"
							});
						} else {
							res.json({
								"StatusCode": 417,
								"ResponseMessage": "Object reference not set to an instance of an object."
							});
						}
					}).catch(function () {
						res.json({
							"StatusCode": err.status,
							"Favourites": [],
							"ResponseMessage": err.messages
						});
					})
				} else {
					res.json({
						"StatusCode": 401,
						"userAccount": {
							"UserId": 149,
							"UserImage": null,
							"FirstName": null,
							"LastName": null,
							"Password": null,
							"ConfirmPassword": null,
							"EmailId": null,
							"ConfirmEmail": null,
							"Gender": null,
							"Address": null,
							"Town": null,
							"City": null,
							"PostCode": 0,
							"Profile": null,
							"TagLine": null,
							"DOB": null,
							"Role": null,
							"IsActive": null,
							"CreateDate": null,
							"ModifyDate": null,
							"oldpassword": "12345688888",
							"Newpassword": "1234567",
							"Fullname": null
						},
						"ResponseMessage": "Invalid Password"
					});
				}
			}
		}).catch(function (err) {
			res.json({
				"StatusCode": err.status,
				"ResponseMessage": err.messages
			});
		});






	}
}