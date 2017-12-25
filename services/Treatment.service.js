var Treatment = require('../models/Treatment.model'),
    Categories = require('../models/Categories.model'),
    Item = require('../models/Item.model'),
    SubCategory = require('../models/SubCategory.model'),
    Organization = require('../models/Organization.model');

exports.treatmentGetByOrgId = function (params) {
    var fetchParams = {};
    var OrgId = (params.OrgId) ? params.OrgId : false;
    return Treatment.forge().query(function (qb) {
        if (OrgId)
            qb.where("OrgId", OrgId);
    }).fetchAll(fetchParams).then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
}

exports.AddTreatment = function (params) {
    console.log("AddTreatment");
    var Treatments = new Treatment({
        OrgId: (params.OrgId) ? params.OrgId : null,
        TreatmentName: (params.TreatmentName) ? params.TreatmentName : null,
        Desc: (params.Desc) ? params.Desc : null
    });
    return Treatments.save(null).tap(function (model) {
        treatmentData = model;
        return treatmentData;
    }).then(function (treatmentData) {
        return treatmentData;
    }).catch(function (err) {
        console.log(err);
    });
};

exports.DeleteTreatment = function (TreatmentId) {
    return Treatment.forge().query(function (qb) {
        qb.where({
            'TreatmentId': TreatmentId
        });
        qb.del();
    }).fetch().then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};

exports.UpdateTreatment = function (treatmentId, treatmentData) {
    var TreatmentInfo = {
        'Desc': treatmentData.Desc,
        'TreatmentName': treatmentData.TreatmentName,
        'OrgId': treatmentData.DOB
    };
    return new Treatment().where({ 'TreatmentId': treatmentId }).save(TreatmentInfo, {
        patch: true
    }).then(function (result) {
        return result;
    }).catch(function (err) {
        return err;
    });
};
