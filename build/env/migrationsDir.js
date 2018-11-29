"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs-extra");
var path = require("path");
var configFile = require("./configFile");

var DEFAULT_MIGRATIONS_DIR_NAME = "migrations";

function resolveMigrationsDirPath() {
  var migrationsDir = void 0;
  try {
    migrationsDir = configFile.read().migrationsDir; // eslint-disable-line
    // if config file doesn't have migrationsDir key, assume default 'migrations' dir
    if (!migrationsDir) {
      migrationsDir = DEFAULT_MIGRATIONS_DIR_NAME;
    }
  } catch (err) {
    // config file could not be read, assume default 'migrations' dir
    migrationsDir = DEFAULT_MIGRATIONS_DIR_NAME;
  }

  if (path.isAbsolute(migrationsDir)) {
    return migrationsDir;
  }
  return path.join(process.cwd(), migrationsDir);
}

module.exports = {
  resolve: resolveMigrationsDirPath,

  shouldExist: function shouldExist() {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var migrationsDir;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              migrationsDir = resolveMigrationsDirPath();
              _context.prev = 1;
              _context.next = 4;
              return fs.stat(migrationsDir);

            case 4:
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](1);
              throw new Error("migrations directory does not exist: " + migrationsDir);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this, [[1, 6]]);
    }))();
  },
  shouldNotExist: function shouldNotExist() {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var migrationsDir, error;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              migrationsDir = resolveMigrationsDirPath();
              error = new Error("migrations directory already exists: " + migrationsDir);
              _context2.prev = 2;
              _context2.next = 5;
              return fs.stat(migrationsDir);

            case 5:
              throw error;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](2);

              if (!(_context2.t0.code !== "ENOENT")) {
                _context2.next = 12;
                break;
              }

              throw error;

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[2, 8]]);
    }))();
  },
  getFileNames: function getFileNames() {
    var _this3 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var migrationsDir, files;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              migrationsDir = resolveMigrationsDirPath();
              _context3.next = 3;
              return fs.readdir(migrationsDir);

            case 3:
              files = _context3.sent;
              return _context3.abrupt("return", files.filter(function (file) {
                return path.extname(file) === ".js";
              }));

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  },
  loadMigration: function loadMigration(fileName) {
    return require(path.join(resolveMigrationsDirPath(), fileName)); // eslint-disable-line
  }
};