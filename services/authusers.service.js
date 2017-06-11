var User = require('../models/user.model');
var BCrypt = require('bcrypt-nodejs');
var errorTypes = require('../errortypes');
var BPromise = require('bluebird');
var moment = require('moment');
var randomstring = require("randomstring");
var deviceService = require('../services/push-notification.service');
var organizationService = require('../services/orgenization.service');
exports.create = function(authReq, transaction) {
  var emailPromise = null;
  var authFetchParams = {};
  
  if (transaction) {
    authFetchParams.transacting = transaction;
  }

  emailPromise = new User({email: authReq.email}).fetch(authFetchParams);
    // return promise
  return emailPromise.then(function(model) {
    if(model) {
      var err = new errorTypes.AlreadyExistsError('user with email already exists');
      throw err;
    }
  })
  .then(function() {
    // TODO: Validate Password is good enough
    //var hash = BCrypt.hashSync(authReq.password);
    //var signUpAuth = new AuthUser({email: authReq.email, password: hash, is_social: authReq.is_social});
      
    //return signUpAuth.save(null, authFetchParams);
  });
};

exports.updateLastLoginData = function(userId, ipAddress, dateLast,DeviceId,RegistrationId,DeviceType){
  var DeviceId = (DeviceId)?DeviceId:"";
  var RegistrationId = (RegistrationId)?RegistrationId:"";
  var DeviceType = (DeviceType)?DeviceType:"";
  var authFetchParams = {};
  var refresh_token1= randomstring.generate(7);
  var refresh_token2 = randomstring.generate(7);
  var userParameters = {
    LastLoginDate : moment(dateLast).format('YYYY-MM-DD'),
    LastAccessIP : ipAddress,
    IsLoggedIn : 1,
    DeviceId : DeviceId,
    //RegistrationId : RegistrationId,
    DeviceType : DeviceType,
    loginSockte: 1,
    refresh_token : refresh_token1+userId+"_"+refresh_token2
  };

  var deviceParameters = {
    DeviceId : DeviceId,
    RegistrationId : RegistrationId,
    DeviceType : DeviceType
  }

  var authUpdateParams = {
    patch:true
  };

  var foundUser = User.forge({Id: userId});

  return foundUser
  .fetch(authFetchParams)
  .then(function(fUser) {
    if(RegistrationId){
        if(!fUser.get("RegistrationId")){
          userParameters.RegistrationId ='{"registrationIds":["'+RegistrationId+'"]}';
        }else{
          var parsedObj =JSON.parse(fUser.get("RegistrationId"));
          console.log(parsedObj.registrationIds);
          if (parsedObj.registrationIds.indexOf(RegistrationId) == -1){
            parsedObj.registrationIds.push(RegistrationId);
          }
          
          console.log(parsedObj);
          userParameters.RegistrationId =JSON.stringify(parsedObj);
        }
    }
    var plateFormObject = JSON.parse(fUser.get('platformId'));
    plateFormObject.loggedInCount = plateFormObject.loggedInCount + 1;
    userParameters.platformId = JSON.stringify(plateFormObject);
    return fUser.save(userParameters, authUpdateParams).then(function(userObj){
      //organizationService.find()
          if(RegistrationId)
          return deviceService.registerDevice(deviceParameters,userObj);
          else
          return userObj;  
    });
  });
};

