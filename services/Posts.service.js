var config = require('../config'),
    PostGet = require('../models/Posts.model'),
    UserAccount = require('../models/UserAccount.model'),
    Comment = require('../models/Comment.model'),
    helperServices = require('../services/helper.service'),
    Promise = require("bluebird");


exports.GetAllPosts = function (postReqData) {

    var OrgId = postReqData.OrgId;
    console.log("OrgId:", OrgId);
    var paginationSettings = {
        'pageSize': postReqData.pageSize || 10,
        'page': postReqData.page
    };
    return PostGet.forge().query(function (qb) {
        qb.select('UserAccount.FirstName', 'UserAccount.LastName', 'UserAccount.UserImage',
            'PostGet.PostId', 'PostGet.PostMessage', 'PostGet.PostTime', 'PostGet.PostImage', 'PostGet.CreateDate', 'PostGet.ModifyDate',
            'Organization.OrgName', 'Organization.OrgImage', 'Organization.OrgAddress'
        )
        qb.join('UserAccount', function () {
            this.on('PostGet.OrgId', '=', 'UserAccount.OrgId')
        })

        qb.join('Organization',function(){
            this.on('PostGet.OrgId','=','Organization.OrgId')
        })

        if (OrgId != 'false') {
            console.log("OrgId is:", OrgId);
            qb.where('PostGet.OrgId', OrgId);
        }
    }).fetchPage(paginationSettings)
        .then(function (result) {
            if (result.length) {
                var formattedPosts = Promise.map(result.models, function (Fav) {
                    return Comment.forge().query(function (qb) {
                        qb.count('CommentId as totalcomments');
                        qb.where('PostId', Fav.get('PostId'))
                    }).fetch().then(function (CountOfComment) {
                        var DisplayTime = helperServices.getDisplayTime(Fav.get('PostTime'));
                        Fav.set("DisplayTime", DisplayTime);
                        Fav.set('CountOfComment', CountOfComment.get('totalcomments'));
                        return Fav;
                    }).catch(function (err) {
                        console.log("error in comment");
                        console.log(err);
                    });
                })

                formattedPosts.then(function (data) {
                    var paginationObj = result.pagination;
                    data.push(paginationObj);
                });
                return formattedPosts;
            } else {
                return [];
            }
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