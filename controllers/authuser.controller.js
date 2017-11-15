/**
 * authentication controller, for authentication user
 */
var config = require('../config'),
    UserAccount = require('../models/UserAccount.model'),
    //authService = require('../services/authusers.service'),
    Passport = require('passport');

//Authorise User
exports.authorizseUser = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).send({ "error": true, "status": "error", "message": "User is not authorized", "result": "User is not authorized" });
    }

    next();
}
//login
exports.login = function (req, res, next) {

    var AutherKey = (req.headers['auth-key']) ? req.headers['auth-key'] : false;
    if (AutherKey && AutherKey == config.Authorkey) {
        /*console.log(req.body);*/
        password = (req.body.Password) ? req.body.Password : false;
        /* console.log("password");
         console.log(password);*/
        if (typeof req.body.EmailId != 'undefined')
            req.body.EmailId = req.body.EmailId.toLowerCase();
        if (password)
            req.body.password = password;
        return Passport.authenticate('local',
            function (err, user, info) {
                if (err) {
                    return errors.returnError(err, res);
                }
                console.log(user);
                if (!user) {
                    if (info.error == true && info.statusCode == 201) {
                        return res.json({ "StatusCode": 404, "user": null, "ResponseMessage": "User doesn't exist." });
                    } else if (info.error == true && info.statusCode == 202) {
                        return res.json({ "StatusCode": 401, "user": { "UserId": 0, "UserImage": null, "FirstName": null, "LastName": null, "Password": "126", "ConfirmPassword": null, "EmailId": "s@s.com", "ConfirmEmail": null, "Gender": null, "Address": null, "Town": null, "City": null, "PostCode": 0, "Profile": null, "TagLine": null, "DOB": null, "Role": null, "IsActive": null, "CreateDate": null, "ModifyDate": null, "oldpassword": null, "Newpassword": null, "Fullname": null }, "ResponseMessage": "Invalid Password" });

                    }
                } else {
                    return req.logIn(user, function (err) {
                        console.log("login");
                        console.log(err);
                        /*if(err)
                        return res.json({"StatusCode": 404,"user":null,"ResponseMessage": err});
                        else*/
                        return res.json({ "StatusCode": 200, "user": user, "ResponseMessage": "Success" });
                    });
                }

            }
        )(req, res, next);
    } else {
        return res.send("Missing Authorization-Token");
    }

};

exports.logout = function (req, res) {
    var registrationId = (req.body.RegistrationId) ? req.body.RegistrationId : false;
    authService.logout(req.body.UserID, registrationId).then(function (model) {
        res.json({ "error": false, "status": "success", "message": "User logout successfully.", "result": "User logout successfully." });
    });

};
