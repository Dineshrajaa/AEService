var UserAccount = require('../models/UserAccount.model'),
  Organization = require('../models/Organization.model'),
  moment = require('moment');

exports.registerUser = function (params) {
  var User = new UserAccount({
    FirstName: (params.FirstName) ? params.FirstName : null,
    LastName: (params.LastName) ? params.LastName : null,
    Password: (params.Password) ? params.Password : null,
    ConfirmPassword: (params.ConfirmPassword) ? params.ConfirmPassword : null,
    EmailId: (params.EmailId) ? params.EmailId : null,
    // ConfirmEmail:(params.EmailId)?params.EmailId:null,
    Role: (params.Role) ? params.Role : null,
    UserImage: 'Upload/user/UserDefault.png',
    ConfirmEmail: (params.ConfirmEmail) ? params.ConfirmEmail : null,
    Gender: (params.Gender) ? params.Gender : null,
    Address: (params.Address) ? params.Address : null,
    Town: (params.Town) ? params.Town : null,
    City: (params.City) ? params.City : null,
    PostCode: (params.PostCode) ? params.PostCode : 0,
    Profile: (params.Profile) ? params.Profile : null,
    TagLine: (params.TagLine) ? params.TagLine : null,
    DOB: (params.DOB) ? params.DOB : null,
    IsActive: (params.IsActive) ? params.IsActive : null,
    CreateDate: (params.CreateDate) ? params.CreateDate : new Date(),
    ModifyDate: (params.ModifyDate) ? params.ModifyDate : new Date(),
    // oldpassword:(params.oldpassword)?params.oldpassword:null,
    // Newpassword:(params.Newpassword)?params.Newpassword:null,
    // Fullname:(params.Fullname)?params.Fullname:null,
    // Added for Pro version
    OrgId: (params.OrgId) ? params.OrgId : null
  });
  return User.save(null).tap(function (model) {
    userData = model;
    return userData;
  }).then(function (userData) {
    return userData;
  }).catch(function (err) {
    return err;
  });
};
// register organization
exports.registerOrganization = function (params) {
  var organization = new Organization({
    RegistrationNo: params.RegistrationNo,
    Profession: params.Profession,
    OrgName: (params.OrgName) ? params.OrgName : null,
    OrgImage: (params.OrgImage) ? params.OrgImage : null,
    OrgAddress: (params.OrgAddress) ? params.OrgAddress : null,
    OrgTitle: (params.OrgTitle) ? params.OrgTitle : null,
    OrgPhone: (params.OrgPhone) ? params.OrgPhone : null,
    OrgDesc: (params.OrgDesc) ? params.OrgDesc : null,
    City: (params.City) ? params.City : null,
    Country: (params.Country) ? params.Country : null,
    Feedback: (params.Feedback) ? params.Feedback : null,
    Longitude: (params.Longitude) ? params.Longitude : null,
    Latitude: (params.Latitude) ? params.Latitude : null,
    OrgOwner: (params.OrgOwner) ? params.OrgOwner : null,
    OrgCoverImage: (params.OrgCoverImage) ? params.OrgCoverImage : null,
    CreateDate: (params.CreateDate) ? params.CreateDate : new Date(),
    ModifyDate: (params.ModifyDate) ? params.ModifyDate : new Date()
  });
  console.warn('organization:',organization);
  return organization.save(null).tap(function (model) {
    organizationData = model;
    return organizationData.get('OrgId');
  }).then(function (organizationData) {
    return organizationData.get('OrgId');
  }).catch(function (err) {
    return err;
  });
};

exports.saveBusinessInfo = function (params, transaction) {
  // Method to update organization info
  var OrgId = (params.OrgId) ? params.OrgId : false;
  var authUpdateParams = {
    patch: true
  };
  var authFetchParams = {};

  if (transaction) {
    authUpdateParams.transacting = transaction;
    authFetchParams.transacting = transaction;
  }

  var businessData = {
    "OrgName": (params.OrgName) ? params.OrgName : null,
    "Profession": (params.Profession) ? params.Profession : null,
    "RegistrationNo": (params.RegistrationNo) ? params.RegistrationNo : null,
    "OrgDesc": (params.OrgDesc) ? params.OrgDesc : null,
    "OrgOwner": (params.OrgOwner) ? params.OrgOwner : null,
    "OrgAddress": (params.OrgAddress) ? params.OrgAddress : null,
    "City": (params.City) ? params.City : null,
    "Country": (params.Country) ? params.Country : null,
    "PostCode": (params.PostCode) ? params.PostCode : null
  };

  return Organization.forge().query(function (qb) {
    if (OrgId)
      qb.where({
        'OrgId': OrgId
      });
  }).fetch().then(function (fOrganization) {
    return fOrganization.save(businessData, authUpdateParams);
  });
}

