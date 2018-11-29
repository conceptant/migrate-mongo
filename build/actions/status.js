"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require("lodash"),
    find = _require.find;

var migrationsDir = require("../env/migrationsDir");
var configFile = require("../env/configFile");

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(db) {
    var fileNames, collectionName, collection, changelog, statusTable;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return migrationsDir.shouldExist();

          case 2:
            _context.next = 4;
            return configFile.shouldExist();

          case 4:
            _context.next = 6;
            return migrationsDir.getFileNames();

          case 6:
            fileNames = _context.sent;
            collectionName = configFile.read().changelogCollectionName;
            collection = db.collection(collectionName);
            _context.next = 11;
            return collection.find({}).toArray();

          case 11:
            changelog = _context.sent;
            statusTable = fileNames.map(function (fileName) {
              var itemInLog = find(changelog, { fileName: fileName });
              var appliedAt = itemInLog ? itemInLog.appliedAt.toJSON() : "PENDING";
              return { fileName: fileName, appliedAt: appliedAt };
            });
            return _context.abrupt("return", statusTable);

          case 14:
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