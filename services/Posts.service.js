var config = require('../config'),
    PostGet = require('../models/Posts.model'),
    UserAccount = require('../models/UserAccount.model'),
    Comment = require('../models/Comment.model'),
    helperServices = require('../services/helper.service'),
    Promise = require("bluebird");


exports.GetAllPosts = function (OrgId) {
    console.log("OrgId:", OrgId);

    return PostGet.forge().query(function (qb) {
        qb.select('UserAccount.FirstName', 'UserAccount.LastName', 'UserAccount.UserImage',
            'PostGet.PostId', 'PostGet.PostMessage', 'PostGet.PostTime', 'PostGet.PostImage', 'PostGet.CreateDate', 'PostGet.ModifyDate',
        )
        qb.join('UserAccount', function () {
            this.on('PostGet.OrgId', '=', 'UserAccount.OrgId')
        })
        qb.count('Comment.CommentId as CommentCount')
        qb.join('Comment',function(){
            this.on('Comment.PostId','=','PostGet.PostId')
        })
        qb.orderBy("CommentCount", "desc");
        if (OrgId) {
            qb.where('PostGet.OrgId', OrgId);
        }
    }).fetchAll().then(function (result) {
        return result;
    }).catch(function (err) {
        console.warn('err1:', err);
        /* res.json({
            "StatusCode": err.status,
            "data": [],
            "ResponseMessage": err.messages
        }); */
    })
};

exports.AddPost = function (params) {
    console.log("AddPost");
    var Post = new PostGet({
        OrgId: (params.OrgId) ? params.OrgId : null,
        PostMessage: (params.PostMessage) ? params.PostMessage : null,
        PostTime: (params.PostTime) ? params.PostTime : null,
        CreateDate: (params.CreateDate) ? params.CreateDate : new Date(),
        // PostImage: (params.PostImage) ? params.PostImage : null
    });
    return Post.save(null).tap(function (model) {
        postData = model;
        return postData;
    }).then(function (postData) {
        return postData;
    }).catch(function (err) {
        console.log(err);
    });
};


exports.DeleteNote = function (NoteId) {
    return Notes.forge().query(function (qb) {
        qb.where({
            'NoteId': NoteId
        });
        qb.del();
    }).fetch().then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

exports.uploadImage = function (data, PostId) {

    console.log(data);
    console.log(PostId);
    var authUpdateParams = {
        patch: true
    };
    var authFetchParams = {};
    return PostGet.forge().query(function (qb) {
        if (PostId)
            qb.where({ 'PostId': PostId });
    }).fetch().then(function (PostGet) {
        return PostGet.save(data, authUpdateParams);
    });
}