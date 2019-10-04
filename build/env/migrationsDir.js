"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var resolveMigrationsDirPath = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var migrationsDir, config;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            migrationsDir = void 0;
            _context.prev = 1;
            _context.next = 4;
            return configFile.read();

          case 4:
            config = _context.sent;

            migrationsDir = config.migrationsDir; // eslint-disable-line
            // if config file doesn't have migrationsDir key, assume default 'migrations' dir
            if (!migrationsDir) {
              migrationsDir = DEFAULT_MIGRATIONS_DIR_NAME;
            }
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);

            // config file could not be read, assume default 'migrations' dir
            migrationsDir = DEFAULT_MIGRATIONS_DIR_NAME;

          case 12:
            if (!path.isAbsolute(migrationsDir)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", migrationsDir);

          case 14:
            return _context.abrupt("return", path.join(process.cwd(), migrationsDir));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 9]]);
  }));

  return function resolveMigrationsDirPath() {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs-extra");
var path = require("path");
var configFile = require("./configFile");

var DEFAULT_MIGRATIONS_DIR_NAME = "migrations";

module.exports = {
  resolve: resolveMigrationsDirPath,

  shouldExist: function shouldExist() {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var migrationsDir;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return resolveMigrationsDirPath();

            case 2:
              migrationsDir = _context2.sent;
              _context2.prev = 3;
              _context2.next = 6;
              return fs.stat(migrationsDir);

            case 6:
              _context2.next = 11;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](3);
              throw new Error("migrations directory does not exist: " + migrationsDir);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this, [[3, 8]]);
    }))();
  },
  shouldNotExist: function shouldNotExist() {
    var _this2 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var migrationsDir, error;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return resolveMigrationsDirPath();

            case 2:
              migrationsDir = _context3.sent;
              error = new Error("migrations directory already exists: " + migrationsDir);
              _context3.prev = 4;
              _context3.next = 7;
              return fs.stat(migrationsDir);

            case 7:
              throw error;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](4);

              if (!(_context3.t0.code !== "ENOENT")) {
                _context3.next = 14;
                break;
              }

              throw error;

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2, [[4, 10]]);
    }))();
  },
  getFileNames: function getFileNames() {
    var _this3 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      var migrationsDir, files;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return resolveMigrationsDirPath();

            case 2:
              migrationsDir = _context4.sent;
              _context4.next = 5;
              return fs.readdir(migrationsDir);

            case 5:
              files = _context4.sent;
              return _context4.abrupt("return", files.filter(function (file) {
                return path.extname(file) === ".js";
              }));

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this3);
    }))();
  },
  loadMigration: function loadMigration(fileName) {
    var _this4 = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
      var migrationsDir;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return resolveMigrationsDirPath();

            case 2:
              migrationsDir = _context5.sent;
              return _context5.abrupt("return", require(path.join(migrationsDir, fileName)));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, _this4);
    }))();
  }
};