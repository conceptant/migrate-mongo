"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs-extra");
var path = require("path");

var migrationsDir = require("../env/migrationsDir");
var configFile = require("../env/configFile");

function copySampleConfigFile() {
  var source = path.join(__dirname, "../../samples/migrate-mongo-config.js");
  var destination = path.join(process.cwd(), configFile.DEFAULT_CONFIG_FILE_NAME);
  return fs.copy(source, destination);
}

function createMigrationsDirectory() {
  return fs.mkdirs(path.join(process.cwd(), "migrations"));
}

module.exports = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return migrationsDir.shouldNotExist();

        case 2:
          _context.next = 4;
          return configFile.shouldNotExist();

        case 4:
          _context.next = 6;
          return copySampleConfigFile();

        case 6:
          return _context.abrupt("return", createMigrationsDirectory());

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));