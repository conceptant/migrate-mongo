"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveMigrationsDirPath = function resolveMigrationsDirPath(migrationDir) {
  return _path2.default.isAbsolute(migrationDir) ? migrationDir : _path2.default.join(process.cwd(), migrationDir);
};

exports.default = resolveMigrationsDirPath;