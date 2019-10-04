"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require("mongodb"),
    MongoClient = _require.MongoClient;

var _ = require("lodash");
var configFile = require("./configFile");

module.exports = {
  connect: function connect() {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var config, url, databaseName, options, client, db;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return configFile.read();

            case 2:
              config = _context.sent;
              url = _.get(config, "mongodb.url");
              databaseName = _.get(config, "mongodb.databaseName");
              options = _.get(config, "mongodb.options");

              if (url) {
                _context.next = 8;
                break;
              }

              throw new Error("No `url` defined in config file!");

            case 8:
              if (databaseName) {
                _context.next = 10;
                break;
              }

              throw new Error("No `databaseName` defined in config file! This is required since migrate-mongo v3. " + "See https://github.com/seppevs/migrate-mongo#initialize-a-new-project");

            case 10:
              _context.next = 12;
              return MongoClient.connect(url, options);

            case 12:
              client = _context.sent;
              db = client.db(databaseName);

              db.close = client.close;
              return _context.abrupt("return", db);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  }
};