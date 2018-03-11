var config = require('../config'),
    Posts = require('../models/Posts.model'),
    PostsServices = require('../services/Posts.service'),
    helperServices = require('../services/helper.service');

exports.GetAllPosts = function (req, res) {
    console.log("GetAllPosts");
    var postReqPara = {
        'OrgId': req.params.OrgId,
        'page': req.params.pagenumber,
        'pageSize': req.params.limit,
        'input': req.params.input,
        'country': req.params.country,
        'timeZone': req.params.zone + '/' + req.params.subzone
    }

    PostsServices.GetAllPosts(postReqPara).then(function (Posts) {
        if (Posts.length) {
            var paginationData = Posts[Posts.length - 1];
            Posts.pop();
            res.json({ "StatusCode": 200, "data": Posts, paginationData });
        } else {
            res.json({ "StatusCode": 200, "data": [], "Message": "No Post Found." });
        }
    }).catch(function (err) {
        console.warn('err:', err);
        res.json({
            "StatusCode": err.status,
            "Posts": [],
            "ResponseMessage": err.messages
        });
    });
};


exports.AddPost = function (req, res) {
    console.log("addPost");
    if (req.body.OrgId == undefined) {
        res.json({
            "Message": "An error has occurred."
        });
    } else {
        var section = "post";
        var image = (req.body.PostImage) ? req.body.PostImage : false;
        PostsServices.AddPost(req.body).then(function (postSuccess) {
            if (postSuccess.get("PostId") !== null) {
                if (image) {
                    helperServices.base64toimage(image, postSuccess.get("PostId"), section);
                }
                res.json({
                    "StatusCode": 200,
                    "data": postSuccess,
                    "ResponseMessage": "Added Post successfully!"
                });
            } else {
                res.json({ "StatusCode": 404, "Message": "An error has occurred." });
            }
        }).catch(function (err) {
            res.json({
                "StatusCode": err.status,
                "data": [],
                "ResponseMessage": err.messages
            });
        });
    }
};

exports.updatePost = function (req, res) {
    // Method to update posts
    req.body.PostId = (req.params.PostId) ? req.params.PostId : false;
    var image = (req.body.PostImage) ? req.body.PostImage : false;
    if (req.body.PostId) {
        PostsServices.UpdatePost(req.body).then(function (result) {
            if (result) {
                if (image) {
                    helperServices.base64toimage(image, req.body.PostId, section);
                }
                res.json({
                    "StatusCode": 200,
                    "data": postSuccess,
                    "ResponseMessage": "Added Post successfully!"
                });
            }
            else
                res.json({
                    "Message": "An error has occurred."
                });
        }).catch(function (err) {
            res.json({
                "StatusCode": err.status,
                "clients": [],
                "ResponseMessage": err.messages
            });
        });

    } else {
        res.json({
            "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Categories/Delete'."
        });
    }
}

exports.deletePost = function (req, res) {
    console.log("Delete post");
    var PostId = (req.params.PostId) ? req.params.PostId : false;
    if (PostId) {
        PostsServices.DeletePost(PostId).then(function (result) {
            if (result)
                res.json({ "StatusCode": 200, "ResponseMessage": "Deleted Post Successfully" });
            else
                res.json({ "Message": "An error has occurred." });
        }).catch(function (err) {
            res.json({ "StatusCode": err.status, "deleteposts": [], "ResponseMessage": err.messages });
        });

    } else {
        res.json({ "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Categories/Delete'." });
    }
};