"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require("lodash");

var _getFileNames = require("../utils/getFileNames");

var _getFileNames2 = _interopRequireDefault(_getFileNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var status = function status(config) {
  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(db) {
      var fileNames, collectionName, collection, changelog, statusTable;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _getFileNames2.default)(config.migrationsDir);

            case 2:
              fileNames = _context.sent;
              collectionName = "changelog";


              if (config.changelogCollectionName) {
                collectionName = config.changelogCollectionName;
              } else {
                collectionName = "changelog";
                console.warn('No changelogCollectionName found in confg - defaulting to "changelog"');
              }

              collection = db.collection(collectionName);
              _context.next = 8;
              return collection.find({}).toArray();

            case 8:
              changelog = _context.sent;
              statusTable = fileNames.map(function (fileName) {
                var itemInLog = (0, _lodash.find)(changelog, { fileName: fileName });
                var appliedAt = itemInLog ? itemInLog.appliedAt.toJSON() : "PENDING";
                return { fileName: fileName, appliedAt: appliedAt };
              });
              return _context.abrupt("return", statusTable);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.default = status;