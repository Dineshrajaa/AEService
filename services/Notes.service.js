var config = require('../config'),
    Notes = require('../models/Notes.model'),
    helperServices = require('../services/helper.service'),
    Promise = require("bluebird");


exports.GetAllNotes = function (ClientId) {
    console.log("ClientId:", ClientId);
    var fetchParams = {
        withRelated: ['Clients']
    };
    return Notes.forge().query(function (qb) {
        if (ClientId)
            qb.where({
                'ClientId': ClientId
            });
    }).fetchAll().then(function (result) {
        return result;
    }).catch(function (err) {
        res.json({
            "StatusCode": err.status,
            "lstNotes": [],
            "ResponseMessage": err.messages
        });
    })
};

exports.AddNote = function (params) {
    console.log("AddNote");
    var Note = new Notes({
        ClientId: (params.ClientId) ? params.ClientId : null,
        NoteDate: (params.NoteDate) ? params.NoteDate : null,
        NoteText: (params.NoteText) ? params.NoteText : null
    });
    return Note.save(null).tap(function (model) {
        noteData = model;
        return noteData;
    }).then(function (noteData) {
        return noteData;
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