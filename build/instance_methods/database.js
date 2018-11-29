"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var database = function database(config) {
  return {
    connect: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _config$mongodb, url, databaseName, options, client, db;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _config$mongodb = config.mongodb, url = _config$mongodb.url, databaseName = _config$mongodb.databaseName, options = _config$mongodb.options;

                if (url) {
                  _context.next = 3;
                  break;
                }

                throw new Error("No `url` defined in config file!");

              case 3:
                if (databaseName) {
                  _context.next = 5;
                  break;
                }

                throw new Error("No `databaseName` defined in config file! This is required since migrate-mongo v3. " + "See https://github.com/seppevs/migrate-mongo#initialize-a-new-project");

              case 5:
                _context.next = 7;
                return _mongodb.MongoClient.connect(url, options);

              case 7:
                client = _context.sent;
                db = client.db(databaseName);

                db.close = client.close;
                return _context.abrupt("return", db);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));

      return function connect() {
        return _ref.apply(this, arguments);
      };
    }()
  };
};

exports.default = database;