exports.logout = function(UserID,registrationId){
  
  var authFetchParams = {};
  var registrationId =registrationId;
  var authUpdateParams = {
    patch:true
  };

  var foundUser = User.forge({Id: UserID});
  return foundUser
  .fetch(authFetchParams)
  .then(function(fUser) {
    var plateFormObject = JSON.parse(fUser.get('platformId'));
              var connectioncount = 0;
              connectioncount += plateFormObject.Web.length;
              connectioncount += plateFormObject.Android.length;
              connectioncount += plateFormObject.IOS.length;
              if(plateFormObject.loggedInCount >0)
              plateFormObject.loggedInCount = plateFormObject.loggedInCount - 1;
   
    console.log(connectioncount);
    console.log(plateFormObject.loggedInCount);
    if(connectioncount == 0 && plateFormObject.loggedInCount == 0){
        var userParameters = {
          IsLoggedIn : 0,
          isSocket: 0,
          loginSockte: 0
        };
        if(registrationId){
          console.log(1)
            console.log(registrationId);
            if(fUser.get("RegistrationId")){
                var parsedObj =JSON.parse(fUser.get("RegistrationId"));
                console.log(parsedObj.registrationIds);
                if (parsedObj.registrationIds.indexOf(registrationId)!=-1){
                  parsedObj.registrationIds.splice(parsedObj.registrationIds.indexOf(registrationId), 1);
                }
                userParameters.RegistrationId =JSON.stringify(parsedObj);
            }
        } 

        userParameters.platformId = JSON.stringify(plateFormObject);
        return fUser.save(userParameters, authUpdateParams);
    } else if(connectioncount == 0 && plateFormObject.loggedInCount > 0){
        var userParameters = {
          IsLoggedIn : 1,
          isSocket: 0,
          loginSockte: 0
        };
        if(registrationId){
          console.log(2);
            console.log(registrationId);
          /*var parsedObj =JSON.parse(fUser.get("RegistrationId"));
          console.log(parsedObj.registrationIds);
          if (parsedObj.registrationIds.indexOf(registrationId)!=-1){
             parsedObj.registrationIds.splice(parsedObj.registrationIds.indexOf(registrationId), 1);
          }
          userParameters.RegistrationId =JSON.stringify(parsedObj);*/
            if(fUser.get("RegistrationId")){
                var parsedObj =JSON.parse(fUser.get("RegistrationId"));
                console.log(parsedObj.registrationIds);
                if (parsedObj.registrationIds.indexOf(registrationId)!=-1){
                  parsedObj.registrationIds.splice(parsedObj.registrationIds.indexOf(registrationId), 1);
                }
                userParameters.RegistrationId =JSON.stringify(parsedObj);
            }
        } 
        userParameters.platformId = JSON.stringify(plateFormObject);
        return fUser.save(userParameters, authUpdateParams);
    } else if(connectioncount != 0 && plateFormObject.loggedInCount == 0){
        var userParameters = {
          IsLoggedIn : 0,
          isSocket: 0,
          loginSockte: 0
        };
        if(registrationId){
console.log(3);
            console.log(registrationId);
             if(fUser.get("RegistrationId")){
                var parsedObj =JSON.parse(fUser.get("RegistrationId"));
                console.log(parsedObj.registrationIds);
                if (parsedObj.registrationIds.indexOf(registrationId)!=-1){
                  parsedObj.registrationIds.splice(parsedObj.registrationIds.indexOf(registrationId), 1);
                }
                userParameters.RegistrationId =JSON.stringify(parsedObj);
              }
        }
        userParameters.platformId ='{"Web":[],"Android":[],"IOS":[],"loggedInCount":0}';
        return fUser.save(userParameters, authUpdateParams);
    } else {
      console.log("On LogOut");
      var userParameters = {
          IsLoggedIn : 1,
          isSocket: 1,
          loginSockte: 0
        };
        if(registrationId){
          console.log(4);
            console.log(registrationId);
             if(fUser.get("RegistrationId")){
                var parsedObj =JSON.parse(fUser.get("RegistrationId"));
                //console.log(parsedObj.registrationIds);
                if (parsedObj.registrationIds.indexOf(registrationId)!=-1){
                  console.log("removing registratio id");
                  parsedObj.registrationIds.splice(parsedObj.registrationIds.indexOf(registrationId), 1);
                }
                userParameters.RegistrationId =JSON.stringify(parsedObj);
              }
        }
        userParameters.platformId = JSON.stringify(plateFormObject);
        //console.log(userParameters);
        return fUser.save(userParameters, authUpdateParams);
    }
    
    //return 
  });
};

exports.checkSecureToken = function(token, email, transaction) {
  return new User({resetpasswordtoken: token}).query(function(qb) {
      qb.where('Email',email);
      qb.limit(1);
    }).fetch().then(function(user){
    if(!user)
      throw new errorTypes.UnauthorisedError('Invalid Token or User');

    if(user.get('resetpasswordexpirationdate') < moment().format("YYYY-MM-DD HH:mm:ss"))
      throw new errorTypes.UnauthorisedError('Token Expired');

    return 11;
  });
};

exports.resetPassword = function(newPassword, email, UserID, transaction){
  return BPromise.try(function() {
    if (!newPassword) throw new errorTypes.UnauthorisedError('Password Cannot Be Blank');

    var authUpdateOptions = { patch: true };
    if (transaction) authUpdateOptions.transacting = transaction;

    return new User({Id:UserID}).save({
      Password: BCrypt.hashSync(newPassword),
      resetpasswordtoken: null,
      resetpasswordexpirationdate: null
    }, authUpdateOptions);
  });
};
