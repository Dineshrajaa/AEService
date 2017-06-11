var Review = require('../models/Review.model'),
Categories = require('../models/Categories.model'),
Item = require('../models/Item.model'),
SubCategory = require('../models/SubCategory.model'),
Organization = require('../models/Organization.model'),
ReviewComment = require('../models/ReviewComment.model'),
moment = require('moment');
 
exports.GetReviewByOrgId = function(params,action) {

 var fetchParams = {withRelated:['UserAccount','ReviewComment']};
 var OrgId =  (params.id)?params.id:false;
     return Review.forge().query(function(qb){
        if(OrgId)
            qb.where("OrgId",OrgId);
     }).fetchAll(fetchParams).then(function(result){
        return result;
     }).catch(function(err){
            return err;
     });
};

exports.GetReviewCommentById = function(params,action) {

 var fetchParams = {withRelated:['UserAccount']};
 var ReviewId =  (params.id)?params.id:false;
     return ReviewComment.forge().query(function(qb){
        if(ReviewId)
            qb.where("ReviewId",ReviewId);
     }).fetchAll(fetchParams).then(function(result){
        return result;
     }).catch(function(err){
            return err;
     });
};

exports.PostReview = function(params){
    var data = {
        "UserId":(params.UserId)?params.UserId:false,
        "OrgId":(params.OrgId)?params.OrgId:false,
        "ReviewComment":(params.ReviewComment)?params.ReviewComment:false,
        "ReviewTime":moment().format('YYYY-MM-DD HH:mm:ss'),
        "CreateDate":moment().format('YYYY-MM-DD HH:mm:ss'),
        "ModifyDate":moment().format('YYYY-MM-DD HH:mm:ss'),
    }
    var ReviewData = new Review(data);
    return ReviewData.save(null).tap(function (model){
      reviewData = model;
      return reviewData;
    }).then(function(reviewData){
      return reviewData;
    }).catch(function(err){
      return err;
    });
}

exports.CreateReviewComment = function(params){
    var data = {
        "ReviewId":(params.ReviewId)?params.ReviewId:false,
        "UserId":(params.UserId)?params.UserId:false,
        "ReviewCommentMsg":(params.ReviewCommentMsg)?params.ReviewCommentMsg:false,
        "ReviewCommentTime":moment().format('YYYY-MM-DD HH:mm:ss'),
        "ReviewCreateDate":moment().format('YYYY-MM-DD HH:mm:ss'),
        "ReviewModifyDate":moment().format('YYYY-MM-DD HH:mm:ss')
    }
    var ReviewCommentData = new ReviewComment(data);
    return ReviewCommentData.save(null).tap(function (model){
      reviewcommentData = model;
      return reviewcommentData;
    }).then(function(reviewcommentData){
      return reviewcommentData;
    }).catch(function(err){
      return err;
    });
}

exports.uploadImage = function(data,ReviewId){

  console.log(data);
  console.log(ReviewId);
    var authUpdateParams = {
    patch:true
  };
  var authFetchParams = {};
  return Review.forge().query(function(qb){
      if(ReviewId)
      qb.where({'ReviewId':ReviewId});    
  }).fetch().then(function(reviews) {
      return reviews.save(data, authUpdateParams);
  });
}

exports.uploadReviewCommentImage = function(data,ReviewCommentId){
    var authUpdateParams = {
    patch:true
  };
  var authFetchParams = {};
  return ReviewComment.forge().query(function(qb){
      if(ReviewCommentId)
      qb.where({'ReviewCommentId':ReviewCommentId});    
  }).fetch().then(function(reviewcomments) {
      return reviewcomments.save(data, authUpdateParams);
  });
}