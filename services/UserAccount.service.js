var UserAccount = require('../models/UserAccount.model'),
    moment = require('moment');
    
exports.registerUser = function(params) {
    var User = new UserAccount({
                FirstName: (params.FirstName)?params.FirstName:null, 
                LastName: (params.LastName)?params.LastName:null, 
                Password: (params.Password)?params.Password:null,
                ConfirmPassword: (params.ConfirmPassword)?params.ConfirmPassword:null,
                EmailId: (params.EmailId)?params.EmailId:null,
                // ConfirmEmail:(params.EmailId)?params.EmailId:null,
                Role: (params.Role)?params.Role:null,
                UserImage: 'upload/user/UserDefault.png',
                ConfirmEmail: (params.ConfirmEmail)?params.ConfirmEmail:null,
                Gender: (params.Gender)?params.Gender:null,
                Address: (params.Address)?params.Address:null,
                Town: (params.Town)?params.Town:null,
                City: (params.City)?params.City:null,
                PostCode: (params.PostCode)?params.PostCode:0,
                Profile: (params.Profile)?params.Profile:null,
                TagLine: (params.TagLine)?params.TagLine:null,
                DOB: (params.DOB)?params.DOB:null,
                IsActive: (params.IsActive)?params.IsActive:null,
                CreateDate: (params.CreateDate)?params.CreateDate:new Date(),
                ModifyDate: (params.ModifyDate)?params.ModifyDate:new Date(),
                // oldpassword:(params.oldpassword)?params.oldpassword:null,
                // Newpassword:(params.Newpassword)?params.Newpassword:null,
                // Fullname:(params.Fullname)?params.Fullname:null,
                // Added for Pro version
                RegistrationNumber:(params.RegistrationNumber)?params.RegistrationNumber:null,
                Profession:(params.Profession)?params.Profession:null
              });
    return User.save(null).tap(function (model){
      userData = model;
      return userData;
    }).then(function(userData){
      return userData;
    }).catch(function(err){
      return err;
    });
 };
//check a user is existed or not
exports.getUserByEmail = function(email){
  return UserAccount.forge().query(function (qb) {
      qb.where({'EmailId' : email});
  }).fetch().then(function(User) {
      if(User)
        return User.get('UserId');
      else
        return 0;
  });
}
//get list of all users
exports.getAllUsers = function(){
  var fetchParams = {};
  return UserAccount.forge().fetchAll(fetchParams);
}

//get user detail using userId
exports.GetUserAccount = function(UserId){
  var fetchParams = {};
  return UserAccount.forge().query(function(qb){
    if(UserId)
      qb.where({'UserId':UserId});
  }).fetch(fetchParams);
}
//get user image using userId
exports.GetUsersImageById = function(UserId){
  var fetchParams = {};
  return UserAccount.forge().query(function(qb){
    if(UserId)
      qb.where({'UserId':UserId});
  }).fetchAll(fetchParams);
}
//update user
exports.UpdateUserAccount = function(params,transaction){
  console.log("UpdateUserAccount");
  var UserId = (params.UserId)?params.UserId:false;
  var authUpdateParams = {
    patch:true
  };
  var authFetchParams = {};

  if (transaction) {
    authUpdateParams.transacting = transaction;
    authFetchParams.transacting = transaction;
  }
 /* if(params.Fullname || params.Fullname=='' || params.Fullname==null)
    params.remove('Fullname');*/
  //console.log(params);
  var data = { 
  
  "FirstName": params.FirstName,
  "LastName": params.LastName,
  "Gender": params.Gender,
  "Address": params.Address,
  "Town": params.Town,
  "PostCode": params.PostCode,
  "Profile": params.Profile,
  "DOB": params.DOB };
  if(params.UserImage)
  data.UserImage = params.UserImage;

  if(params.DOB)
    data.DOB =moment(params.DOB).format('YYYY-MM-DD HH:mm:ss');

  console.log(data);
  return UserAccount.forge().query(function(qb){
      if(UserId)
      qb.where({'UserId':UserId});
  }).fetch().then(function(fUser) {
      return fUser.save(data, authUpdateParams);
  });
}
