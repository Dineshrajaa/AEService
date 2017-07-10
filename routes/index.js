/**
 * Module dependencies
 */
var express = require('express'),
  controllers = require('../controllers');

/**
 * the new Router exposed in express 4
 * the indexRouter handles all requests to the `/` path
 */
var router = express.Router();

/**
 * this accepts all request methods to the `/` path
 */
router.route('/')
  .all(controllers.index);
require('./category.routes')(router);
require('./UserAccount.routes')(router);
require('./authuser.routes')(router);
require('./seller.routes')(router);
require('./item.routes')(router);
require('./order.routes')(router);
require('./Organization.routes')(router);
require('./Favourite.routes')(router);
require('./PostGet.routes')(router);
require('./Comment.routes')(router);
require('./Treatment.routes')(router);
require('./Gallery.routes')(router);
require('./Review.routes')(router);
require('./SubCategory.routes')(router);
require('./Feedback.routes')(router);

require('./Followers.routes')(router);
require('./Clients.routes')(router);
require('./Notes.routes')(router);
require('./Chat.routes')(router);
exports.router = router;

