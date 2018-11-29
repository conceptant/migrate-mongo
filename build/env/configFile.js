"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require("fs-extra");
var path = require("path");

var _require = require("lodash"),
    get = _require.get;

var DEFAULT_CONFIG_FILE_NAME = "migrate-mongo-config.js";

function getConfigPath() {
  var fileOptionValue = get(global.options, "file");
  if (!fileOptionValue) {
    return path.join(process.cwd(), DEFAULT_CONFIG_FILE_NAME);
  }

  if (path.isAbsolute(fileOptionValue)) {
    return fileOptionValue;
  }
  return path.join(process.cwd(), fileOptionValue);
}

module.exports = {
  DEFAULT_CONFIG_FILE_NAME: DEFAULT_CONFIG_FILE_NAME,

  shouldExist: function shouldExist() {
    var _this = this;

    return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var configPath;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              configPath = getConfigPath();
              _context.prev = 1;
              _context.next = 4;
              return fs.stat(configPath);

            case 4:
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](1);
              throw new Error("config file does not exist: " + configPath);

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
      var configPath, error;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              configPath = getConfigPath();
              error = new Error("config file already exists: " + configPath);
              _context2.prev = 2;
              _context2.next = 5;
              return fs.stat(configPath);

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
  getConfigFilename: function getConfigFilename() {
    return path.basename(getConfigPath());
  },
  read: function read() {
    return require(getConfigPath()); // eslint-disable-line
  }
};