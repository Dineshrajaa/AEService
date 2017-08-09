var config = require('../config'),
    Notes = require('../models/Notes.model'),
    NotesServices = require('../services/Notes.service')

exports.GetAllNotes = function (req, res) {
    console.log("GetAllNotes");
    var ClientId = req.params.ClientId;
    NotesServices.GetAllNotes(ClientId).then(function (Notes) {
        if (Notes.length) {
            res.json({
                "StatusCode": 200,
                "data": Notes,
                "ResponseMessage": "Listed Client Successfully"
            });
        } else {
            res.json({
                "Message": "An error has occurred."
            });
        }
    }).catch(function (err) {
        res.json({
            "StatusCode": err.status,
            "Notes": [],
            "ResponseMessage": err.messages
        });
    });
};


exports.AddNote = function (req, res) {
    console.log("addNote");
    console.log(req.body);
    if (req.body.ClientId == undefined) {
        res.json({
            "Message": "An error has occurred."
        });
    } else {
        NotesServices.AddNote(req.body).then(function (result) {
            res.json({
                "StatusCode": 200,
                "note_": result,
                "ResponseMessage": "Added Note successfully!"
            });
        }).catch(function (err) {
            res.json({
                "StatusCode": err.status,
                "Notes": [],
                "ResponseMessage": err.messages
            });
        });
    }
};


exports.DeleteNote = function (req, res) {
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
};