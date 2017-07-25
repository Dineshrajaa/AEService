var config = require('../config'),
    Posts = require('../models/Posts.model'),
    PostsServices = require('../services/Posts.service')

exports.GetAllPosts = function (req, res) {
    console.log("GetAllPosts");
    var OrgId = req.params.OrgId;
    PostsServices.GetAllPosts(OrgId).then(function (Posts) {
        if (Posts.length) {
            res.json({ "data": Posts });
        } else {
            res.json({
                "Message": "An error has occurred."
            });
        }
    }).catch(function (err) {
        res.json({
            "StatusCode": err.status,
            "Posts": [],
            "ResponseMessage": err.messages
        });
    });
};


exports.AddPost = function (req, res) {
    console.log("addPost");
    console.log(req.body);
    if (req.body.OrgId == undefined) {
        res.json({
            "Message": "An error has occurred."
        });
    } else {
        PostsServices.AddPost(req.body).then(function (result) {
            res.json({
                "StatusCode": 200,
                "data": result,
                "ResponseMessage": "Added Post successfully!"
            });
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