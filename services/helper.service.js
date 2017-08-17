var config = require('../config'),
  crypto = require('crypto'),
  fs = require("fs"),
  CommentServices = require('../services/Comment.service'),
  ChatServices = require('../services/Chat.service'),
  ClientsServices = require('../services/Clients.service'),
  PostServices = require('../services/Posts.service'),
  ReviewServices = require('../services/Review.service'),
  distance = require('google-distance-matrix'),
  moment = require('moment');
exports.decrypt = function (text, Email) {
  var decipher = crypto.createDecipher('aes-256-cbc', Email);
  var dec = decipher.update(text, 'base64', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}
exports.encryption = function (text, Email) {
  /*	console.log(Email);
    console.log(text);*/
  var cipher = crypto.createCipher('aes-256-cbc', Email);
  var crypted = cipher.update(text, 'utf8', 'base64');
  crypted += cipher.final('base64');
  data = crypted;
  /* console.log(data);*/
  return data;
}
exports.getDisplayTime = function (PostTime) {
  var now = moment().format('YYYY-MM-DD HH:mm:ss');

  var now = moment(new Date()); //todays date
  var end = moment(PostTime); // another date
  var duration = moment.duration(now.diff(end));
  var days = duration.asDays();
  var Hours = duration.asHours();
  var Minutes = duration.asMinutes();
  var Seconds = duration.asSeconds();
  if (Math.round(days) > 365) {
    var years = (days / 365);
    if (days % 365 != 0)
      years += 1;
    if (years == 1)
      var displayTime = Math.round(years) + " year";
    else
      var displayTime = Math.round(years) + " years";

    return displayTime;
  }
  if (Math.round(days) > 30) {
    var months = (days / 30);
    if (days % 31 != 0)
      months += 1;
    if (months == 1)
      var displayTime = Math.round(months) + " month";
    else
      var displayTime = Math.round(months) + " months";
    return displayTime;
  }
  if (Math.round(days) > 0) {
    if (days == 1)
      var displayTime = Math.round(days) + " day";
    else
      var displayTime = Math.round(days) + " days";
    return displayTime;
  }
  if (Math.round(Hours) > 0) {
    if (Hours == 1)
      var displayTime = Math.round(Hours) + " Hour";
    else
      var displayTime = Math.round(Hours) + " Hours";
    return displayTime;
  }
  if (Math.round(Minutes) > 0) {
    if (Minutes == 1)
      var displayTime = Math.round(Minutes) + " Minute";
    else
      var displayTime = Math.round(Minutes) + " Minutes";
    return displayTime;
  }
  if (Math.round(Seconds) > 5) {
    if (Seconds == 1)
      var displayTime = Math.round(Seconds) + " Second";
    else
      var displayTime = Math.round(Seconds) + " Seconds";
    return displayTime;
  }
  if (Math.round(Seconds) <= 5) {
    var displayTime = "just now";
    return displayTime;
  }
}
function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}
exports.base64toimage = function (dataString, CommentId, section) {
  console.log("dataString");
  var min = 100000;
  var max = 999999;
  var name = Math.floor(Math.random() * (max - min + 1)) + min + ".png";
  var folder = '';
  if (section == "comment")
    folder = "Comment";
  if (section == "review")
    folder = "Review";
  if (section == "ReviewComment")
    folder = "Review";
  if (section == "chat")
    folder = "Chat"
  if (section == "post")
    folder = "Post"
  if (section == "client")
    folder = "Client"
  var filename = config.image_path_global + '/Upload/' + folder + "/" + name;
  var path = "Upload/" + folder + "/" + name;

  if (section == "client") {
    fs.writeFile(filename, new Buffer(dataString, "base64"), function (err) {
      var data = {
        "Picture": path
      }
      return ClientsServices.uploadImage(data, CommentId).then(function () {
        return path;
      }).catch(function (err) {
        return err;
      })

    });
  }

  if (section == "comment") {
    fs.writeFile(filename, new Buffer(dataString, "base64"), function (err) {
      var data = {
        "CommentImage": path
      }
      return CommentServices.uploadImage(data, CommentId).then(function () {
        return path;
      }).catch(function (err) {
        return err;
      })

    });
  }

  if (section == "chat") {
    fs.writeFile(filename, new Buffer(dataString, "base64"), function (err) {
      var data = {
        "ImagePath": path
      }
      return ChatServices.uploadImage(data, ChatId).then(function () {
        return path;
      }).catch(function (err) {
        return err;
      })

    });
  }

  if (section == "post") {
    var base64Image = dataString.split(';base64,').pop();
    console.warn('filename:', filename);
    fs.writeFile(filename, base64Image, { encoding: 'base64' }, function (err) {
      var data = {
        "PostImage": path
      };
      return PostServices.uploadImage(data, CommentId).then(function () {
        return path;
      }).catch(function (err) {
        return err;
      })

    });
  }

  if (section == "review") {
    fs.writeFile(filename, new Buffer(dataString, "base64"), function (err) {
      var data = {
        "Attachment": path
      }
      return ReviewServices.uploadImage(data, CommentId).then(function () {
        return path;
      }).catch(function (err) {
        return err;
      })

    });
  }

  if (section == "ReviewComment") {
    fs.writeFile(filename, new Buffer(dataString, "base64"), function (err) {
      var data = {
        "ReviewCommentImage": path
      }
      return ReviewServices.uploadReviewCommentImage(data, CommentId).then(function () {
        return path;
      }).catch(function (err) {
        return err;
      })

    });
  }

};


exports.getnearbylocation = function (req, res, allorg, destinations, origins, resolve, reject) {
  console.log("getnearbylocation");
  console.log("destinations.length");
  console.log(origins);
  console.log("destinations.length");
  return distance.matrix(origins, destinations, function (err, distances) {
    if (err) {
      return console.log(err);
    }
    if (!distances) {
      return console.log('no distances');
    }
    if (distances.status == 'OK') {
      var results = [];
      for (var i = 0; i < origins.length; i++) {

        for (var j = 0; j < destinations.length; j++) {
          var origin = distances.origin_addresses[i];
          var destination = distances.destination_addresses[j];
          if (distances.rows[0].elements[j].status == 'OK') {
            var distance = distances.rows[i].elements[j].distance.text;
            allorg[j].set("Miles", distance);
            results.push(distance[j]);
          } else {
            allorg[j].set("Miles", null);
          }
        }
      }

      resolve(allorg);
    }
  });
}
var rad = function (x) {
  return x * Math.PI / 180;
};
exports.getDistance = function (start, end, decimals) {
  console.log("getDistance");
  decimals = decimals || 2;
  var earthRadius = 6371; // km
  lat1 = parseFloat(start.latitude);
  lat2 = parseFloat(end.latitude);
  lon1 = parseFloat(start.longitude);
  lon2 = parseFloat(end.longitude);

  var dLat = rad(lat2 - lat1);
  var dLon = rad(lon2 - lon1);
  /* var lat1 = lat1.toRad();
   var lat2 = lat2.toRad();*/
  var lat1 = rad(lat1);
  var lat2 = rad(lat2);
  console.log("dLon");
  console.log(dLat);
  console.log(dLon);
  console.log(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = earthRadius * c;
  kilometer = Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
  miles = kilometer * 0.621371;
  console.log("d");
  console.log(d);
  console.log(Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals));
  return Math.round(miles * 100) / 100;
};
