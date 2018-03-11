var config = require('../config'),
    PostGet = require('../models/Posts.model'),
    UserAccount = require('../models/UserAccount.model'),
    Comment = require('../models/Comment.model'),
    helperServices = require('../services/helper.service'),
    Promise = require("bluebird"),
    moment = require('moment-timezone');


exports.GetAllPosts = function (postReqData) {

    var OrgId = postReqData.OrgId;
    var input = postReqData.input;
    var country = postReqData.country;
    console.log("OrgId:", OrgId);
    var paginationSettings = {
        'pageSize': postReqData.pageSize || 10,
        'page': postReqData.page
    };
    var timeZoneToChange = postReqData.timeZone;
    return PostGet.forge().orderBy("PostTime", "DESC").query(function (qb) {
        qb.select('UserAccount.FirstName', 'UserAccount.LastName', 'UserAccount.UserImage',
            'PostGet.PostId', 'PostGet.PostMessage', 'PostGet.PostTime', 'PostGet.PostImage', 'PostGet.CreateDate', 'PostGet.ModifyDate',
            'Organization.OrgName', 'Organization.OrgImage', 'Organization.OrgAddress', 'Organization.OrgId'
        )
        qb.join('UserAccount', function () {
            this.on('PostGet.OrgId', '=', 'UserAccount.OrgId')
        })

        qb.join('Organization', function () {
            this.on('PostGet.OrgId', '=', 'Organization.OrgId')
        })
        if (input != 'false') {
            qb.where(function () {
                this.where('Organization.OrgName', 'LIKE', "%" + input + "%").orWhere('PostGet.PostMessage', 'LIKE', "%" + input + "%")
            });
        }

        if (country != 'false') {
            qb.where(function () {
                this.where('Organization.Country', 'like', "%" + country + "%")
            });
        }

        if (OrgId != 'false') {
            console.log("OrgId is:", OrgId);
            qb.where('PostGet.OrgId', OrgId);
        }
        // qb.orderBy("CreateDate", 'DESC');


    }).fetchPage(paginationSettings)
        .then(function (result) {
            if (result.length) {
                var formattedPosts = Promise.map(result.models, function (Fav) {
                    return Comment.forge().query(function (qb) {
                        qb.count('CommentId as totalcomments');
                        qb.where('PostId', Fav.get('PostId'))
                    }).fetch().then(function (CountOfComment) {
                        var convertedTime = moment(Fav.get('PostTime')).tz(timeZoneToChange).format();
                        var DisplayTime = helperServices.getDisplayTime(convertedTime);
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
exports.UpdatePost = function (PostData) {
    var PostId = PostData.PostId;
    PostData.ModifyDate = (PostData.ModifyDate) ?
        moment(PostData.ModifyDate).tz(config.server.timeZone).format() : new Date();
    var PostInfo = {
        'PostMessage': PostData.PostMessage,
        'ModifyDate': PostData.ModifyDate
    };
    return new PostGet().where({ 'PostId': PostId }).save(PostInfo, {
        patch: true
    }).then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};
exports.DeletePost = function (PostId) {
    return PostGet.forge().query(function (qb) {
        qb.where({
            'PostId': PostId
        });
        qb.del();
    }).fetch().then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};
exports.AddPost = function (params) {
    console.log("AddPost");
    params.PostTime = moment(params.PostTime).tz(config.server.timeZone).format();
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