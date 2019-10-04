"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs-extra");
var path = require("path");
var date = require("../utils/date");
var migrationsDir = require("../env/migrationsDir");

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(description) {
    var source, filename, destination;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (description) {
              _context.next = 2;
              break;
            }

            throw new Error("Missing parameter: description");

          case 2:
            _context.next = 4;
            return migrationsDir.shouldExist();

          case 4:
            source = path.join(__dirname, "../../samples/migration.js");
            filename = date.nowAsString() + "-" + description.split(" ").join("_") + ".js";
            _context.t0 = path;
            _context.next = 9;
            return migrationsDir.resolve();

          case 9:
            _context.t1 = _context.sent;
            _context.t2 = filename;
            destination = _context.t0.join.call(_context.t0, _context.t1, _context.t2);
            _context.next = 14;
            return fs.copy(source, destination);

          case 14:
            return _context.abrupt("return", filename);

          case 15:
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