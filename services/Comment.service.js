var Comment = require('../models/Comment.model'),
    UserAccount = require('../models/UserAccount.model'),
    moment = require('moment');

exports.commentGetById = function(params){
    var fetchParams = {
      withRelated:["UserAccount","PostDetail"]
    }
    var  PostId = (params.id)?params.id:false;
    return Comment.forge().query(function(qb){
        qb.where("PostId",PostId);
    }).fetchAll(fetchParams).then(function(result){
        return result;
    })
}

exports.CreateComment =function(params){

    var PostId=(params.PostId)?params.PostId:false;
    var CommentData = new Comment({
        "PostId":(params.PostId)?params.PostId:false,
        "UserId":(params.UserId)?params.UserId:false,
        "CommentMsg":(params.CommentMsg)?params.CommentMsg:false,
        "CommentTime":moment().format('YYYY-MM-DD HH:mm:ss'),
        "CreateDate":moment().format('YYYY-MM-DD HH:mm:ss'),
        "ModifyDate":moment().format('YYYY-MM-DD HH:mm:ss'),
        "CommentImage":(params.CommentImage)?params.CommentImage:false,
    });
    return CommentData.save(null).tap(function (model){
      commentData = model;
      return commentData;
    }).then(function(commentData){
      return commentData;
    }).catch(function(err){
      return err;
    });
};

exports.updateComment = function(params){
    var CommentId = (params.CommentId)?params.CommentId:false;
    var UserId = (params.UserId)?params.UserId:false;
    var PostId = (params.PostId)?params.PostId:false;
    var data ={
        "CommentMsg":(params.CommentMsg)?params.CommentMsg:false,
        "ModifyDate":moment().format('YYYY-MM-DD HH:mm:ss')
    }
    
  var authUpdateParams = {
    patch:true
  };
  var authFetchParams = {};
  return Comment.forge().query(function(qb){
      if(CommentId)
      qb.where({'CommentId':CommentId});
        if(UserId)
       qb.andWhere({'UserId':UserId}); 
       if(PostId)
       qb.andWhere({'PostId':PostId});    
  }).fetch().then(function(comm) {
      return comm.save(data, authUpdateParams);
  });
};

exports.delete = function(CommentId){
    console.log("delete");
    console.log(CommentId);
    return Comment.forge().query(function(qb){
      qb.del();
        qb.where({'CommentId':CommentId});
    }).fetch().then(function(comm) {
        return comm;
    });
}

exports.uploadImage = function(data,CommentId){
    var authUpdateParams = {
    patch:true
  };
  var authFetchParams = {};
  return Comment.forge().query(function(qb){
      if(CommentId)
      qb.where({'CommentId':CommentId});    
  }).fetch().then(function(comm) {

      return comm.save(data, authUpdateParams);
  });
}