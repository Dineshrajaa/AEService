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