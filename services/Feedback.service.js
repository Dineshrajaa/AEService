var Feedback = require('../models/Feedback.model'),
  UserAccount = require('../models/UserAccount.model'),
  moment = require('moment');

exports.postFeedBack = function (params) {
  var FeedbackData = new Feedback({
    "UserId": params.UserId,
    "FeedBackCategory": params.FeedBackCategory,
    "message": params.message
  });
  return FeedbackData.save(null).tap(function (model) {
    FeedbackDatav = model;
    return FeedbackDatav;
  }).then(function (FeedbackDatav) {
    return FeedbackDatav;
  }).catch(function (err) {
    return err;
  });
}

exports.uploadFeedBackImage = function (data, FeedbackId) {

  console.log(data);
  console.log(FeedbackId);
  var authUpdateParams = {
    patch: true
  };
  var authFetchParams = {};
  return Feedback.forge().query(function (qb) {
    if (FeedbackId)
      qb.where({ 'FeedbackId': FeedbackId });
  }).fetch().then(function (Feedbacks) {
    return Feedbacks.save(data, authUpdateParams);
  });
}
