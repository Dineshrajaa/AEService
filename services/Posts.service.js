var config = require('../config'),
    Posts = require('../models/Posts.model'),
    helperServices = require('../services/helper.service'),
    Promise = require("bluebird");


exports.GetAllPosts = function (OrgId) {
    console.log("OrgId:", OrgId);

    return Posts.forge().query(function (qb) {
        if (OrgId)
            qb.where({
                'OrgId': OrgId
            });
    }).fetchAll().then(function (result) {
        return result;
    }).catch(function (err) {
        res.json({
            "StatusCode": err.status,
            "data": [],
            "ResponseMessage": err.messages
        });
    })
};

exports.AddPost = function (params) {
    console.log("AddPost");
    var Posts = new Posts({
        OrgId: (params.OrgId) ? params.OrgId : null,
        PostMessage: (params.PostMessage) ? params.PostMessage : null,
        PostTime: (params.PostTime) ? params.PostTime : null,
        CreateDate: (params.CreateDate) ? params.CreateDate : new Date(),
        PostImage: (params.PostImage) ? params.PostImage : null
    });
    return Posts.save(null).tap(function (model) {
        postData = model;
        console.log('model:', model);
        return postData;
    }).then(function (postData) {
        console.log('postData:', postData);
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
    return Posts.forge().query(function (qb) {
        if (PostId)
            qb.where({ 'PostId': PostId });
    }).fetch().then(function (Posts) {
        return Posts.save(data, authUpdateParams);
    });
}