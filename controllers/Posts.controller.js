var config = require('../config'),
    Posts = require('../models/Posts.model'),
    PostsServices = require('../services/Posts.service'),
    helperServices = require('../services/helper.service');

exports.GetAllPosts = function (req, res) {
    console.log("GetAllPosts");
    var postReqPara = {
        'OrgId': req.params.OrgId,
        'page': req.params.pagenumber,
        'pageSize': req.params.limit
    }

    PostsServices.GetAllPosts(postReqPara).then(function (Posts) {
        if (Posts.length) {
            var paginationData = Posts[Posts.length - 1];
            Posts.pop();
            res.json({ "data": Posts, paginationData });
        } else {
            res.json({
                "Message": "An error has occurred."
            });
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


/* exports.DeleteNote = function (req, res) {
    console.log("Delete Note");
    console.log("req.params.NoteId:", req.params.NoteId);
    var NoteId = (req.params.NoteId) ? req.params.NoteId : false;
    if (NoteId) {
        NotesServices.DeleteNote(NoteId).then(function (result) {
            if (result)
                res.json({ "StatusCode": 200, "ResponseMessage": "Deleted Note Successfully" });
            else
                res.json({ "Message": "An error has occurred." });
        }).catch(function (err) {
            res.json({ "StatusCode": err.status, "deletenotes": [], "ResponseMessage": err.messages });
        });

    } else {
        res.json({ "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Categories/Delete'." });
    }
}; */