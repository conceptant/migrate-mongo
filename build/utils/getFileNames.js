"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _resolveMigrationsDirPath = require("./resolveMigrationsDirPath");

var _resolveMigrationsDirPath2 = _interopRequireDefault(_resolveMigrationsDirPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFileNames = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(migrationsDirPath) {
    var migrationsDir, files;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            migrationsDir = (0, _resolveMigrationsDirPath2.default)(migrationsDirPath);
            _context.next = 3;
            return new _promise2.default(function (resolve, reject) {
              return _fs2.default.readdir(migrationsDir, function (err, fileList) {
                if (!err) {
                  resolve(fileList);
                } else {
                  reject(err);
                }
              });
            });

          case 3:
            files = _context.sent;
            return _context.abrupt("return", files.filter(function (file) {
              return _path2.default.extname(file) === ".js";
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getFileNames(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = getFileNames;