"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _resolveMigrationsDirPath = require("./resolveMigrationsDirPath");

var _resolveMigrationsDirPath2 = _interopRequireDefault(_resolveMigrationsDirPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadMigration = function loadMigration(migrationsDirPath, fileName) {
  if (!migrationsDirPath) {
    throw new Error("No migrations path found");
  }

  var filePath = _path2.default.join((0, _resolveMigrationsDirPath2.default)(migrationsDirPath), fileName);

  return require(filePath);
};

exports.default = loadMigration;