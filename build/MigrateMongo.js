"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _up = require("./instance_methods/up");

var _up2 = _interopRequireDefault(_up);

var _down = require("./instance_methods/down");

var _down2 = _interopRequireDefault(_down);

var _status = require("./instance_methods/status");

var _status2 = _interopRequireDefault(_status);

var _database = require("./instance_methods/database");

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MigrateMongo = function MigrateMongo(config) {
  (0, _classCallCheck3.default)(this, MigrateMongo);

  this.config = config;

  var statusWithConfig = (0, _status2.default)(config);

  this.up = (0, _up2.default)(config, statusWithConfig);
  this.down = (0, _down2.default)(config, statusWithConfig);
  this.status = statusWithConfig;
  this.database = (0, _database2.default)(config);
};

module.exports = MigrateMongo;