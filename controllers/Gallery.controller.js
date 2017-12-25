var config = require('../config'),
	Gallery = require('../models/Gallery.model'),
	GalleryServices = require('../services/Gallery.service'),
	Promise = require("bluebird"),
	fs = require("fs"),
	helperServices = require('../services/helper.service');
/*get gellary for an organization*/
exports.GetGalleryById = function (req, res) {
	console.log("GetGalleryById");
	console.log("req.query.Id");
	console.log(req.query.Id);
	var OrgId = (req.query.Id) ? req.query.Id : false;
	if (OrgId) {
		return GalleryServices.GetGallery(req.query, false).then(function (result) {
			console.log(result.length);
			if (result.length) {
				return Promise.map(result.models, function (gallery) {
					url = gallery.get('Photos');
					gallery.set('Photos', url.trim());
					return gallery;
				})
			} else {
				return [];
			}

		}).then(function (fresult) {
			if (fresult.length)
				res.json({ "StatusCode": 200, "lstgallery": fresult, "ResponseMessage": "Wow!! you are so passionate about your GalleryRepository" });
			else
				res.json({ "StatusCode": 200, "lstgallery": fresult, "ResponseMessage": "No gallery available" });
		}).catch(function (err) {
			res.json({ "StatusCode": err.status, "lstCategories": [], "ResponseMessage": err.messages });
		});
	} else {
		res.json({ "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Gallery/GetGalleryById'." });
	}

}

exports.addPhotoToGallery = function (req, res) {
	/**
	 * Method to Add photos to gallery
	 */
	if (req.body.picture) {
		var min = 100000;
		var max = 999999;
		var name = Math.floor(Math.random() * (max - min + 1)) + min + ".png";
		var filename = config.image_path_global + '/Upload/Gallery/' + name;
		var path = "Upload/Gallery/" + name;
		req.body.picpath = path;
		fs.writeFile(filename, new Buffer(req.body.picture, "base64"), function (err) {
			if (!err) {
				GalleryServices.savePicture(req.body).then(function (picture) {
					if (picture) {
						res.json({ "StatusCode": 200, "data": picture, "ResponseMessage": "Uploaded Picture Successfully!" });
					}
				})
			}
		});
	} else {
		res.json({ 'Message': 'No Picture Attached' });
	}
}

exports.deletePhotoFromGallery = function (req, res) {
	console.log("Delete Photo");
	console.log("req.params.PhotoId:", req.params.GalleryId);
	var GalleryId = (req.params.GalleryId) ? req.params.GalleryId : false;
	if (GalleryId) {
		GalleryServices.DeletePhoto(GalleryId).then(function (result) {
			if (result)
				res.json({ "StatusCode": 200, "ResponseMessage": "Deleted Photo Successfully" });
			else
				res.json({ "Message": "An error has occurred." });
		}).catch(function (err) {
			res.json({ "StatusCode": err.status, "deletetreatment": [], "ResponseMessage": err.messages });
		});

	} else {
		res.json({ "Message": "No HTTP resource was found that matches the request URI '" + config.webUri + "/Aesthetic/api/Categories/Delete'." });
	}
};