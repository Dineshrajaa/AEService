var config = require('../config'),
    Notes = require('../models/Notes.model'),
    NotesServices = require('../services/Notes.service')

exports.GetAllNotes = function (req, res) {
    console.log("GetAllNotes");
    var ClientId = req.params.ClientId;
    NotesServices.GetAllNotes(ClientId).then(function (Notes) {
        if (Notes.length) {
            res.json(Notes);
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