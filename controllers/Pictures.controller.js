var config = require('../config');

exports.GetPicture = function (req, res) {
    var filePath = req.params.parentfolder + '/' + req.params.folder + '/' + req.params.filename;
    res.sendFile(config.image_path_global + '/' + filePath);
}