exports.UpdateBusinessInfoStatus = function (UserId, transaction) {
  // Method to change the Business info status
  var UserId = (UserId) ? UserId : false;
  var authUpdateParams = {
    patch: true
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
    "businessInfoFound": true
  };

  return UserAccount.forge().query(function (qb) {
    if (UserId)
      qb.where({
        'UserId': UserId
      });
  }).fetch().then(function (fUser) {
    return fUser.save(data, authUpdateParams);
  });
}
//check a user is existed or not
exports.getUserByEmail = function (email) {
  return UserAccount.forge().query(function (qb) {
    qb.where({
      'EmailId': email
    });
  }).fetch().then(function (User) {
    if (User) {
      return User;
    } else
      return 0;
  });
}
//get list of all users
exports.getAllUsers = function () {
  var fetchParams = {};
  return UserAccount.forge().fetchAll(fetchParams);
}

//get user detail using userId
exports.GetUserAccount = function (UserId) {
  var fetchParams = {};
  return UserAccount.forge().query(function (qb) {
    if (UserId)
      qb.where({
        'UserId': UserId
      });
  }).fetch(fetchParams);
}

//get user detail using userId
exports.GetOrganization = function (OrgId) {
  var fetchParams = {};
  return Organization.forge().query(function (qb) {
    if (OrgId)
      qb.where({
        'OrgId': OrgId
      });
  }).fetch(fetchParams);
}
//get user image using userId
exports.GetUsersImageById = function (UserId) {
  var fetchParams = {};
  return UserAccount.forge().query(function (qb) {
    if (UserId)
      qb.where({
        'UserId': UserId
      });
  }).fetchAll(fetchParams);
}
//update user
exports.UpdateUserAccount = function (params, transaction) {
  console.log("UpdateUserAccount service");
  var UserId = (params.UserId) ? params.UserId : false;
  var authUpdateParams = {
    patch: true
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
    "DOB": params.DOB
  };
  if (params.UserImage)
    data.UserImage = params.UserImage;

  if (params.DOB)
    data.DOB = moment(params.DOB).format('YYYY-MM-DD HH:mm:ss');

  console.log(data);
  return UserAccount.forge().query(function (qb) {
    if (UserId)
      qb.where({
        'UserId': UserId
      });
  }).fetch().then(function (fUser) {
    return fUser.save(data, authUpdateParams);
  });
}

exports.reRegisterUser = function (params) {
  // Method to register user with different role
  console.log('params:', params);
  var UserId = (params.UserId) ? params.UserId : false;
  var data = {
    "FirstName": (params.FirstName) ? params.FirstName : null,
    "LastName": (params.LastName) ? params.LastName : null,
    "Password": (params.Password) ? params.Password : null,
    "ConfirmPassword": (params.Password) ? params.Password : null,
    "Role": (params.Role) ? params.Role : null
  };
  var authUpdateParams = {
    patch: true
  };
  return UserAccount.forge().query(function (qb) {
    if (UserId)
      qb.where({
        'UserId': UserId
      });
  }).fetch().then(function (fUser) {
    return fUser.save(data, authUpdateParams);
  });
}

exports.resetUserPassword = function (params) {
  /* Method to reset user password */
  console.log('params:', params);
  var UserId = (params.UserId) ? params.UserId : false;
  var data = {
    "Password": (params.Password) ? params.Password : null,
    "ConfirmPassword": (params.Password) ? params.Password : null
  };
  var authUpdateParams = {
    patch: true
  };
  return UserAccount.forge().query(function (qb) {
    if (UserId)
      qb.where({
        'UserId': UserId
      });
  }).fetch().then(function (fUser) {
    return fUser.save(data, authUpdateParams);
  });
}